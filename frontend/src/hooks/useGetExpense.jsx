import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setExpenses } from '@/redux/expenseSlice';

const useGetExpense = () => {
  const dispatch = useDispatch();
  const { category, markAsDone } = useSelector((state) => state.expense);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:8000/api/v1/expense/getall?category=${category}&done=${markAsDone}`);
        if (res.data.success) {
          dispatch(setExpenses(res.data.expense));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchExpenses();
  }, [dispatch, category, markAsDone]);

}

export default useGetExpense;