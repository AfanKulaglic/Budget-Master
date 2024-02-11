// SpendingMonthly.tsx
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { IoMdAdd } from 'react-icons/io';
import { Box, Modal } from '@mui/material';
import supabase from '../../utils/supabaseClient';
import { useDispatch } from 'react-redux';
import { SetMonthlySpendingAction } from '../../app/reducer';
import { setMonthlySpending } from '../../app/actions';
import { useReduxData } from '../../utils/reduxFile';
import { format } from 'date-fns';
import { IconChooser } from '../IconChooser';
import {
  CiWifiOn, CiVirus, CiWallet, CiStethoscope, CiSpeaker, CiShoppingCart, CiShoppingBasket, CiRouter,
  CiRead, CiPlug1, CiPlane, CiPizza, CiPickerHalf, CiPen, CiPassport1, CiHospital1, CiHeart,
  CiGlobe, CiGift, CiFries, CiAirportSign1, CiApple, CiAvocado, CiBadgeDollar, CiBank, CiBandage,
  CiBasketball, CiBeaker1, CiBeerMugFull, CiBitcoin, CiBrightnessUp, CiBullhorn, CiBurger, CiCamera,
  CiCoffeeBean, CiCoffeeCup, CiCoinInsert, CiDark, CiDeliveryTruck, CiDesktop, CiDroplet, CiDumbbell,
  CiForkAndKnife,
} from "react-icons/ci";
import { AiOutlineDelete } from 'react-icons/ai';
import { deleteSpending } from '../../utils/deleteSpending';
import AutoOpenSnackbar from '../AutoOpenSnackbar';

interface SpendingMonthlyProps {
  emailRedux: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#1a1a1a',
  color: 'white',
  boxShadow: 24,
  p: 4,
  width: '90vw',
  borderRadius: '30px',
};

const SpendingMonthly: React.FC<SpendingMonthlyProps> = ({ emailRedux }) => {
  // Interface za mapiranje ikona
  interface IconMapping {
    [key: string]: React.ComponentType<any>;
  }

  // Mapiranje ikona
  const iconMapping: IconMapping = {
    CiWifiOn, CiVirus, CiWallet, CiStethoscope, CiSpeaker, CiShoppingCart, CiShoppingBasket,
    CiRouter, CiRead, CiPlug1, CiPlane, CiPizza, CiPickerHalf, CiPen, CiPassport1, CiHospital1,
    CiHeart, CiGlobe, CiGift, CiFries, CiAirportSign1, CiApple, CiAvocado, CiBadgeDollar, CiBank,
    CiBandage, CiBasketball, CiBeaker1, CiBeerMugFull, CiBitcoin, CiBrightnessUp, CiBullhorn,
    CiBurger, CiCamera, CiCoffeeBean, CiCoffeeCup, CiCoinInsert, CiDark, CiDeliveryTruck,
    CiDesktop, CiDroplet, CiDumbbell, CiForkAndKnife
  };

  // State za ažurirane mjesečne troškove
  const [updatedMonthlySpending, setUpdatedMonthlySpending] = useState<Array<{ name: string, value: number, date: string }>>([]);

  // Fetchanje podataka o korisniku
  useEffect(() => {
    const fetchData = async () => {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email, monthly_spending')
        .eq('email', emailRedux);

      if (userError) {
        console.error('Greška pri dohvaćanju korisničkih podataka:', userError.message);
        return;
      }

      if (userData && userData.length > 0) {
        const currentMonthlyExpenses = userData[0].monthly_spending || [];
        setUpdatedMonthlySpending(currentMonthlyExpenses);
      }
    };

    fetchData();
  }, [emailRedux]);

  // Input za unos novog troška
  const [newSpendingNameInput, setNewSpendingNameInput] = useState<string>('');
  const [NewSpendingInput, setNewSpendingInput] = useState<number>(0);

  // Handlers za promjenu unosa
  const handleSpendingNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewSpendingNameInput(event.target.value);
  };

  const handleSpendingInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewSpendingInput(parseFloat(event.target.value));
  };

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // State za ikonu
  const [icon, setIcon] = useState<string>('');

  // Handler za klik na ikonu
  const handleIconClick = (clickedIconName: string) => {
    setIcon(clickedIconName);
  };

  // Handler za gumb
  const handleButtonClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentTime = format(new Date(), 'yyyy-dd-MM HH:mm');

    if (!NewSpendingInput) {
      console.log('error');
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('email, monthly_spending')
      .eq('email', emailRedux);

    if (userError) {
      console.error('Greška pri dohvaćanju korisničkih podataka:', userError.message);
      return;
    }

    const isNewUser = !userData || userData.length === 0;

    try {
      if (isNewUser) {
        console.log('Kreiranje novog korisnika:', emailRedux, newSpendingNameInput, NewSpendingInput);
        await supabase
          .from('users')
          .upsert(
            [{
              email: emailRedux,
              monthly_spending: [newSpendingNameInput, NewSpendingInput]
            }],
            { onConflict: 'email' }
          );
      } else {
        const currentMonthlyExpenses = userData[0].monthly_spending || [];
        const updatedMonthlySpending = [
          ...currentMonthlyExpenses,
          { name: newSpendingNameInput, value: NewSpendingInput, date: currentTime, icon: icon }
        ];
        setUpdatedMonthlySpending(updatedMonthlySpending);

        console.log('Ažuriranje postojećeg korisnika:', emailRedux);

        await supabase
          .from('users')
          .upsert(
            [{
              email: emailRedux,
              monthly_spending: updatedMonthlySpending
            }],
            { onConflict: 'email' }
          );
      }
    } catch (error) {
      console.error('Greška pri upisu korisničkih podataka:', error);
    }

    setNewSpendingInput(0);
    setNewSpendingNameInput('');
    handleClose();
  };

  // Redux
  const dispatch = useDispatch();
  dispatch<SetMonthlySpendingAction>(setMonthlySpending(updatedMonthlySpending));

  const { monthlySpendingRedux }: { monthlySpendingRedux: any[] } = useReduxData();
  const { valueRedux } = useReduxData();

  // Brisanje
  const [key, setKey] = useState(0);
  const [clickedIndex, setClickedIndex] = useState<number>();

  // Funkcija za brisanje stavke
  const deleteItem = ({ index }: { index: number }) => {
    console.log(index);
    setClickedIndex(index);
    if (clickedIndex !== -1) {
      setTimeout(() => {
        setClickedIndex(undefined);
      }, 3000);
    }
  };

  // State za potvrdu brisanja
  const [deletedObject, setDeletedObject] = useState<boolean>(false);

  // Handler za brisanje stavke po indeksu
  const handleDeleteSpendingByIndex = async (indexToDelete: number) => {
    await deleteSpending(indexToDelete, updatedMonthlySpending, emailRedux, setUpdatedMonthlySpending);
    setClickedIndex(undefined);
    setDeletedObject(true);
    setKey(prevKey => prevKey + 1);
  };

  return (
    <>
      {deletedObject && (
        <div key={key}>
          <AutoOpenSnackbar
            buttonContent="close"
            snackbarMessage={'Deleted'}
          />
        </div>
      )}

      <div className='spending-monthly'>
        <h6>Spending This Month</h6>

        <Card className='cards' onClick={handleOpen}>
          <IoMdAdd className='icon first' />
          <div>
            <p>Add new</p>
          </div>
        </Card>

        {monthlySpendingRedux.map((item, index) => {
          const IconComponent = iconMapping[item.icon];

          if (!IconComponent) {
            return null;
          }

          const handleCardClick = () => deleteItem({ index });

          return (
            <Card
              key={index}
              className={`cards ${clickedIndex === index ? 'clicked' : ''}`}
              onClick={handleCardClick}
            >
              {clickedIndex === index ? (
                <AiOutlineDelete
                  onClick={() => handleDeleteSpendingByIndex(index)}
                  style={{ color: 'red' }}
                  className='icon'
                />
              ) : (
                <IconComponent className='icon' />
              )}

              <div>
                <p>{item.name}</p>
                <p>{item.date}</p>
              </div>

              <h2>{item.value} {valueRedux}</h2>
            </Card>
          );
        })}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleButtonClick} className='add-expense'>
              <h2>Add spending</h2>
              <p>Name of the spending</p>
              <input
                id='input'
                type='string'
                value={newSpendingNameInput}
                onChange={handleSpendingNameInputChange}
              />
              <p>Expense value</p>
              <input
                id='input'
                type='number'
                value={NewSpendingInput}
                onChange={handleSpendingInputChange}
              />

              <IconChooser onIconClick={handleIconClick} />

              <button>Submit</button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default SpendingMonthly;