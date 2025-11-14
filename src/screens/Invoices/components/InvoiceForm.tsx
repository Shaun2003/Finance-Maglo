import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/AuthContext";
import { Button } from "../../../components/ui/button";

interface InvoiceFormProps {
  onSuccess: () => void;
}

interface Wallet {
  id: string;
  name: string;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    invoice_number: "",
    client_name: "",
    client_email: "",
    description: "",
    amount: "",
    vat_rate: "0",
    wallet_id: "",
  });

  useEffect(() => {
    fetchWallets();
  }, [user]);

  const fetchWallets = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("wallets")
      .select("id, name")
      .eq("user_id", user.id);
    if (data) setWallets(data);
  };

  const calculateVAT = (amount: number, vat_rate: number) => {
    return (amount * vat_rate) / 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const amount = parseFloat(formData.amount);
    const vat_rate = parseFloat(formData.vat_rate);
    const vat_amount = calculateVAT(amount, vat_rate);
    const total_amount = amount + vat_amount;

    const { error } = await supabase.from("invoices").insert([
      {
        user_id: user.id,
        wallet_id: formData.wallet_id || null,
        invoice_number: formData.invoice_number,
        client_name: formData.client_name,
        client_email: formData.client_email,
        description: formData.description,
        amount,
        vat_rate,
        vat_amount,
        total_amount,
        status: "draft",
      },
    ]);

    setLoading(false);
    if (!error) {
      setFormData({
        invoice_number: "",
        client_name: "",
        client_email: "",
        description: "",
        amount: "",
        vat_rate: "0",
        wallet_id: "",
      });
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-colortext-1 mb-2">
            Invoice Number
          </label>
          <input
            type="text"
            required
            value={formData.invoice_number}
            onChange={(e) =>
              setFormData({ ...formData, invoice_number: e.target.value })
            }
            className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
            placeholder="INV-001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-colortext-1 mb-2">
            Client Name
          </label>
          <input
            type="text"
            required
            value={formData.client_name}
            onChange={(e) =>
              setFormData({ ...formData, client_name: e.target.value })
            }
            className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
            placeholder="Client name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-colortext-1 mb-2">
          Client Email
        </label>
        <input
          type="email"
          value={formData.client_email}
          onChange={(e) =>
            setFormData({ ...formData, client_email: e.target.value })
          }
          className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
          placeholder="client@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-colortext-1 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
          rows={3}
          placeholder="Invoice description"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-colortext-1 mb-2">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-colortext-1 mb-2">
            VAT Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.vat_rate}
            onChange={(e) =>
              setFormData({ ...formData, vat_rate: e.target.value })
            }
            className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-colortext-1 mb-2">
            Wallet
          </label>
          <select
            value={formData.wallet_id}
            onChange={(e) =>
              setFormData({ ...formData, wallet_id: e.target.value })
            }
            className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
          >
            <option value="">Select wallet</option>
            {wallets.map((wallet) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary-color hover:bg-primary-color/90 text-white"
        >
          {loading ? "Creating..." : "Create Invoice"}
        </Button>
      </div>
    </form>
  );
};
