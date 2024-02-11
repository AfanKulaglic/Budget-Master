import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { CiCircleCheck, CiLogout, CiEdit } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useReduxData } from '../../utils/reduxFile';
import { useDispatch } from 'react-redux';
import supabase from '../../utils/supabaseClient';
import { SetMonthlySpendingAction } from '../../app/reducer';
import { clearState, setMonthlySpending } from '../../app/actions';
import { Offcanvas } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';

interface CardProps {
    monthlySpendingRedux: any[];
    valueRedux: string;
}

const CardComponent: React.FC<CardProps> = ({ monthlySpendingRedux, valueRedux }) => {
    const navigate = useNavigate()
    console.log(monthlySpendingRedux, valueRedux)
    const dispatch = useDispatch();

    //toolit
    const [show, setShow] = useState(false);

    const handleCloseCanvas = () => setShow(false);
    const handleShowCanvas = () => setShow(true);

    //end month

    const { emailRedux } = useReduxData();
    const handleButtonClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        // supabase push user
        if (!show) {
            console.log('error');
        }

        let data, error;

        // Ažuriranje korisnika ako postoji userNameRedux
        const { data: updateData, error: updateError } = await supabase
            .from('users')
            .upsert([{ email: emailRedux, monthly_spending: [] }], { onConflict: 'email' });

        data = updateData;
        error = updateError;
        console.log(22)
        handleCloseCanvas();

        dispatch<SetMonthlySpendingAction>(setMonthlySpending([]));
        navigate('/start')

        if (error) {
            console.log(error);
        }
        if (data) {
            console.log(data);
        }
    }

    //klogout 

    const logoutUser = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Greška pri izlogovanju:', error.message);
        } else {
            console.log('Korisnik je uspešno izlogovan.');
            dispatch(clearState()); 
            navigate('/')
        }
    }

    return (
        <div className='card-management'>
            <h6>Management</h6>
            <Card className='cards' onClick={() => handleShowCanvas()}>
                <div>
                    <h6>Wrap Up This Month</h6>
                    <p>Initiate a fresh start for the upcoming month and archive the current one.</p>
                </div>
                <div className='ms-auto' style={{ display: 'flex' }}>
                    <CiCircleCheck style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '5vh' }} id='icon' />
                </div>
            </Card>

            <Card className='cards' onClick={() => navigate('/editProfile')}>
                <div>
                    <h6>Edit Your Account</h6>
                    <p>Personalize your experience by updating your username and monthly budget.</p>
                </div>
                <div className='ms-auto' style={{ display: 'flex' }}>
                    <CiEdit style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '5vh' }} id='icon' />
                </div>
            </Card>

            <Card className='cards text-danger' onClick={logoutUser}>
                <div>
                    <h6>Logout</h6>
                    <p>logout from your account</p>
                </div>
                <div className='ms-auto' style={{ display: 'flex' }}>
                    <CiLogout style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '5vh' }} id='icon' />
                </div>
            </Card>


            <Offcanvas placement='bottom' show={show} onHide={handleCloseCanvas} style={{ height: '170px', background: '#202020', overflow: 'hidden' }}>
                <Offcanvas.Body>
                    <button className='btn w-100' id='btn' style={{ background: '#6115c4', height: '45px' }} onClick={handleButtonClick}>
                        <AiOutlineDelete style={{ marginBottom: '5px', color: 'white', fontSize: '3vh' }} />
                    </button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default CardComponent;
