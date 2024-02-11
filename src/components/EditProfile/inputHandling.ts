// inputHandlingFile.ts

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setMonthlyBudget, setMoneyValue } from '../../app/actions'; // Prilagodite putanju prema stvarnom položaju vaših fajlova
import supabase from '../../utils/supabaseClient'; // Prilagodite putanju prema stvarnom položaju vaših fajlova
import { SetMoneyValueAction, SetMonthlyBudgetAction, SetUserNameAction, UserState } from '../../app/reducer'; // Prilagodite putanju prema stvarnom položaju vaših fajlova
import { useNavigate } from 'react-router-dom';
import { useReduxData } from '../../utils/reduxFile';

export const useInputHandling = () => {
  const navigate = useNavigate()
  // Redux
  const dispatch = useDispatch();
  const emailRedux = useSelector((state: UserState) => state.email);

  // Input
  const [userInput, setUserInput] = useState<string>('');
  const [monthlyBudgetInput, setMonthlyBudgetInput] = useState<number>(0);
  const [moneyValueInput, setMoneyValueInput] = useState<string>('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUserInput(event.target.value);
    console.log(event.target.value);
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMonthlyBudgetInput(parseInt(event.target.value, 10));
    console.log(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMoneyValueInput(event.target.value);
    console.log(event.target.value);
  };

  // Input Submit


  const { userNameRedux } = useReduxData();

  const handleButtonClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // supabase push user
    if (!userInput || !monthlyBudgetInput || !moneyValueInput) {
      console.log('error');
    }

    let data, error;

    if (userNameRedux) {
      // Ažuriranje korisnika ako postoji userNameRedux
      const { data: updateData, error: updateError } = await supabase
        .from('users')
        .upsert([{ email: emailRedux, user: userInput, monthly_budget: monthlyBudgetInput, money_value: moneyValueInput }], { onConflict: 'email' });

      data = updateData;
      error = updateError;
    } else {
      // Dodavanje novog korisnika ako ne postoji userNameRedux
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([{ email: emailRedux, user: userInput, monthly_budget: monthlyBudgetInput, money_value: moneyValueInput }]);

      data = insertData;
      error = insertError;
    }


    // redux push
    dispatch<SetUserNameAction>(setUserName(userInput));
    dispatch<SetMonthlyBudgetAction>(setMonthlyBudget(monthlyBudgetInput));
    dispatch<SetMoneyValueAction>(setMoneyValue(moneyValueInput));
    navigate('/home')

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  return {
    userInput,
    monthlyBudgetInput,
    moneyValueInput,
    handleNameChange,
    handleBudgetChange,
    handleButtonClick,
    handleValueChange
  };
};