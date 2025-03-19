import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Car, GraduationCap, Home, Plane, Smartphone, Umbrella } from "lucide-react"

export default function GoalList() {
  const goals = [
    {
      id: 1,
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      icon: <Umbrella className="h-4 w-4" />,
      dueDate: "Ongoing",
      priority: "High",
    },
    {
      id: 2,
      name: "Vacation to Europe",
      target: 5000,
      current: 2750,
      icon: <Plane className="h-4 w-4" />,
      dueDate: "July 2025",
      priority: "Medium",
    },
    {
      id: 3,
      name: "New Car",
      target: 25000,
      current: 8000,
      icon: <Car className="h-4 w-4" />,
      dueDate: "December 2025",
      priority: "Medium",
    },
    {
      id: 4,
      name: "Student Loan Payoff",
      target: 15000,
      current: 9000,
      icon: <GraduationCap className="h-4 w-4" />,
      dueDate: "August 2025",
      priority: "High",
    },
    {
      id: 5,
      name: "Down Payment for House",
      target: 50000,
      current: 12500,
      icon: <Home className="h-4 w-4" />,
      dueDate: "January 2027",
      priority: "Medium",
    },
    {
      id: 6,
      name: "New Smartphone",
      target: 1000,
      current: 600,
      icon: <Smartphone className="h-4 w-4" />,
      dueDate: "May 2025",
      priority: "Low",
    },
  ]

  return (
    <div className="space-y-6">
      {goals.map((goal) => {
        const progressPercentage = Math.round((goal.current / goal.target) * 100)

        return (
          <div key={goal.id} className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-primary/10 mr-3">{goal.icon}</div>
                <div>
                  <h3 className="font-medium">{goal.name}</h3>
                  <p className="text-sm text-gray-500">Due: {goal.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full mr-2 ${
                    goal.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : goal.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {goal.priority}
                </span>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>${goal.current.toLocaleString()}</span>
                <span>${goal.target.toLocaleString()}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{progressPercentage}% complete</span>
                <span>${(goal.target - goal.current).toLocaleString()} remaining</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

