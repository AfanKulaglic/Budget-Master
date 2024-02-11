import React, { useEffect, useState } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useReduxData } from '../utils/reduxFile.ts';
import Header from '../components/Home/Header';
import CardComponent from '../components/Home/CardComponent';
import MyIncome from '../components/Home/MyIncome';
import SpendingMonthly from '../components/Home/SpendingMonthly.tsx';
import Navbar from '../components/Navbar.tsx';
import AutoOpenSnackbar from '../components/AutoOpenSnackbar.tsx';
import Chart from '../components/Statistics/Chart.tsx';
import StatisticCard from '../components/Statistics/StatisticCard.tsx';
import Card from '../components/Management/Card.tsx';
import logo from '../images/logo.png';

export const Home: React.FC = () => {
  const { monthlyBudgetRedux, emailRedux, valueRedux, userNameRedux, monthlySpendingRedux,monthlyPlannedSpendingRedux } = useReduxData();
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState('firstPage');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className={`home ${loading ? 'loading' : ''}`}>

      <div className="loading-container" style={{ display: loading ? 'block' : 'none' }}>
        <span className="loader"></span>
        <img src={logo} alt='Loading Logo' />
      </div>

      <div style={{ display: !loading ? 'block' : 'none' }}>
        <Header emailRedux={emailRedux} monthlySpendingRedux={monthlySpendingRedux} monthlyBudgetRedux={monthlyBudgetRedux} />
        <AutoOpenSnackbar
          buttonContent="close"
          snackbarMessage={'Welcome ' + userNameRedux}
        />

        {/* Planned Page */}
        <div style={{ display: page === 'firstPage' ? 'block' : 'none' }}>
          <CardComponent monthlyBudgetRedux={monthlyBudgetRedux} emailRedux={emailRedux} monthlyPlannedSpendingRedux={monthlyPlannedSpendingRedux} />
          <MyIncome monthlyBudgetRedux={monthlyBudgetRedux} valueRedux={valueRedux} monthlySpendingRedux={monthlySpendingRedux} />
        </div>

        {/* Spending Page */}
        <div style={{ display: page === 'secondPage' ? 'block' : 'none' }}>
          <StatisticCard emailRedux={emailRedux} valueRedux={valueRedux} monthlyBudgetRedux={monthlyBudgetRedux} monthlySpendingRedux={monthlySpendingRedux} />
          <Chart monthlySpendingRedux={monthlySpendingRedux} valueRedux={valueRedux} />
        </div>

        <div style={{ display: page === 'secondPage' || page === 'firstPage' ? 'block' : 'none' }}>
          <SpendingMonthly emailRedux={emailRedux} />
        </div>

        {/* Third Page */}
        <div style={{ display: page === 'thirdPage' ? 'block' : 'none' }}>
          <Card monthlySpendingRedux={monthlySpendingRedux} valueRedux={valueRedux} />
        </div>

        <Navbar page={page} setPage={setPage} />
      </div>

    </div>
  );
};
