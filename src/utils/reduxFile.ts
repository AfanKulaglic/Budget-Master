// reduxFile.ts

import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../app/reducer'; // Make sure to replace with the correct path

// Redux toolkit
export const useReduxData = () => {
  const dispatch = useDispatch();

  const userNameRedux = useSelector((state: UserState) => state.user);
  const monthlyBudgetRedux = useSelector((state: UserState) => state.monthlyBudget);
  const valueRedux = useSelector((state: UserState) => state.value);
  const monthlyPlannedSpendingRedux = useSelector((state: UserState) => state.MonthlyPlannedSpending);
  const monthlySpendingRedux = useSelector((state: UserState) => state.monthlySpending);
  const emailRedux = useSelector((state: UserState) => state.email);

  return {
    dispatch,
    userNameRedux,
    monthlyBudgetRedux,
    valueRedux,
    monthlyPlannedSpendingRedux,
    monthlySpendingRedux,
    emailRedux,
  };
};
