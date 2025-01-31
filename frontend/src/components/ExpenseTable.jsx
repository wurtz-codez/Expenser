import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";

const expenseTable = () => {

  const {expenses} = useSelector(store => store.expense); 
  
  const handleCheckboxChange = (expenseId) => {

  }
  
  return (
    <Table>
      <TableCaption>List of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Marked As</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense._id}>
            <TableCell className="font-medium">
              <Checkbox
                checked = {expense.done}
                onCheckedChange = {() => handleCheckboxChange(expense._id)}
              />
            </TableCell>
            <TableCell>{expense.decription}</TableCell>
            <TableCell>{expense.amount}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>{expense.createdAt?.split("T")[0]}</TableCell>
            <TableCell className="text-right">
              <div cclassName="flex items-center justify-end gap-2">
                <Button size='icon' className='rounded-full border text-red-600 hover:border-transparent' variant='outline'><Trash className="h-4 w-4"/></Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className='font-bold text-xl'>Total</TableCell>
          <TableCell className="text-right font-bold text-xl">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default expenseTable;