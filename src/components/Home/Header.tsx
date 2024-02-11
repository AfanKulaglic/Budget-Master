import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Avatar, Chip, Stack } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';
import { useDispatch } from 'react-redux';
import { SetUserNameAction } from '../../app/reducer';
import { setUserName } from '../../app/actions';
import { calculateSpendingInfo } from '../../utils/calculateSpendingInfo';

interface HeaderProps {
  emailRedux: string;
  monthlySpendingRedux: any[],
  monthlyBudgetRedux: number
}

const Header: React.FC<HeaderProps> = ({ emailRedux,monthlySpendingRedux,monthlyBudgetRedux }) => {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>('');
    console.log(emailRedux)
    const dispatch = useDispatch()

    // fetch data
    useEffect(() => {

        const fetchData = async () => {
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('email, user')
                .eq('email', emailRedux);

            if (userError) {
                console.error('Greška pri dohvaćanju korisničkih podataka:', userError.message);
                return;
            }

            if (userData && userData.length > 0) {
                const currentMonthlyExpenses = userData[0].user || [];
                console.log(currentMonthlyExpenses,"db  supa");
                setUsername(userData[0].user)
            }
        };

        fetchData();
    }, [emailRedux]);
    
    // redux
    
    dispatch<SetUserNameAction>(setUserName(username));


    // calculate 
    const { percentage } = calculateSpendingInfo(monthlySpendingRedux,monthlyBudgetRedux)

  return (
    <div className='header'>
        <AppBar position="static">
          <Toolbar className='d-flex justify-content-between toolbar'>
            <IconButton color="inherit">
              <div color="inherit" className='d-flex flex-column'>
                <p>HI, {username} <br /> <span>{percentage.toFixed(2)} % of the budget</span></p>
              </div>
            </IconButton>
            <IconButton color="inherit">
              <Stack direction="row" spacing={1}>
                <Chip
                  className='chip'
                  avatar={
                    <Avatar sx={{ bgcolor: green[600] }}>
                      <FiberManualRecordIcon sx={{ color: green[600] }} />                    
                    </Avatar>
                  }
                  label={
                    <p onClick={() => navigate('/editProfile')}> 
                      My Balance
                    </p>
                  }
                  variant="outlined"
                />
              </Stack>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
  );
}

export default Header;
