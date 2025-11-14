import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { DashboardTopBarSection } from "../Dashboard/sections/DashboardTopBarSection";
import { NavigationSidebarSection } from "../Dashboard/sections/NavigationSidebarSection";
import { WalletForm } from "./components/WalletForm";
import { WalletList } from "./components/WalletList";

interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
}

export const Wallets = (): JSX.Element => {
  const { user } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallets();
  }, [user]);

  const fetchWallets = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setWallets(data);
    }
    setLoading(false);
  };

  const handleWalletCreated = () => {
    setShowForm(false);
    fetchWallets();
  };

  const handleDelete = async (walletId: string) => {
    const { error } = await supabase
      .from("wallets")
      .delete()
      .eq("id", walletId);

    if (!error) {
      fetchWallets();
    }
  };

  const handleUpdateBalance = async (
    walletId: string,
    newBalance: number
  ) => {
    const { error } = await supabase
      .from("wallets")
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq("id", walletId);

    if (!error) {
      fetchWallets();
    }
  };

  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);

  return (
    <div className="bg-text-colorpure-white w-full min-w-[1440px] min-h-[900px] flex">
      <NavigationSidebarSection />
      <div className="flex flex-col flex-1">
        <DashboardTopBarSection />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-text-colortext-1">
                My Wallets
              </h1>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-primary-color hover:bg-primary-color/90 text-white"
              >
                {showForm ? "Cancel" : "New Wallet"}
              </Button>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 mb-8">
              <p className="text-sm text-blue-600 font-medium">
                Total Balance
              </p>
              <p className="text-3xl font-bold text-blue-700 mt-2">
                ${totalBalance.toFixed(2)}
              </p>
            </div>

            {showForm && (
              <div className="mb-8 p-6 bg-graygray-2 rounded-lg">
                <WalletForm onSuccess={handleWalletCreated} />
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">Loading wallets...</div>
            ) : (
              <WalletList
                wallets={wallets}
                onDelete={handleDelete}
                onUpdateBalance={handleUpdateBalance}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
