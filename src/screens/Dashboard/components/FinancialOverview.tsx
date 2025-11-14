import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/AuthContext";

interface FinancialData {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
  paidInvoices: number;
  unpaidInvoices: number;
  unpaidAmount: number;
}

export const FinancialOverview: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<FinancialData>({
    totalIncome: 0,
    totalExpenses: 0,
    totalBalance: 0,
    paidInvoices: 0,
    unpaidInvoices: 0,
    unpaidAmount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFinancialData();
    }
  }, [user]);

  const fetchFinancialData = async () => {
    if (!user) return;

    const [transactionsRes, walletsRes, invoicesRes] = await Promise.all([
      supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id),
      supabase
        .from("wallets")
        .select("balance")
        .eq("user_id", user.id),
      supabase
        .from("invoices")
        .select("*")
        .eq("user_id", user.id),
    ]);

    let totalIncome = 0;
    let totalExpenses = 0;
    let totalBalance = 0;
    let paidInvoices = 0;
    let unpaidInvoices = 0;
    let unpaidAmount = 0;

    if (transactionsRes.data) {
      transactionsRes.data.forEach((t: any) => {
        if (t.type === "income") {
          totalIncome += t.amount;
        } else {
          totalExpenses += t.amount;
        }
      });
    }

    if (walletsRes.data) {
      walletsRes.data.forEach((w: any) => {
        totalBalance += w.balance;
      });
    }

    if (invoicesRes.data) {
      invoicesRes.data.forEach((inv: any) => {
        if (inv.status === "paid") {
          paidInvoices += 1;
        } else {
          unpaidInvoices += 1;
          unpaidAmount += inv.total_amount;
        }
      });
    }

    setData({
      totalIncome,
      totalExpenses,
      totalBalance,
      paidInvoices,
      unpaidInvoices,
      unpaidAmount,
    });
    setLoading(false);
  };

  if (loading) {
    return <div>Loading financial data...</div>;
  }

  const netIncome = data.totalIncome - data.totalExpenses;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-medium text-blue-600 mb-1">
            Total Balance
          </p>
          <p className="text-2xl font-bold text-blue-700">
            ${data.totalBalance.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs font-medium text-green-600 mb-1">
            Total Income
          </p>
          <p className="text-2xl font-bold text-green-700">
            ${data.totalIncome.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-xs font-medium text-red-600 mb-1">
            Total Expenses
          </p>
          <p className="text-2xl font-bold text-red-700">
            ${data.totalExpenses.toFixed(2)}
          </p>
        </div>
        <div
          className={`p-4 rounded-lg border ${
            netIncome >= 0
              ? "bg-emerald-50 border-emerald-200"
              : "bg-orange-50 border-orange-200"
          }`}
        >
          <p
            className={`text-xs font-medium mb-1 ${
              netIncome >= 0 ? "text-emerald-600" : "text-orange-600"
            }`}
          >
            Net Income
          </p>
          <p
            className={`text-2xl font-bold ${
              netIncome >= 0 ? "text-emerald-700" : "text-orange-700"
            }`}
          >
            ${netIncome.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-xs font-medium text-purple-600 mb-2">
            Invoice Summary
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-purple-700">Paid Invoices:</span>
              <span className="font-semibold text-purple-700">
                {data.paidInvoices}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-purple-700">Unpaid Invoices:</span>
              <span className="font-semibold text-purple-700">
                {data.unpaidInvoices}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-purple-200">
              <span className="text-sm text-purple-700">Pending Amount:</span>
              <span className="font-semibold text-purple-700">
                ${data.unpaidAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="text-xs font-medium text-indigo-600 mb-2">
            Financial Health
          </p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-indigo-700">Income vs Expenses</span>
                <span className="text-xs font-semibold text-indigo-700">
                  {data.totalIncome > 0
                    ? (
                        (data.totalIncome /
                          (data.totalIncome + data.totalExpenses)) *
                        100
                      ).toFixed(0)
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full bg-indigo-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      data.totalIncome > 0
                        ? (
                            (data.totalIncome /
                              (data.totalIncome + data.totalExpenses)) *
                            100
                          ).toFixed(0)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
            <div className="text-xs text-indigo-700 pt-2 border-t border-indigo-200">
              {netIncome > 0
                ? `Surplus: $${netIncome.toFixed(2)}`
                : `Deficit: $${Math.abs(netIncome).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
