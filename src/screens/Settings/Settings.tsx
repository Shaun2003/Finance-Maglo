import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { DashboardTopBarSection } from "../Dashboard/sections/DashboardTopBarSection";
import { NavigationSidebarSection } from "../Dashboard/sections/NavigationSidebarSection";
import { useNavigate } from "react-router-dom";

export const Settings = (): JSX.Element => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="bg-text-colorpure-white w-full min-w-[1440px] min-h-[900px] flex">
      <NavigationSidebarSection />
      <div className="flex flex-col flex-1">
        <DashboardTopBarSection />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-text-colortext-1 mb-8">
              Settings
            </h1>

            <div className="space-y-6">
              <div className="p-6 bg-graygray-2 rounded-lg border border-graygray-3">
                <h2 className="text-xl font-semibold text-text-colortext-1 mb-4">
                  Account Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-colortext-2 mb-1">
                      Email Address
                    </label>
                    <p className="text-lg text-text-colortext-1">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-colortext-2 mb-1">
                      Account Created
                    </label>
                    <p className="text-lg text-text-colortext-1">
                      {user?.created_at
                        ? new Date(user.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-graygray-2 rounded-lg border border-graygray-3">
                <h2 className="text-xl font-semibold text-text-colortext-1 mb-4">
                  Preferences
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-colortext-1">
                        Currency
                      </p>
                      <p className="text-sm text-text-colortext-2">
                        Default currency for transactions
                      </p>
                    </div>
                    <select className="px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                      <option>CAD</option>
                      <option>AUD</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-graygray-3">
                    <div>
                      <p className="font-medium text-text-colortext-1">
                        Default VAT Rate
                      </p>
                      <p className="text-sm text-text-colortext-2">
                        Default VAT percentage for invoices
                      </p>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue="0"
                      className="w-24 px-3 py-2 border border-graygray-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-graygray-2 rounded-lg border border-graygray-3">
                <h2 className="text-xl font-semibold text-text-colortext-1 mb-4">
                  Danger Zone
                </h2>
                <div>
                  <p className="text-sm text-text-colortext-2 mb-4">
                    Permanently sign out of your account
                  </p>
                  {showLogoutConfirm ? (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-text-colortext-1">
                        Are you sure you want to logout?
                      </p>
                      <div className="flex gap-3">
                        <Button
                          onClick={handleLogout}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Yes, Logout
                        </Button>
                        <Button
                          onClick={() => setShowLogoutConfirm(false)}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
