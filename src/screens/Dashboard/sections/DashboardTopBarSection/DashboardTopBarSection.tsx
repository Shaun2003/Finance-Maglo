import { BellIcon, ChevronDownIcon, SearchIcon } from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";

export const DashboardTopBarSection = (): JSX.Element => {
  return (
    <header className="flex w-full items-center justify-between">
      <h1 className="[font-family:'Kumbh_Sans',Helvetica] font-semibold text-text-colortext-1 text-[25px] tracking-[0] leading-[normal]">
        Dashboard
      </h1>

      <div className="inline-flex items-center gap-[45px]">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
            <SearchIcon className="w-5 h-5 text-text-colortext-2" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-auto w-auto p-0 relative"
          >
            <BellIcon className="w-5 h-5 text-text-colortext-2" />
          </Button>
        </div>

        <Button
          variant="ghost"
          className="flex w-[215px] items-center justify-between pl-[7px] pr-[15px] py-1.5 bg-neutral-50 rounded-[100px] h-auto hover:bg-neutral-100"
        >
          <div className="inline-flex items-center gap-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src="/ellipse-1.png" alt="Mahfuzul Nabil" />
              <AvatarFallback>MN</AvatarFallback>
            </Avatar>

            <span className="[font-family:'Kumbh_Sans',Helvetica] font-semibold text-text-colortext-1 text-sm tracking-[0] leading-[normal]">
              Mahfuzul Nabil
            </span>
          </div>

          <ChevronDownIcon className="w-[17px] h-[17px] text-text-colortext-1" />
        </Button>
      </div>
    </header>
  );
};
