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
import UpdateExpense from "./UpdateExpense";
import { useState,useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

const expenseTable = () => {

  const {expenses} = useSelector(store => store.expense); 
  const [localExpenses, setLocalExpenses] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

 
  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  
  const totalAmount = localExpenses.reduce((acc, expense) => {
    if(!checkedItems[expense._id]) {
      return acc + expense.amount;
    }
    return acc;
  }, 0);
  
  const handleCheckboxChange = async (expenseId) => {
    const newStatus = !checkedItems[expenseId];
    try {
      const res = await axios.put(`http://localhost:8000/api/v1/expense/${expenseId}/done`, {done: newStatus}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if(res.data.success) {
        toast.success(res.data.message);
        setCheckedItems((prevItems) => ({
          ...prevItems,
          [expenseId]: newStatus
        }));

        setLocalExpenses(localExpenses.map(exp => exp._id === expenseId ? {...exp, done: newStatus} : exp));
      }

    } catch (error) {
      console.log(error);
    }
  }
  
  const removeExpenseHandler = async (expenseId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/expense/remove/${expenseId}`)
      if(res.data.success) {
        toast.success(res.data.message);
        const filteredExpenses = localExpenses.filter(expense => expense._id !== expenseId);
        setLocalExpenses(filteredExpenses);
      }    
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
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
        {localExpenses.length ===0 ? <span>Add your first expense</span> : localExpenses?.map((expense) => (
          <TableRow key={expense._id}>
            <TableCell className="font-medium">
              <Checkbox
                checked = {expense.done}
                onCheckedChange = {() => handleCheckboxChange(expense._id)}
              />
            </TableCell>
            <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.description}</TableCell>
            <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.amount}</TableCell>
            <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.category}</TableCell>
            <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.createdAt?.split("T")[0]}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button onClick={() => removeExpenseHandler(expense._id)} size='icon' className='rounded-full border text-red-600 hover:border-transparent' variant='outline'><Trash className="h-4 w-4"/></Button>
                <UpdateExpense/>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className='font-bold text-xl'>Total</TableCell>
          <TableCell className="text-right font-bold text-xl">{totalAmount}₹</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default expenseTable;