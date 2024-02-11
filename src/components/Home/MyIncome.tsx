// MyIncome.tsx
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { BiDollar } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import { RxDotsHorizontal } from 'react-icons/rx';

interface MyIncomeProps {
  monthlyBudgetRedux: number;
  valueRedux: string;
  monthlySpendingRedux: any[];
}

const MyIncome: React.FC<MyIncomeProps> = ({ monthlyBudgetRedux, valueRedux, monthlySpendingRedux }) => {
  const [totalSpending, setTotalExpenses] = useState<number>(0)

  useEffect(() => {
      const sum = monthlySpendingRedux.reduce((accumulator, expense) => {
          return accumulator + parseFloat(expense.value.toString());
      }, 0);

      setTotalExpenses(sum);
  }, [monthlySpendingRedux]);

  return (
    <div className='my-income'>
      <h6>My Income</h6>
      <div className='d-flex'>
        <Card className='cards'>
          <div className='cards-top'>
            <BiDollar className='icon' />
            <RxDotsHorizontal className='icon dots' />
          </div>
          <div className='cards-bottom'>
            <p>Salary</p>
            <h6>{monthlyBudgetRedux} {valueRedux}</h6>
          </div>
        </Card>
        <Card className='cards'>
          <div className='cards-top'>
            <GiTakeMyMoney className='icon' />
            <RxDotsHorizontal className='icon dots' />
          </div>
          <div className='cards-bottom'>
            <p>Spending</p>
            <h6>{totalSpending} {valueRedux}</h6>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MyIncome;
