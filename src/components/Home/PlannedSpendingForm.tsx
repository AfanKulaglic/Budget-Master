import React, { useState } from 'react';
import supabase from '../../utils/supabaseClient';

interface Props {
    emailRedux: string;
    handleClose: () => void;
    setUpdatedMonthlyExpenses: (expenses: any[]) => void;
}

const PlannedSpendingForm: React.FC<Props> = ({ emailRedux, handleClose, setUpdatedMonthlyExpenses }) => {
    const [newPlannedSpendingNameInput, setNewPlannedSpendingNameInput] = useState<string>('');
    const [newPlannedSpendingInput, setNewPlannedSpendingInput] = useState<number>(0);

    const handleExpenseNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewPlannedSpendingNameInput(event.target.value);
        console.log(event.target.value);
    };

    const handleExpenseInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewPlannedSpendingInput(parseFloat(event.target.value));
        console.log(event.target.value);
    };

    const handleButtonClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!newPlannedSpendingInput) {
            console.log('error');
            return;
        }

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('email, monthly_expenses')
            .eq('email', emailRedux);

        if (userError) {
            console.error('Greška pri dohvaćanju korisničkih podataka:', userError.message);
            return;
        }

        const upsertData = {
            email: emailRedux,
            monthly_expenses: userData && userData.length > 0 ? [
                ...userData[0].monthly_expenses,
                { name: newPlannedSpendingNameInput, value: newPlannedSpendingInput }
            ] : [
                { name: newPlannedSpendingNameInput, value: newPlannedSpendingInput }
            ]
        };

        console.log(userData ? 'Ažuriranje postojećeg korisnika:' : 'Kreiranje novog korisnika:', emailRedux);

        const { data, error } = await supabase
            .from('users')
            .upsert([upsertData], { onConflict: 'email' });

        if (error) {
            console.error('Greška pri upisu korisničkih podataka:', error.message);
        }

        console.log(data);

        setUpdatedMonthlyExpenses(upsertData.monthly_expenses);
        setNewPlannedSpendingInput(0);
        setNewPlannedSpendingNameInput('');
        handleClose();
    };

    return (
        <form onSubmit={handleButtonClick} className='add-expense'>
            <h2>Add expense</h2>
            <p>Name of the expense</p>
            <input
                id='input'
                type='string'
                value={newPlannedSpendingNameInput}
                onChange={handleExpenseNameInputChange}
            />
            <p>Expense value</p>
            <input
                id='input'
                type='number'
                value={newPlannedSpendingInput}
                onChange={handleExpenseInputChange}
            />
            <button>Submit</button>
        </form>
    );
};

export default PlannedSpendingForm;
