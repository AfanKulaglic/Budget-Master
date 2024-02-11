// STORE.TS
import { createStore, Store } from 'redux';
import userReducer, { UserState, UserAction } from './reducer'; // Dodajte SetEmailAction
import { setMonthlyBudget, setMonthlyPlannedSpending,setMonthlySpending, setEmail } from './actions'; // Dodajte setEmail

const store: Store<UserState, UserAction> = createStore(userReducer);

export { store, setMonthlyBudget, setMonthlyPlannedSpending, setEmail, setMonthlySpending };
