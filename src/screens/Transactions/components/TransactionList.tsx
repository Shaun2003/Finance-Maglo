import React from "react";
import { Button } from "../../../components/ui/button";

interface Transaction {
  id: string;
  type: string;
  category: string;
  amount: number;
  description: string;
  reference: string;
  transaction_date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-colortext-2">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-graygray-3 bg-graygray-2">
            <th className="px-6 py-3 text-left text-sm font-semibold text-text-colortext-1">
              Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-text-colortext-1">
              Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-text-colortext-1">
              Category
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-text-colortext-1">
              Description
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-text-colortext-1">
              Reference
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-text-colortext-1">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-text-colortext-1">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-graygray-3 hover:bg-graygray-2 transition"
            >
              <td className="px-6 py-4 text-sm text-text-colortext-2">
                {formatDate(transaction.transaction_date)}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-text-colortext-1">
                {transaction.category}
              </td>
              <td className="px-6 py-4 text-sm text-text-colortext-2">
                {transaction.description}
              </td>
              <td className="px-6 py-4 text-sm text-text-colortext-2">
                {transaction.reference}
              </td>
              <td
                className={`px-6 py-4 text-sm font-semibold text-right ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm">
                <Button
                  onClick={() => onDelete(transaction.id)}
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
