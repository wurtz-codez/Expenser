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
import { Trash, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import UpdateExpense from "./UpdateExpense";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn, listItem } from "@/lib/animations";
import { useTheme } from "@/hooks/use-theme";

const ExpenseTable = () => {
  const { expenses } = useSelector(store => store.expense); 
  const [localExpenses, setLocalExpenses] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState({});
  const { theme } = useTheme();

  useEffect(() => {
    setLocalExpenses(expenses);
    setIsLoading(false);
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
    setIsDeleting(prev => ({ ...prev, [expenseId]: true }));
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
    } finally {
      setIsDeleting(prev => ({ ...prev, [expenseId]: false }));
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
          theme === 'dark' ? 'border-blue-400' : 'border-blue-500'
        }`}></div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      className="w-full"
    >
      <Table>
        <TableCaption className={`text-lg font-medium ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          List of your recent expenses
        </TableCaption>
        <TableHeader>
          <TableRow className={`${
            theme === 'dark' 
              ? 'hover:bg-gray-700/50 border-gray-700' 
              : 'hover:bg-gray-50 border-gray-200'
          }`}>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {localExpenses.length === 0 ? (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TableCell colSpan={6} className={`text-center py-8 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  No expenses found. Add your first expense to get started!
                </TableCell>
              </motion.tr>
            ) : (
              localExpenses?.map((expense) => (
                <motion.tr
                  key={expense._id}
                  variants={listItem}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`${
                    theme === 'dark'
                      ? 'hover:bg-gray-700/50 border-gray-700'
                      : 'hover:bg-gray-50 border-gray-200'
                  } transition-colors ${
                    isDeleting[expense._id] ? 'opacity-50' : ''
                  }`}
                >
                  <TableCell className="font-medium">
                    <Checkbox
                      checked={expense.done}
                      onCheckedChange={() => handleCheckboxChange(expense._id)}
                      className="transition-all hover:scale-110"
                    />
                  </TableCell>
                  <TableCell className={`${
                    expense.done 
                      ? theme === 'dark'
                        ? 'line-through text-gray-500'
                        : 'line-through text-gray-400'
                      : ''
                  }`}>
                    {expense.description}
                  </TableCell>
                  <TableCell className={`${
                    expense.done
                      ? theme === 'dark'
                        ? 'line-through text-gray-500'
                        : 'line-through text-gray-400'
                      : 'font-medium'
                  }`}>
                    ₹{expense.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      expense.done
                        ? theme === 'dark'
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-100 text-gray-500'
                        : theme === 'dark'
                          ? 'bg-blue-900/50 text-blue-400'
                          : 'bg-blue-100 text-blue-700'
                    }`}>
                      {expense.category}
                    </span>
                  </TableCell>
                  <TableCell className={`${
                    expense.done
                      ? theme === 'dark'
                        ? 'line-through text-gray-500'
                        : 'line-through text-gray-400'
                      : ''
                  }`}>
                    {new Date(expense.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={() => removeExpenseHandler(expense._id)}
                        size="icon"
                        className={`rounded-full ${
                          theme === 'dark'
                            ? 'hover:bg-red-900/50'
                            : 'hover:bg-red-50'
                        } transition-colors`}
                        variant="ghost"
                        disabled={isDeleting[expense._id]}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                      <UpdateExpense />
                    </div>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </TableBody>
        <TableFooter>
          <TableRow className={theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}>
            <TableCell colSpan={5} className="font-bold text-xl">
              Total Expenses
            </TableCell>
            <TableCell className={`text-right font-bold text-xl ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              ₹{totalAmount.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </motion.div>
  );
};

export default ExpenseTable;