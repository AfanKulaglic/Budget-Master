//ACTIONS.TS
import { SetMonthlyBudgetAction, SetMonthlyPlannedSpendingAction, SetUserNameAction, SetEmailAction, ClearStateAction, SetMoneyValueAction,SetMonthlySpendingAction } from './reducer';

export const setUserName = (user: string): SetUserNameAction  => ({
    type: 'SET_USER_NAME' as const,
    payload: user,
});

export const setMonthlyBudget = (budget: number): SetMonthlyBudgetAction => ({
    type: 'SET_MONTHLY_BUDGET',
    payload: budget,
  });

  export const setMoneyValue = (value: string): SetMoneyValueAction => ({
    type: 'SET_MONEY_VALUE',
    payload: value,
  });
  
  export const setMonthlyPlannedSpending = (expenses: any[]): SetMonthlyPlannedSpendingAction => ({
    type: 'SET_MONTHLY_PLANNED_SPENDING',
    payload: expenses,
  });

  export const setMonthlySpending = (spending: any[]): SetMonthlySpendingAction => ({
    type: 'SET_MONTHLY_SPENDING',
    payload: spending,
  });

  export const setEmail = (email: string): SetEmailAction  => ({
    type: 'SET_EMAIL',
    payload: email,
  });

  export const clearState = (): ClearStateAction => ({
    type: 'CLEAR_STATE',
  });