import React from 'react';
import '../styles/editProfile.css';
import { useInputHandling } from '../components/EditProfile/inputHandling';

export const EditProfile: React.FC = () => {

    const { userInput, monthlyBudgetInput, handleNameChange, handleBudgetChange, handleButtonClick, handleValueChange, moneyValueInput } = useInputHandling();

    return (
        <div className='edit-profile'>
            <h2>Edit Your Information</h2>
            <p>Please enter your basic information to update your account. This will help us better understand your needs and offer you the best possible service.</p>
            <form onSubmit={handleButtonClick}>
                <span>Name</span>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleNameChange}
                    placeholder="Your name"
                />
                <span>Monthly budget</span>
                <div>
                    <input
                        type="number"
                        value={monthlyBudgetInput === null ? '' : monthlyBudgetInput}
                        onChange={handleBudgetChange}
                        placeholder="Your monthly budget"
                        id='input-monthly-budget'
                    />
                    <input
                        type="text"
                        placeholder="Value"
                        value={moneyValueInput === null ? '' : moneyValueInput}
                        onChange={handleValueChange}
                        id='input-value-money'
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};
