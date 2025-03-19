import { Progress } from "@/components/ui/progress";

export default function BudgetOverview() {
  const budgetCategories = [
    {
      id: 1,
      category: "Housing",
      budgeted: 1500,
      spent: 1200,
    },
    {
      id: 2,
      category: "Food & Groceries",
      budgeted: 600,
      spent: 450,
    },
    {
      id: 3,
      category: "Transportation",
      budgeted: 400,
      spent: 380,
    },
    {
      id: 4,
      category: "Entertainment",
      budgeted: 300,
      spent: 275,
    },
    {
      id: 5,
      category: "Utilities",
      budgeted: 250,
      spent: 230,
    },
  ];

  return (
    <div className="space-y-4">
      {budgetCategories.map((item) => {
        const spentPercentage = Math.round((item.spent / item.budgeted) * 100);
        const isOverBudget = item.spent > item.budgeted;

        return (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="font-medium text-sm">{item.category}</p>
              <div className="text-sm font-medium">
                ${item.spent.toLocaleString()} / $
                {item.budgeted.toLocaleString()}
              </div>
            </div>
            <div className="space-y-1">
              <Progress
                value={spentPercentage > 100 ? 100 : spentPercentage}
                className={`h-2 ${isOverBudget ? "bg-red-200" : ""}`}
                style={
                  {
                    "--progress-indicator-color": isOverBudget ? "red" : "",
                  } as React.CSSProperties
                }
              />
              <p
                className={`text-xs text-right ${
                  isOverBudget ? "text-red-500" : "text-gray-500"
                }`}
              >
                {spentPercentage}% {isOverBudget ? "(Over budget)" : "used"}
              </p>
            </div>
          </div>
        );
      })}
      <div className="pt-2 text-center">
        <button className="text-sm text-primary hover:underline">
          Adjust budget allocations
        </button>
      </div>
    </div>
  );
}
