import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { DashboardTopBarSection } from "../Dashboard/sections/DashboardTopBarSection";
import { NavigationSidebarSection } from "../Dashboard/sections/NavigationSidebarSection";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";

interface Transaction {
  id: string;
  type: string;
  category: string;
  amount: number;
  description: string;
  reference: string;
  transaction_date: string;
}

export const Transactions = (): JSX.Element => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("transaction_date", { ascending: false });

    if (!error && data) {
      setTransactions(data);
    }
    setLoading(false);
  };

  const handleTransactionCreated = () => {
    setShowForm(false);
    fetchTransactions();
  };

  const handleDelete = async (transactionId: string) => {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", transactionId);

    if (!error) {
      fetchTransactions();
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="bg-text-colorpure-white w-full min-w-[1440px] min-h-[900px] flex">
      <NavigationSidebarSection />
      <div className="flex flex-col flex-1">
        <DashboardTopBarSection />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-text-colortext-1">Transactions</h1>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-primary-color hover:bg-primary-color/90 text-white"
              >
                {showForm ? "Cancel" : "New Transaction"}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-600 font-medium">Total Income</p>
                <p className="text-2xl font-bold text-green-700 mt-2">
                  ${totalIncome.toFixed(2)}
                </p>
              </div>
              <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-600 font-medium">Total Expenses</p>
                <p className="text-2xl font-bold text-red-700 mt-2">
                  ${totalExpenses.toFixed(2)}
                </p>
              </div>
            </div>

            {showForm && (
              <div className="mb-8 p-6 bg-graygray-2 rounded-lg">
                <TransactionForm onSuccess={handleTransactionCreated} />
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">Loading transactions...</div>
            ) : (
              <TransactionList
                transactions={transactions}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
