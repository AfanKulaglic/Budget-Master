import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { IoMdAdd } from "react-icons/io";
import { Box, Modal } from '@mui/material';
import supabase from '../../utils/supabaseClient';
import { useDispatch } from 'react-redux';
import { setMoneyValue, setMonthlyBudget, setMonthlyPlannedSpending } from '../../app/actions';
import { calculateSpendingInfo } from '../../utils/calculateSpendingInfo';
import { deleteExpense } from '../../utils/deleteExpense';
import AutoOpenSnackbar from '../AutoOpenSnackbar';
import Chart from '../Home/Chart';
import PlannedSpendingForm from './PlannedSpendingForm';
import { Offcanvas } from 'react-bootstrap';
import { AiOutlineDelete } from "react-icons/ai";
import { RxDotsHorizontal } from 'react-icons/rx';
import { CiNoWaitingSign } from 'react-icons/ci';
import { useReduxData } from '../../utils/reduxFile';

interface CardComponentProps {
    monthlyBudgetRedux: number;
    emailRedux: string;
    monthlyPlannedSpendingRedux: any[];
}

const CardComponent: React.FC<CardComponentProps> = ({ emailRedux, monthlyPlannedSpendingRedux }) => {
    const [updatedMonthlyExpenses, setUpdatedMonthlyExpenses] = useState<{ name: string, value: number }[]>([]);
    const [monthlyBudget, setMonthlyBudgetState] = useState<number>(0);
    const [value, setValue] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [deletedObject, setDeletedObject] = useState(false);
    const [clickedIndex, setClickedIndex] = useState<number>(0);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('email, monthly_expenses, monthly_budget, money_value')
                .eq('email', emailRedux);

            if (error) {
                console.error('Error fetching user data:', error.message);
                return;
            }

            if (data && data.length > 0) {
                const { monthly_expenses, monthly_budget, money_value } = data[0];
                setUpdatedMonthlyExpenses(monthly_expenses || []);
                setMonthlyBudgetState(monthly_budget || 0);
                setValue(money_value || '');
            }
        };

        fetchData();
    }, [emailRedux]);

    useEffect(() => {
        dispatch(setMonthlyPlannedSpending(updatedMonthlyExpenses));
        dispatch(setMonthlyBudget(monthlyBudget));
        dispatch(setMoneyValue(value));
    }, [dispatch, updatedMonthlyExpenses, monthlyBudget, value]);

    const handleDeleteExpenseByIndex = async (indexToDelete: number) => {
        setDeletedObject(true);
        if (indexToDelete !== undefined) {
            // Provjeravamo da li je indeks definiran prije nego ga koristimo
            await deleteExpense(indexToDelete, updatedMonthlyExpenses, emailRedux, setUpdatedMonthlyExpenses);
        } else {
            // Ako je indeks undefined, možete poduzeti odgovarajuće radnje
            console.error("Indeks za brisanje nije definiran.");
        }
    };
    

    const { monthlyBudgetRedux, valueRedux } = useReduxData();
    const { totalSum } = calculateSpendingInfo(monthlyPlannedSpendingRedux, monthlyBudgetRedux);

    const responsiveCarousel = {
        0: { items: 2.3 },
        401: { items: 4.4 },
        1024: { items: 3.5 },
    };

    return (
        <>
            <div key={deletedObject ? 'deleted' : 'undeleted'}>
                {deletedObject &&
                    <AutoOpenSnackbar
                        buttonContent="Close"
                        snackbarMessage="Deleted"
                    />
                }
            </div>
            <Card className='card'>
                <CardContent className='card-content-top'>
                    <div className='col'>
                        <p>Planned Expenses</p>
                        <h2>{totalSum} {valueRedux}</h2>
                        <span>{monthlyBudgetRedux - totalSum} {valueRedux} left to budget</span>
                    </div>
                    <div className='col1'>
                        {monthlyPlannedSpendingRedux.length > 0 ?
                            <Chart monthlySpendingRedux={monthlyPlannedSpendingRedux} valueRedux={valueRedux} />
                            :
                            <img src='https://i.ibb.co/QpbdTkV/Screenshot-2024-01-31-191236-1-preview-rev-1.png' alt="No planned expenditure" />
                        }
                    </div>
                </CardContent>
                <CardContent className='card-content-bottom'>
                    <div className='add-item' onClick={() => setOpenModal(true)}>
                        <IoMdAdd id='add-icon' />
                    </div>
                    <div className='carousel'>
                        {monthlyPlannedSpendingRedux.length > 0 ?
                            <AliceCarousel
                                mouseTracking
                                items={monthlyPlannedSpendingRedux.map((expense, index) => (
                                    <div className={`item ${index === 0 ? 'first-item' : index === 1 ? 'second-item' : index === 2 ? 'third-item' : index === 3 ? 'fourth-item' : ''}`} data-value={index + 1} key={index}>
                                        <div className='item-content'>
                                            <RxDotsHorizontal id='options-icon' onClick={() => {
                                                setClickedIndex(index);
                                                setShowOffcanvas(true);
                                            }} />
                                            <p>{expense.name}</p>
                                            <h6>{expense.value} KM</h6>
                                            <Offcanvas key={index} show={showOffcanvas} placement='bottom' onHide={() => setShowOffcanvas(false)} style={{ height: '170px', background: '#202020', overflow: 'hidden' }}>
                                                <Offcanvas.Body>
                                                    <button className='btn w-100' id='btn' style={{ background: '#6115c4', height: '45px' }} onClick={() => {
                                                        handleDeleteExpenseByIndex(clickedIndex);
                                                        setShowOffcanvas(false);
                                                    }}>
                                                        <AiOutlineDelete style={{ marginBottom: '5px', color: 'white', fontSize: '18px' }} />
                                                    </button>
                                                </Offcanvas.Body>
                                            </Offcanvas>
                                        </div>
                                    </div>
                                ))}
                                responsive={responsiveCarousel}
                                controlsStrategy="alternate"
                                disableDotsControls
                                disableButtonsControls
                            />
                            :
                            <div className='item w-100'>
                                <div className='item-content'>
                                    <CiNoWaitingSign id='options-icon' className='bg-danger text-dark' />
                                    <p>No planned expenditure</p>
                                    <h6></h6>
                                </div>
                            </div>
                        }
                    </div>
                </CardContent>
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <PlannedSpendingForm emailRedux={emailRedux} handleClose={() => setOpenModal(false)} setUpdatedMonthlyExpenses={setUpdatedMonthlyExpenses} />
                    </Box>
                </Modal>
            </Card>
        </>
    );
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

export default CardComponent;
