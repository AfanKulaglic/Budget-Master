import { useEffect, useState } from "react";

interface SpendingInfo {
    totalSum: number;
    percentage: number;
}

export function calculateSpendingInfo(monthlySpendingRedux: any[], monthlyBudgetRedux: number): SpendingInfo {
    const [totalSum, setTotalExpenses] = useState<number>(0)

    useEffect(() => {
        const sum = monthlySpendingRedux.reduce((accumulator, expense) => {
            return accumulator + parseFloat(expense.value.toString());
        }, 0);

        setTotalExpenses(sum);
    }, [monthlySpendingRedux]);

    const percentage = (totalSum / monthlyBudgetRedux) * 100;

    return {
        totalSum,
        percentage
    };
}
