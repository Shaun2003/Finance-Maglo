import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/AuthContext";
import { Button } from "../../../components/ui/button";

interface TransactionFormProps {
  onSuccess: () => void;
}

interface Wallet {
  id: string;
  name: string;
}

const categories = {
  income: ["Salary", "Freelance", "Investment", "Sale", "Other"],
  expense: [
    "Food & Dining",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Other",
  ],
};

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSuccess,
}) => {
  const { user } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "income",
    category: "",
    amount: "",
    description: "",
    reference: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase.from("transactions").insert([
      {
        user_id: user.id,
        wallet_id: formData.wallet_id || null,
        type: formData.type,
        category: formData.category,
        amount: parseFloat(formData.amount),
        description: formData.description,
        reference: formData.reference,
        transaction_date: new Date().toISOString(),
      },
    ]);

    setLoading(false);
    if (!error) {
      setFormData({
        type: "income",
        category: "",
        amount: "",
        description: "",
        reference: "",
        wallet_id: "",
      });
      onSuccess();
    }
  };

  const currentCategories =
    categories[formData.type as keyof typeof categories] || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-colortext-1 mb-2">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value, category: "" })
            }
            className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-colortext-1 mb-2">
            Category
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
          >
            <option value="">Select category</option>
            {currentCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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

      <div>
        <label className="block text-sm font-medium text-text-colortext-1 mb-2">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
          placeholder="Transaction description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-colortext-1 mb-2">
          Reference
        </label>
        <input
          type="text"
          value={formData.reference}
          onChange={(e) =>
            setFormData({ ...formData, reference: e.target.value })
          }
          className="w-full px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
          placeholder="Reference number or ID"
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary-color hover:bg-primary-color/90 text-white"
        >
          {loading ? "Creating..." : "Create Transaction"}
        </Button>
      </div>
    </form>
  );
};
