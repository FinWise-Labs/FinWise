import { Button } from "@/components/ui/button"
import { Edit, Trash2, X } from "lucide-react"

// Define the type for the `transaction` prop
interface Transaction {
  id: string
  date: string
  description: string
  category: string
  type: "income" | "expense" // Adjust according to your needs
  amount: number
  notes?: string
}

// Define the props type for the component
interface TransactionDetailsProps {
  transaction: Transaction
  onClose: () => void
  onEdit: (transaction: Transaction) => void
  onDelete: (transactionId: string) => void
}

export default function TransactionDetails({
  transaction,
  onClose,
  onEdit,
  onDelete,
}: TransactionDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Transaction Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Date:</span>
          <span className="font-medium">{transaction.date}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Description:</span>
          <span className="font-medium">{transaction.description}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Category:</span>
          <span className="font-medium">{transaction.category}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Type:</span>
          <span className="font-medium capitalize">{transaction.type}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Amount:</span>
          <span className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
            {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
          </span>
        </div>

        {transaction.notes && (
          <div className="pt-2 border-t">
            <p className="text-muted-foreground mb-1">Notes:</p>
            <p>{transaction.notes}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={() => onEdit(transaction)} className="flex items-center">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            onDelete(transaction.id)
            onClose()
          }}
          className="flex items-center"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  )
}
