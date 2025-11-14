import React, { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/AuthContext";
import { Button } from "../../../components/ui/button";

interface WalletFormProps {
  onSuccess: () => void;
}

export const WalletForm: React.FC<WalletFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    balance: "",
    currency: "USD",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase.from("wallets").insert([
      {
        user_id: user.id,
        name: formData.name,
        balance: parseFloat(formData.balance) || 0,
        currency: formData.currency,
      },
    ]);

    setLoading(false);
    if (!error) {
      setFormData({
        name: "",
        balance: "",
        currency: "USD",
      });
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-text-colortext-1 mb-2">
          Wallet Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
          placeholder="e.g., Savings, Checking"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-colortext-1 mb-2">
            Initial Balance
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.balance}
            onChange={(e) =>
              setFormData({ ...formData, balance: e.target.value })
            }
            className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-colortext-1 mb-2">
            Currency
          </label>
          <select
            value={formData.currency}
            onChange={(e) =>
              setFormData({ ...formData, currency: e.target.value })
            }
            className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary-color hover:bg-primary-color/90 text-white"
        >
          {loading ? "Creating..." : "Create Wallet"}
        </Button>
      </div>
    </form>
  );
};
