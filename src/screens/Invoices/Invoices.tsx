import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { DashboardTopBarSection } from "../Dashboard/sections/DashboardTopBarSection";
import { NavigationSidebarSection } from "../Dashboard/sections/NavigationSidebarSection";
import { InvoiceForm } from "./components/InvoiceForm";
import { InvoiceList } from "./components/InvoiceList";

interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  amount: number;
  vat_amount: number;
  total_amount: number;
  status: string;
  due_date: string;
  paid_date: string | null;
}

export const Invoices = (): JSX.Element => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, [user]);

  const fetchInvoices = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setInvoices(data);
    }
    setLoading(false);
  };

  const handleInvoiceCreated = () => {
    setShowForm(false);
    fetchInvoices();
  };

  const handleMarkAsPaid = async (invoiceId: string) => {
    const { error } = await supabase
      .from("invoices")
      .update({ status: "paid", paid_date: new Date().toISOString() })
      .eq("id", invoiceId);

    if (!error) {
      fetchInvoices();
    }
  };

  const handleMarkAsUnpaid = async (invoiceId: string) => {
    const { error } = await supabase
      .from("invoices")
      .update({ status: "sent", paid_date: null })
      .eq("id", invoiceId);

    if (!error) {
      fetchInvoices();
    }
  };

  const handleDelete = async (invoiceId: string) => {
    const { error } = await supabase
      .from("invoices")
      .delete()
      .eq("id", invoiceId);

    if (!error) {
      fetchInvoices();
    }
  };

  return (
    <div className="bg-text-colorpure-white w-full min-w-[1440px] min-h-[900px] flex">
      <NavigationSidebarSection />
      <div className="flex flex-col flex-1">
        <DashboardTopBarSection />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-text-colortext-1">Invoices</h1>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-primary-color hover:bg-primary-color/90 text-white"
              >
                {showForm ? "Cancel" : "New Invoice"}
              </Button>
            </div>

            {showForm && (
              <div className="mb-8 p-6 bg-graygray-2 rounded-lg">
                <InvoiceForm onSuccess={handleInvoiceCreated} />
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">Loading invoices...</div>
            ) : (
              <InvoiceList
                invoices={invoices}
                onMarkAsPaid={handleMarkAsPaid}
                onMarkAsUnpaid={handleMarkAsUnpaid}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
