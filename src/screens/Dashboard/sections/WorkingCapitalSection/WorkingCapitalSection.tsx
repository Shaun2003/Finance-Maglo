import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const statCards = [
  {
    icon: "/icon.png",
    label: "Total invoice",
    amount: "$5240.21",
    bgColor: "bg-darkish-colorkey-black",
    textColor: "text-white",
    labelColor: "text-[#929eae]",
  },
  {
    icon: "/icon-1.png",
    label: "Amount Paid",
    amount: "$250.80",
    bgColor: "bg-graygray-2",
    textColor: "text-text-colortext-1",
    labelColor: "text-text-colortext-2",
  },
  {
    icon: "/icon-2.png",
    label: "Pending Payment",
    amount: "$550.25",
    bgColor: "bg-graygray-2",
    textColor: "text-text-colortext-1",
    labelColor: "text-text-colortext-2",
  },
];

const chartDates = [
  { label: "Apr 14", isCurrent: false },
  { label: "Apr 15", isCurrent: false },
  { label: "Apr 16", isCurrent: false },
  { label: "Apr 17", isCurrent: true },
  { label: "Apr 18", isCurrent: false },
  { label: "Apr 19", isCurrent: false },
  { label: "Apr 20", isCurrent: false },
];

const invoiceData = [
  {
    avatar: "/ellipse-7.png",
    company: "Gadget Gallery LTD",
    invoiceNumber: "Inv: MGL524874",
    date: "14 Apr 2022",
    time: "at 8:00 PM",
    orders: "20",
    amount: "$420.84",
    status: "Pending",
  },
  {
    avatar: "/ellipse-7-1.png",
    company: "Gadget Gallery LTD",
    invoiceNumber: "Inv: MGL524874",
    date: "14 Apr 2022",
    time: "at 8:00 PM",
    orders: "20",
    amount: "$420.84",
    status: "Pending",
  },
  {
    avatar: "/ellipse-7-2.png",
    company: "Gadget Gallery LTD",
    invoiceNumber: "Inv: MGL524874",
    date: "14 Apr 2022",
    time: "at 8:00 PM",
    orders: "20",
    amount: "$420.84",
    status: "Pending",
  },
];

export const WorkingCapitalSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-[30px]">
      <div className="flex w-full items-start gap-[25px]">
        {statCards.map((card, index) => (
          <Card
            key={index}
            className={`flex-1 ${card.bgColor} rounded-[10px] border-0`}
          >
            <CardContent className="flex items-center gap-[15px] p-6">
              <img className="w-[42px] h-[42px]" alt="Icon" src={card.icon} />
              <div className="flex flex-col gap-2.5">
                <div
                  className={`[font-family:'Kumbh_Sans',Helvetica] font-normal ${card.labelColor} text-sm tracking-[0] leading-[normal]`}
                >
                  {card.label}
                </div>
                <div
                  className={`font-bold ${card.textColor} text-2xl [font-family:'Kumbh_Sans',Helvetica] tracking-[0] leading-[normal]`}
                >
                  {card.amount}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="w-full bg-text-colorpure-white rounded-[10px] border border-solid border-neutral-100">
        <CardContent className="p-0">
          <div className="flex items-center justify-between px-[22px] py-[15px]">
            <div className="font-extra-font-size-18-semibold font-[number:var(--extra-font-size-18-semibold-font-weight)] text-text-colortext-1 text-[length:var(--extra-font-size-18-semibold-font-size)] tracking-[var(--extra-font-size-18-semibold-letter-spacing)] leading-[var(--extra-font-size-18-semibold-line-height)] [font-style:var(--extra-font-size-18-semibold-font-style)]">
              Working Capital
            </div>
            <div className="flex items-center gap-[195px]">
              <div className="flex items-center gap-[30px]">
                <div className="flex items-center gap-[17px]">
                  <div className="flex items-center gap-[5px]">
                    <div className="w-2 h-2 bg-secondary-color rounded" />
                    <div className="font-size-12-size-12-regular font-[number:var(--size-12-size-12-regular-font-weight)] text-text-colortext-1 text-[length:var(--size-12-size-12-regular-font-size)] tracking-[var(--size-12-size-12-regular-letter-spacing)] leading-[var(--size-12-size-12-regular-line-height)] [font-style:var(--size-12-size-12-regular-font-style)]">
                      Income
                    </div>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <div className="w-2 h-2 bg-primary-color rounded" />
                    <div className="font-size-12-size-12-regular font-[number:var(--size-12-size-12-regular-font-weight)] text-text-colortext-1 text-[length:var(--size-12-size-12-regular-font-size)] tracking-[var(--size-12-size-12-regular-letter-spacing)] leading-[var(--size-12-size-12-regular-line-height)] [font-style:var(--size-12-size-12-regular-font-style)]">
                      Expenses
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="h-auto flex items-center gap-2 pl-2.5 pr-2 py-1.5 bg-graygray-2 rounded-[5px] hover:bg-graygray-2"
                >
                  <span className="[font-family:'Kumbh_Sans',Helvetica] font-normal text-text-colortext-1 text-xs tracking-[0] leading-[normal]">
                    Last 7 days
                  </span>
                  <ChevronDownIcon className="w-[18px] h-[18px]" />
                </Button>
              </div>
            </div>
          </div>

          <div className="relative px-[22px] pb-[22px]">
            <div className="flex items-start gap-6 mb-[14px]">
              <div className="flex flex-col gap-6">
                <div className="font-size-12-size-12-regular font-[number:var(--size-12-size-12-regular-font-weight)] text-text-colortext-2 text-[length:var(--size-12-size-12-regular-font-size)] tracking-[var(--size-12-size-12-regular-letter-spacing)] leading-[var(--size-12-size-12-regular-line-height)] [font-style:var(--size-12-size-12-regular-font-style)]">
                  10K
                </div>
                <div className="font-size-12-size-12-regular font-[number:var(--size-12-size-12-regular-font-weight)] text-text-colortext-2 text-[length:var(--size-12-size-12-regular-font-size)] tracking-[var(--size-12-size-12-regular-letter-spacing)] leading-[var(--size-12-size-12-regular-line-height)] [font-style:var(--size-12-size-12-regular-font-style)]">
                  7K
                </div>
                <div className="font-size-12-size-12-regular font-[number:var(--size-12-size-12-regular-font-weight)] text-text-colortext-2 text-[length:var(--size-12-size-12-regular-font-size)] tracking-[var(--size-12-size-12-regular-letter-spacing)] leading-[var(--size-12-size-12-regular-line-height)] [font-style:var(--size-12-size-12-regular-font-style)]">
                  5K
                </div>
                <div className="font-size-12-size-12-regular font-[number:var(--size-12-size-12-regular-font-weight)] text-text-colortext-2 text-[length:var(--size-12-size-12-regular-font-size)] tracking-[var(--size-12-size-12-regular-letter-spacing)] leading-[var(--size-12-size-12-regular-line-height)] [font-style:var(--size-12-size-12-regular-font-style)]">
                  3K
                </div>
                <div className="font-size-12-size-12-regular font-[number:var(--size-12-size-12-regular-font-weight)] text-text-colortext-2 text-[length:var(--size-12-size-12-regular-font-size)] tracking-[var(--size-12-size-12-regular-letter-spacing)] leading-[var(--size-12-size-12-regular-line-height)] [font-style:var(--size-12-size-12-regular-font-style)]">
                  0K
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="flex items-start justify-between mb-3.5">
                  {Array(7)
                    .fill(0)
                    .map((_, index) => (
                      <img
                        key={index}
                        className="w-px h-[164px]"
                        alt="Line"
                        src="/line-1.svg"
                      />
                    ))}
                </div>

                <img
                  className="absolute top-[58px] left-0 w-full h-[125px]"
                  alt="Chart"
                  src="/chart.png"
                />

                <div className="absolute top-[43px] left-[50%] flex flex-col items-center gap-[22px]">
                  <div className="relative">
                    <img
                      className="w-[57px] h-9"
                      alt="Rectangle"
                      src="/rectangle-456.svg"
                    />
                    <div className="absolute top-1.5 left-2.5 font-[number:var(--size-12-size-12-medium-font-weight)] text-text-colortext-1 text-[length:var(--size-12-size-12-medium-font-size)] font-size-12-size-12-medium tracking-[var(--size-12-size-12-medium-letter-spacing)] leading-[var(--size-12-size-12-medium-line-height)] [font-style:var(--size-12-size-12-medium-font-style)]">
                      $5,500
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-white rounded-md shadow-[0px_4px_8px_#68686840] flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#5243aa] rounded" />
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  {chartDates.map((date, index) => (
                    <div
                      key={index}
                      className={`${
                        date.isCurrent
                          ? "font-[number:var(--size-12-size-12-semibold-font-weight)] text-text-colortext-1 font-size-12-size-12-semibold text-[length:var(--size-12-size-12-semibold-font-size)] tracking-[var(--size-12-size-12-semibold-letter-spacing)] leading-[var(--size-12-size-12-semibold-line-height)] [font-style:var(--size-12-size-12-semibold-font-style)]"
                          : "font-[number:var(--size-12-size-12-regular-font-weight)] text-text-colortext-2 font-size-12-size-12-regular text-[length:var(--size-12-size-12-regular-font-size)] tracking-[var(--size-12-size-12-regular-letter-spacing)] leading-[var(--size-12-size-12-regular-line-height)] [font-style:var(--size-12-size-12-regular-font-style)]"
                      }`}
                    >
                      {date.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-[10px] border-0">
        <CardContent className="p-0">
          <div className="flex items-center justify-between px-[28px] py-[13px]">
            <div className="font-extra-font-size-18-semibold font-[number:var(--extra-font-size-18-semibold-font-weight)] text-text-colortext-1 text-[length:var(--extra-font-size-18-semibold-font-size)] tracking-[var(--extra-font-size-18-semibold-letter-spacing)] leading-[var(--extra-font-size-18-semibold-line-height)] [font-style:var(--extra-font-size-18-semibold-font-style)]">
              Recent Invoice
            </div>
            <Button
              variant="ghost"
              className="h-auto flex items-center gap-1.5 p-0 hover:bg-transparent"
            >
              <span className="font-size-14-size-14-semibold font-[number:var(--size-14-size-14-semibold-font-weight)] text-secondary-color text-[length:var(--size-14-size-14-semibold-font-size)] tracking-[var(--size-14-size-14-semibold-letter-spacing)] leading-[var(--size-14-size-14-semibold-line-height)] [font-style:var(--size-14-size-14-semibold-font-style)]">
                View All
              </span>
              <img
                className="w-[18px] h-[18px]"
                alt="Ic expand more"
                src="/ic-expand-more-24px-1.svg"
              />
            </Button>
          </div>

          <div className="px-[28px]">
            <div className="flex items-center gap-[30px] mb-[18px]">
              <div className="w-[237px] [font-family:'Kumbh_Sans',Helvetica] font-semibold text-text-colortext-2 text-xs tracking-[0] leading-[normal]">
                NAME/CLIENT
              </div>
              <div className="w-[147px] [font-family:'Kumbh_Sans',Helvetica] font-semibold text-text-colortext-2 text-xs tracking-[0] leading-[normal]">
                DATE
              </div>
              <div className="w-[147px] [font-family:'Kumbh_Sans',Helvetica] font-semibold text-text-colortext-2 text-xs tracking-[0] leading-[normal]">
                ORDERS/TYPE
              </div>
              <div className="w-[149px] [font-family:'Kumbh_Sans',Helvetica] font-semibold text-text-colortext-2 text-xs tracking-[0] leading-[normal]">
                AMOUNT
              </div>
              <div className="w-[173px] [font-family:'Kumbh_Sans',Helvetica] font-semibold text-text-colortext-2 text-xs tracking-[0] leading-[normal]">
                STATUS
              </div>
              <div className="w-[59px] [font-family:'Kumbh_Sans',Helvetica] font-semibold text-text-colortext-2 text-xs tracking-[0] leading-[normal]">
                ACTION
              </div>
            </div>

            {invoiceData.map((invoice, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center justify-between py-[11px]">
                  <div className="flex items-center gap-[30px]">
                    <div className="flex items-center gap-[15px] w-[237px]">
                      <img
                        className="w-[38px] h-[38px]"
                        alt="Avatar"
                        src={invoice.avatar}
                      />
                      <div className="flex flex-col">
                        <div className="[font-family:'Kumbh_Sans',Helvetica] font-medium text-text-colortext-1 text-sm tracking-[0] leading-[normal]">
                          {invoice.company}
                        </div>
                        <div className="font-extra-font-size-13-regular font-[number:var(--extra-font-size-13-regular-font-weight)] text-text-colortext-2 text-[length:var(--extra-font-size-13-regular-font-size)] tracking-[var(--extra-font-size-13-regular-letter-spacing)] leading-[var(--extra-font-size-13-regular-line-height)] [font-style:var(--extra-font-size-13-regular-font-style)]">
                          {invoice.invoiceNumber}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col w-[147px]">
                      <div className="[font-family:'Kumbh_Sans',Helvetica] font-medium text-text-colortext-1 text-sm tracking-[0] leading-[normal]">
                        {invoice.date}
                      </div>
                      <div className="font-extra-font-size-13-regular font-[number:var(--extra-font-size-13-regular-font-weight)] text-text-colortext-2 text-[length:var(--extra-font-size-13-regular-font-size)] tracking-[var(--extra-font-size-13-regular-letter-spacing)] leading-[var(--extra-font-size-13-regular-line-height)] [font-style:var(--extra-font-size-13-regular-font-style)]">
                        {invoice.time}
                      </div>
                    </div>

                    <div className="w-[147px] [font-family:'Kumbh_Sans',Helvetica] font-semibold text-text-colortext-2 text-sm tracking-[0] leading-[normal]">
                      {invoice.orders}
                    </div>

                    <div className="w-[149px] font-semibold text-text-colortext-1 text-sm [font-family:'Kumbh_Sans',Helvetica] tracking-[0] leading-[normal]">
                      {invoice.amount}
                    </div>

                    <div className="w-[173px]">
                      <Badge className="bg-[#fff1e5] text-[#f2994a] hover:bg-[#fff1e5] [font-family:'Kumbh_Sans',Helvetica] font-medium text-xs tracking-[0] leading-[normal] px-[15px] py-2 h-auto">
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="h-auto p-0 hover:bg-transparent"
                  >
                    <img className="w-auto h-auto" alt="More" src="/more.svg" />
                  </Button>
                </div>
                {index < invoiceData.length - 1 && (
                  <img className="w-full h-px" alt="Line" src="/line-12.svg" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
