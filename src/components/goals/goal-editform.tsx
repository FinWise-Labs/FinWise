"use client";

import type React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface GoalFormProps {
  goal: {
    id?: string;
    _id?: string; // Support both id formats
    name: string;
    targetDate: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    targetAmount: number;
    currentAmount: number;
    monthlyContribution: number;
  };
  onClose: () => void;
  onSuccess?: () => void;
}

export default function GoalForm({ goal, onClose, onSuccess }: GoalFormProps) {
  const { user, isLoading } = useUser();
  const [name, setName] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [currentAmount, setCurrentAmount] = useState<string>("");
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the goal ID, supporting both formats
  const getGoalId = () => {
    return goal?.id || goal?._id;
  };

  // Populate form fields when component mounts
  useEffect(() => {
    if (goal) {
      setName(goal.name);
      setTargetAmount(goal.targetAmount.toString());
      setCurrentAmount(goal.currentAmount.toString());
      setTargetDate(new Date(goal.targetDate));
      setDescription(goal.description || "");
      setPriority(goal.priority);
      setMonthlyContribution(goal.monthlyContribution.toString());
    }
  }, [goal]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.sub) {
      toast.error("You must be logged in to update a goal.");
      return;
    }

    // Validate required fields
    if (
      !name.trim() ||
      !targetAmount ||
      !currentAmount ||
      !monthlyContribution ||
      !targetDate
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Check if goal ID exists
    const goalId = getGoalId();
    if (!goalId) {
      toast.error("Goal ID is missing. Cannot update goal.");
      console.error("Goal object:", goal);
      return;
    }

    setIsSubmitting(true);

    try {
      const goalData = {
        goalId: goalId, // Use the extracted ID
        userId: user.sub,
        name: name.trim(),
        targetAmount: parseFloat(targetAmount),
        currentAmount: parseFloat(currentAmount),
        targetDate: targetDate.toISOString(),
        description: description.trim(),
        priority,
        monthlyContribution: parseFloat(monthlyContribution),
      };

      console.log("Sending goal data:", goalData); // Debug log

      const response = await fetch("/api/goals", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update goal");
      }

      const result = await response.json();
      console.log("Goal updated successfully:", result);

      toast.success("Goal updated successfully!");
      onSuccess?.(); // Refresh the goals list
      onClose();
    } catch (error: any) {
      console.error("Error updating goal:", error);
      toast.error(`Failed to update goal: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const goalId = getGoalId();
    if (!goalId || !user?.sub) {
      toast.error("Unable to delete goal. Missing required information.");
      return;
    }

    if (
      !confirm(
        "Are you sure you want to delete this goal? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const params = new URLSearchParams({
        id: goalId,
        userId: user.sub,
      });

      const response = await fetch(`/api/goals?${params.toString()}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete goal");
      }

      const result = await response.json();
      console.log("Goal deleted successfully:", result);

      toast.success("Goal deleted successfully!");
      onSuccess?.(); // Refresh the goals list
      onClose();
    } catch (error: any) {
      console.error("Error deleting goal:", error);
      toast.error(`Failed to delete goal: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Goal Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Emergency Fund, New Car, Vacation"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="target">Target Amount ($) *</Label>
          <Input
            id="target"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="current">Current Amount ($) *</Label>
          <Input
            id="current"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="dueDate">Target Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="dueDate"
                variant="outline"
                type="button"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !targetDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {targetDate ? (
                  format(targetDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={targetDate}
                onSelect={setTargetDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority *</Label>
          <Select
            value={priority}
            onValueChange={(value: "High" | "Medium" | "Low") =>
              setPriority(value)
            }
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your financial goal and why it's important to you"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contribution">Monthly Contribution ($) *</Label>
        <Input
          id="contribution"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
          type="number"
          placeholder="0.00"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className="flex justify-between">
        {/* Delete button */}
        <Button
          type="button"
          variant="destructive"
          onClick={handleDelete}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Deleting..." : "Delete Goal"}
        </Button>

        {/* Action buttons */}
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || isLoading}>
            {isSubmitting ? "Updating..." : "Update Goal"}
          </Button>
        </div>
      </div>
    </form>
  );
}