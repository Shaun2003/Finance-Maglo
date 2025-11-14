import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { useAuth } from "../../../../contexts/AuthContext";

const mainNavItems = [
  {
    label: "Dashboard",
    icon: "/dashboard.svg",
    path: "/dashboard",
  },
  {
    label: "Transactions",
    icon: "/transactions.svg",
    path: "/transactions",
  },
  {
    label: "Invoices",
    icon: "/invoices.svg",
    path: "/invoices",
  },
  {
    label: "My Wallets",
    icon: "/my-wallets.svg",
    path: "/wallets",
  },
  {
    label: "Settings",
    icon: "/settings.svg",
    path: "/settings",
  },
];

const bottomNavItems = [
  {
    label: "Help",
    icon: "/help.svg",
  },
  {
    label: "Logout",
    icon: "/logout.svg",
  },
];

export const NavigationSidebarSection = (): JSX.Element => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <aside className="flex flex-col items-start justify-between bg-graygray-1 pt-[30px] pb-[100px] px-[25px] h-full">
      <div className="flex flex-col items-start gap-10 w-full">
        <header className="inline-flex items-center gap-3">
          <img className="w-[30px] h-[30px]" alt="Exclude" src="/exclude.svg" />
          <h1 className="w-20 h-[23px] [font-family:'Gordita-Bold',Helvetica] font-bold text-text-colortext-1 text-lg tracking-[0] leading-[normal]">
            Maglo.
          </h1>
        </header>

        <nav className="flex flex-col items-start gap-0.5 w-full">
          {mainNavItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleNavigation(item.path)}
                className={`flex w-[200px] items-center justify-start gap-3 pl-[15px] pr-[81px] py-3.5 h-auto rounded-lg ${
                  isActive
                    ? "bg-primary-color"
                    : "bg-transparent hover:bg-graygray-3"
                }`}
              >
                <img className="w-5 h-5" alt={item.label} src={item.icon} />
                <span
                  className={`font-size-14-size-14-${
                    isActive ? "semibold" : "medium"
                  } font-[number:var(--size-14-size-14-${
                    isActive ? "semibold" : "medium"
                  }-font-weight)] ${
                    isActive
                      ? "text-text-colortext-1"
                      : "text-text-colortext-2"
                  } text-[length:var(--size-14-size-14-${
                    isActive ? "semibold" : "medium"
                  }-font-size)] tracking-[var(--size-14-size-14-${
                    isActive ? "semibold" : "medium"
                  }-letter-spacing)] leading-[var(--size-14-size-14-${
                    isActive ? "semibold" : "medium"
                  }-line-height)] [font-style:var(--size-14-size-14-${
                    isActive ? "semibold" : "medium"
                  }-font-style)]`}
                >
                  {item.label}
                </span>
              </Button>
            );
          })}
        </nav>
      </div>

      <nav className="flex flex-col items-start gap-0.5 w-full">
        {bottomNavItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={item.label === "Logout" ? handleLogout : undefined}
            className="flex w-[200px] items-center justify-start gap-3 pl-[15px] pr-[81px] py-3.5 h-auto rounded-lg bg-transparent hover:bg-graygray-3"
          >
            <img className="w-5 h-5" alt={item.label} src={item.icon} />
            <span className="font-size-14-size-14-medium font-[number:var(--size-14-size-14-medium-font-weight)] text-text-colortext-2 text-[length:var(--size-14-size-14-medium-font-size)] tracking-[var(--size-14-size-14-medium-letter-spacing)] leading-[var(--size-14-size-14-medium-line-height)] [font-style:var(--size-14-size-14-medium-font-style)]">
              {item.label}
            </span>
          </Button>
        ))}
      </nav>
    </aside>
  );
};
