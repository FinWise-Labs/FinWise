"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import GoalList from "@/components/goals/goal-list";
import GoalForm from "@/components/goals/goal-form";
import GoalInsights from "@/components/goals/goal-insights";
import { useState } from "react";

export default function GoalsPage() {
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  
  const handleEditGoal = (goal: any) => {
    setSelectedGoal(goal);
    setIsAddingGoal(true);
  };
  const handleViewDetails = (goal: any) => {
    setSelectedGoal(goal);
  };
  const closeDetails = () => {
    setSelectedGoal;(null);
  };
  const closeGoalForm = () => {
    setIsAddingGoal(false);
    setSelectedGoal(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Financial Goals</h1>
        <Button onClick={() => setIsAddingGoal(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Goal
        </Button>
      </div>

      {isAddingGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {selectedGoal ? "Edit Goal" : "Add New Goal"}
            </h2>
            <GoalForm
            goal={selectedGoal}
            onClose={closeGoalForm}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Financial Goals</CardTitle>
              <CardDescription>
                Track and manage your progress towards financial freedom
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GoalList />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Goal Insights</CardTitle>
              <CardDescription>
                AI-powered recommendations for your goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GoalInsights />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
