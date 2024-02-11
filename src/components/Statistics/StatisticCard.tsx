import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { calculateSpendingInfo } from '../../utils/calculateSpendingInfo';

interface StatisticCardProps {
    emailRedux: string;
    valueRedux: string;
    monthlyBudgetRedux: number;
    monthlySpendingRedux: any[];
}

const StatisticCard: React.FC<StatisticCardProps> = ({ emailRedux, valueRedux, monthlyBudgetRedux, monthlySpendingRedux }) => {
    // calculate 
    
    const { totalSum, percentage } = calculateSpendingInfo(monthlySpendingRedux,monthlyBudgetRedux)
    console.log(emailRedux);

    return (
        <div className='statistic-card'>
            <p>Cash Flow</p>
            <p>Spent from the budget</p>
            <div className='d-flex'>
                <h2>{totalSum} {valueRedux}</h2>
                <h2 className='text-danger ms-auto'>{percentage.toFixed(2)} %</h2>
            </div>
            <div className='d-flex progress-label'>
                <p>Income</p>
                <h6 className="ms-auto">{monthlyBudgetRedux} {valueRedux}</h6>
            </div>
            <ProgressBar className='progress-bar'now={100} variant='success' />
            <div className='d-flex progress-label'>
                <p>Expenses</p>
                <h6 className="ms-auto">{totalSum} {valueRedux}</h6>
            </div>
            <ProgressBar className='progress-bar' now={percentage} variant='danger' />
        </div>
    )
}

export default StatisticCard;