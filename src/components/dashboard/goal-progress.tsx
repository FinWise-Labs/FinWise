import { Progress } from "@/components/ui/progress"
import { Car, GraduationCap, Home, Plane } from "lucide-react"

export default function GoalProgress() {
  const goals = [
    {
      id: 1,
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      icon: <Home className="h-4 w-4" />,
      dueDate: "Ongoing",
    },
    {
      id: 2,
      name: "Vacation to Europe",
      target: 5000,
      current: 2750,
      icon: <Plane className="h-4 w-4" />,
      dueDate: "July 2025",
    },
    {
      id: 3,
      name: "New Car",
      target: 25000,
      current: 8000,
      icon: <Car className="h-4 w-4" />,
      dueDate: "December 2025",
    },
    {
      id: 4,
      name: "Student Loan Payoff",
      target: 15000,
      current: 9000,
      icon: <GraduationCap className="h-4 w-4" />,
      dueDate: "August 2025",
    },
  ]

  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const progressPercentage = Math.round((goal.current / goal.target) * 100)

        return (
          <div key={goal.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-primary/10 mr-3">{goal.icon}</div>
                <div>
                  <p className="font-medium text-sm">{goal.name}</p>
                  <p className="text-xs text-gray-500">Due: {goal.dueDate}</p>
                </div>
              </div>
              <div className="text-sm font-medium">
                ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
              </div>
            </div>
            <div className="space-y-1">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-right text-gray-500">{progressPercentage}% complete</p>
            </div>
          </div>
        )
      })}
      <div className="pt-2 text-center">
        <button className="text-sm text-primary hover:underline">Manage all goals</button>
      </div>
    </div>
  )
}

