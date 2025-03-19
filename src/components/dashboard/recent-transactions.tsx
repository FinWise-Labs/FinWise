import { ArrowUp, Coffee, Home, ShoppingBag } from "lucide-react"

export default function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      description: "Rent Payment",
      amount: -1200,
      date: "2025-03-15",
      category: "Housing",
      icon: <Home className="h-4 w-4" />,
    },
    {
      id: 2,
      description: "Salary Deposit",
      amount: 4250,
      date: "2025-03-10",
      category: "Income",
      icon: <ArrowUp className="h-4 w-4" />,
    },
    {
      id: 3,
      description: "Grocery Store",
      amount: -85.42,
      date: "2025-03-14",
      category: "Food",
      icon: <ShoppingBag className="h-4 w-4" />,
    },
    {
      id: 4,
      description: "Coffee Shop",
      amount: -4.5,
      date: "2025-03-15",
      category: "Food",
      icon: <Coffee className="h-4 w-4" />,
    },
  ]

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <div className={`p-2 rounded-full mr-3 ${transaction.amount > 0 ? "bg-green-100" : "bg-red-100"}`}>
              {transaction.icon}
            </div>
            <div>
              <p className="font-medium text-sm">{transaction.description}</p>
              <p className="text-xs text-gray-500">
                {transaction.category} • {transaction.date}
              </p>
            </div>
          </div>
          <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
            {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
          </div>
        </div>
      ))}
      <div className="pt-2 text-center">
        <button className="text-sm text-primary hover:underline">View all transactions</button>
      </div>
    </div>
  )
}

