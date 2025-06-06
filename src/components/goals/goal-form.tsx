"use client";

import type React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
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

interface GoalFormProps {
  goal?: {
    id: string;
    name: string;
    targetDate: string;
    description: string;
    priority: "high" | "medium" | "low";
    targetAmount: number;
    currentAmount: number;
    monthlyContribution: number;
  };
  onClose: () => void;
}

export default function GoalForm({ goal, onClose }: GoalFormProps) {
  const { user, isLoading } = useUser(); // Get logged-in user
  const [name, setName] = useState<string>(goal ? goal.name : "");
  const [targetAmount, setTargetAmount] = useState(
    goal ? Math.abs(goal.targetAmount).toString() : ""
  );
  const [currentAmount, setCurrentAmount] = useState(
    goal ? Math.abs(goal.currentAmount).toString() : ""
  );
  const [targetDate, setTargetDate] = useState<Date | undefined>(
    goal ? new Date(goal.targetDate) : undefined
  );
  const [description, setDescription] = useState<string>(
    goal ? goal.description : ""
  );
  const [priority, setPriority] = useState<"high" | "medium" | "low">(
    goal ? goal.priority : "medium"
  );
  const [monthlyContribution, setMonthlyContribution] = useState(
    goal ? Math.abs(goal.monthlyContribution).toString() : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.sub) {
      alert("You must be logged in to add a transaction.");
      return;
    }
    setIsSubmitting(true);

    try {
      const goalData = {
        userId: user.sub,
        name,
        targetAmount: parseFloat(targetAmount),
        currentAmount: parseFloat(currentAmount),
        targetDate,
        description,
        priority,
        monthlyContribution: parseFloat(monthlyContribution),
      };

      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        throw new Error("Failed to save goal");
      }

      onClose();
      alert(
        goal
          ? "Goal updated successfully!"
          : "Goal added successfully!"
      );
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Goal Name</Label>
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
          <Label htmlFor="target">Target Amount ($)</Label>
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
          <Label htmlFor="current">Current Amount ($)</Label>
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
          <Label htmlFor="dueDate">Target Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="dueDate"
                variant="outline"
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
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={priority}
            onValueChange={(value: "high" | "medium" | "low") =>
              setPriority(value)
            }
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
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
        <Label htmlFor="contribution">Monthly Contribution ($)</Label>
        <Input
          id="contribution"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
          type="number"
          placeholder="0.00"
          step="0.01"
          min="0"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || isLoading}>
          {isSubmitting ? "Saving..." : goal ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
}
