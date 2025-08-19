import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Car,
  GraduationCap,
  Home,
  Plane,
  Smartphone,
  Umbrella,
  Search,
} from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { toast } from "react-hot-toast";
import { useState, useCallback, useEffect } from "react";
import GoalForm from "@/components/goals/goal-editform"; // Adjust path as needed
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FilterState {
  search: string;
  priority: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface Goals {
  id?: string;
  _id?: string; // Support both MongoDB _id and transformed id
  name: string;
  targetDate: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
}

export default function GoalList() {
  const { user } = useUser();
  const userId = user?.sub;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goals[]>([]);
  const [availablePriorities, setAvailablePriorities] = useState<string[]>([]);
  const [editingGoal, setEditingGoal] = useState<Goals | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priority: "all",
    sortBy: "targetDate",
    sortOrder: "desc",
  });

  // Debounced search input
  const [searchInput, setSearchInput] = useState("");

  // Helper function to get goal ID (supports both id and _id)
  const getGoalId = (goal: Goals): string => {
    return goal.id || goal._id || '';
  };

  // Debounce search input changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch goals when filters change
  useEffect(() => {
    if (userId) fetchGoals();
  }, [userId, filters]);

  // Build query string
  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    params.append("userId", userId || "");
    if (filters.search) params.append("search", filters.search);
    if (filters.priority !== "all") params.append("priority", filters.priority);
    params.append("sortBy", filters.sortBy);
    params.append("sortOrder", filters.sortOrder);
    return params.toString();
  }, [userId, filters]);

  const fetchGoals = async () => {
    if (!userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const query = buildQueryParams();
      const response = await fetch(`/api/goals?${query}`);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      
      // Transform _id to id if needed for consistency
      const transformedGoals = (data.goals || []).map((goal: any) => ({
        ...goal,
        id: goal.id || goal._id, // Ensure we have an id field
      }));
      
      setGoals(transformedGoals);
      setAvailablePriorities(data.priorities || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch goals");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit goal
  const handleEditGoal = (goal: Goals) => {
    setEditingGoal(goal);
    setIsEditDialogOpen(true);
  };

  // Handle close edit dialog
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingGoal(null);
  };

  // Handle successful edit
  const handleEditSuccess = () => {
    fetchGoals(); // Refresh the goals list
  };
  
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Get icon based on goal name/category
  const getGoalIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("home") || lowerName.includes("house"))
      return <Home className="h-5 w-5" />;
    if (lowerName.includes("car") || lowerName.includes("vehicle"))
      return <Car className="h-5 w-5" />;
    if (lowerName.includes("education") || lowerName.includes("school"))
      return <GraduationCap className="h-5 w-5" />;
    if (lowerName.includes("vacation") || lowerName.includes("travel"))
      return <Plane className="h-5 w-5" />;
    if (lowerName.includes("phone") || lowerName.includes("tech"))
      return <Smartphone className="h-5 w-5" />;
    if (lowerName.includes("emergency") || lowerName.includes("insurance"))
      return <Umbrella className="h-5 w-5" />;
    return <Home className="h-5 w-5" />;
  };

  // Filter and deduplicate priorities for the select options
  const getUniquePriorities = () => {
    const validPriorities = availablePriorities
      .filter((priority) => priority && priority.trim() !== "" && priority !== "all")
      .filter((priority, index, array) => array.indexOf(priority) === index); // Remove duplicates
    
    return validPriorities;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search goals by name or description..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Filters Row */}
        <div className="flex gap-4">
          {/* Priority Filter */}
          <Select
            value={filters.priority}
            onValueChange={(value) => handleFilterChange("priority", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all-priorities" value="all">
                All Priorities
              </SelectItem>
              {getUniquePriorities().map((priority) => (
                <SelectItem key={`priority-${priority}`} value={priority}>
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select
            value={filters.sortBy}
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="sort-targetDate" value="targetDate">
                Target Date
              </SelectItem>
              <SelectItem key="sort-name" value="name">
                Name
              </SelectItem>
              <SelectItem key="sort-priority" value="priority">
                Priority
              </SelectItem>
              <SelectItem key="sort-targetAmount" value="targetAmount">
                Target Amount
              </SelectItem>
              <SelectItem key="sort-currentAmount" value="currentAmount">
                Current Amount
              </SelectItem>
            </SelectContent>
          </Select>
          
          {/* Sort Order */}
          <Select
            value={filters.sortOrder}
            onValueChange={(value) => handleFilterChange("sortOrder", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="order-asc" value="asc">
                Ascending
              </SelectItem>
              <SelectItem key="order-desc" value="desc">
                Descending
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && <p className="text-center">Loading goals...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Goals List */}
      {!loading && goals.length === 0 && (
        <p className="text-center text-gray-500">No goals found</p>
      )}

      {goals.map((goal) => {
        const goalId = getGoalId(goal);
        const progress = Math.round(
          (goal.currentAmount / goal.targetAmount) * 100
        );
        return (
          <div
            key={goalId} // Use the helper function to get the ID
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  {getGoalIcon(goal.name)}
                </div>
                <div>
                  <h3 className="font-medium">{goal.name}</h3>
                  <p className="text-sm text-gray-500">
                    Due: {goal.targetDate}
                  </p>
                  {goal.description && (
                    <p className="text-xs text-gray-400 mt-1">
                      {goal.description}
                    </p>
                  )}
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditGoal(goal)}
                >
                  Edit
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>${goal.currentAmount.toLocaleString()}</span>
                <span>${goal.targetAmount.toLocaleString()}</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{progress}% complete</span>
                <span>
                  ${(goal.targetAmount - goal.currentAmount).toLocaleString()}{" "}
                  remaining
                </span>
              </div>
              <div className="text-xs text-gray-400">
                Monthly contribution: $
                {goal.monthlyContribution.toLocaleString()}
              </div>
            </div>
          </div>
        );
      })}

      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
          </DialogHeader>
          {editingGoal && (
            <GoalForm
              goal={editingGoal}
              onClose={handleCloseEditDialog}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}