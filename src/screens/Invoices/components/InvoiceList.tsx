import React from "react";
import { Button } from "../../../components/ui/button";

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

interface InvoiceListProps {
  invoices: Invoice[];
  onMarkAsPaid: (id: string) => void;
  onMarkAsUnpaid: (id: string) => void;
  onDelete: (id: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "sent":
      return "bg-blue-100 text-blue-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  onMarkAsPaid,
  onMarkAsUnpaid,
  onDelete,
}) => {
  if (invoices.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-colortext-2">No invoices yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-graygray-3 bg-graygray-2">
            <th className="px-6 py-3 text-left text-sm font-semibold text-text-colortext-1">
              Invoice #
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-text-colortext-1">
              Client
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-text-colortext-1">
              Amount
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-text-colortext-1">
              VAT
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-text-colortext-1">
              Total
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-text-colortext-1">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-text-colortext-1">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="border-b border-graygray-3 hover:bg-graygray-2 transition"
            >
              <td className="px-6 py-4 text-sm font-medium text-text-colortext-1">
                {invoice.invoice_number}
              </td>
              <td className="px-6 py-4 text-sm text-text-colortext-2">
                {invoice.client_name}
              </td>
              <td className="px-6 py-4 text-sm text-right text-text-colortext-1">
                ${invoice.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm text-right text-text-colortext-1">
                ${invoice.vat_amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm text-right font-semibold text-text-colortext-1">
                ${invoice.total_amount.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    invoice.status
                  )}`}
                >
                  {invoice.status.charAt(0).toUpperCase() +
                    invoice.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm space-x-2">
                {invoice.status === "paid" ? (
                  <Button
                    onClick={() => onMarkAsUnpaid(invoice.id)}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    Mark Unpaid
                  </Button>
                ) : (
                  <Button
                    onClick={() => onMarkAsPaid(invoice.id)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white text-xs"
                  >
                    Mark Paid
                  </Button>
                )}
                <Button
                  onClick={() => onDelete(invoice.id)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700 text-xs"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
