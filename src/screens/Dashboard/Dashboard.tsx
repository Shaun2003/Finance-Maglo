import React from "react";
import { DashboardTopBarSection } from "./sections/DashboardTopBarSection";
import { NavigationSidebarSection } from "./sections/NavigationSidebarSection";
import { WorkingCapitalSection } from "./sections/WorkingCapitalSection";
import { FinancialOverview } from "./components/FinancialOverview";

export const Dashboard = (): JSX.Element => {
  return (
    <div className="bg-text-colorpure-white w-full min-w-[1440px] min-h-[900px] flex">
      <NavigationSidebarSection />
      <div className="flex flex-col flex-1">
        <DashboardTopBarSection />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <FinancialOverview />
            <WorkingCapitalSection />
          </div>
        </div>
      </div>
    </div>
  );
};
