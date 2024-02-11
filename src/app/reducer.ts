// REDUCER.TS
export interface UserState {
  user: string;
  monthlyBudget: number;
  value: string;
  MonthlyPlannedSpending: number[];
  monthlySpending: any[];
  email: string;
}

export interface SetUserNameAction {
  type: 'SET_USER_NAME';
  payload: string;
  [key: string]: any;
}

export interface SetMonthlyBudgetAction {
  type: 'SET_MONTHLY_BUDGET';
  payload: number;
  [key: string]: unknown;
}

export interface SetMoneyValueAction {
  type: 'SET_MONEY_VALUE';
  payload: string;
  [key: string]: any;
}

export interface SetMonthlyPlannedSpendingAction {
  type: 'SET_MONTHLY_PLANNED_SPENDING';
  payload: any[];
  [key: string]: unknown;
}

export interface SetMonthlySpendingAction {
  type: 'SET_MONTHLY_SPENDING';
  payload: any[];
  [key: string]: unknown;
}

export interface SetEmailAction {
  type: 'SET_EMAIL';
  payload: string;
  [key: string]: any;
}

export interface ClearStateAction {
  type: 'CLEAR_STATE';
  [key: string]: any;
}

export type UserAction = SetUserNameAction | SetMonthlyBudgetAction | SetMoneyValueAction | SetMonthlyPlannedSpendingAction | SetMonthlySpendingAction | SetEmailAction | ClearStateAction ;

const initialState: UserState = {
  user: '',
  monthlyBudget: 0, // Postavite početnu vrijednost prema potrebi
  value: 'EUR',
  MonthlyPlannedSpending: [],
  monthlySpending: [],
  email: ""
};

const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_MONTHLY_BUDGET':
      return {
        ...state,
        monthlyBudget: action.payload,
      };
    case 'SET_MONEY_VALUE':
      return {
        ...state,
        value: action.payload,
      };
    case 'SET_MONTHLY_PLANNED_SPENDING':
      return {
        ...state,
        MonthlyPlannedSpending: action.payload,
      };
    case 'SET_MONTHLY_SPENDING':
      return {
        ...state,
        monthlySpending: action.payload,
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'CLEAR_STATE':
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
