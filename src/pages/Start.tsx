import React, { useEffect, useState } from 'react';
import { GrLinkNext } from "react-icons/gr";
import { TfiUnlock } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../utils/fetchDataFile';
import { Button } from 'react-bootstrap';
import { SetEmailAction } from '../app/reducer';
import { setEmail } from '../app/actions';
import supabase from '../utils/supabaseClient';
import { useDispatch } from 'react-redux';
import { useTouchHandling } from '../components/Start/touchHandlingFile';
import logo from '../images/logo.png'
import banner from '../images/banner.png'
import { useMediaQuery } from 'react-responsive';

interface User1 {
    app_metadata: Array<any>;
    aud: string;
    email: string;
}

const Start: React.FC = () => {
    const navigate = useNavigate();
    const { isStarted, handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchHandling();
    const { users } = useFetchData();
    const dispatch = useDispatch();
    const isDesktop = useMediaQuery({ query: '(min-width: 100px)' });

    const [user, setUser] = useState<User1 | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [signedUp, setSignedUp] = useState<boolean>(false);

    useEffect(() => {
        async function authUser() {
            try {
                const { data, error } = await supabase.auth.getUser();

                if (error) {
                    console.error('Error fetching user:', error);
                    return;
                }

                if (data?.user) {
                    setUser(data.user as unknown as User1);

                    const foundUser = users.find((u) => u.email === data.user.email);
                    if (foundUser) {
                        console.log('Pronašli smo korisnika:', foundUser);
                        setSignedUp(true);
                    }

                    dispatch<SetEmailAction>(setEmail(data.user.email as string));
                    console.log(data.user, "auth user", user);
                }
            } catch (error) {
                console.error('Error authenticating user:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        }

        authUser();
    }, [users, dispatch, signedUp]);

    return (
        <div className={`${loading ? 'home loading' : 'start'}`}>
            <div className="loading-container" style={{ display: loading ? 'block' : 'none' }}>
                <span className="loader"></span>
                <img src={logo} alt='Loading Logo' />
            </div>

            <div className='main-container' style={{ display: !loading ? 'block' : 'none' }}>
                <img src={banner} alt='App Logo' />
                <h2>
                    <span>Take Control</span> of Your <br /> Finance Today!
                </h2>
                <p>
                    With our app, you can easily track your income and expenses, set financial goals, and make informed decisions about
                    your money.
                </p>
                {signedUp ?
                    <>
                        {isDesktop &&
                            <Button className='button-to-edit' onClick={handleTouchEnd}>Click to start</Button>
                        }

                        {!isDesktop &&
                            <div
                                className={`slide-to-start ${isStarted ? 'unlocked' : ''}`}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div className="slider">
                                    <GrLinkNext className='icon' />
                                </div>
                                <span className="label">{isStarted ? 'Welcome' : 'Get started'}</span>
                                <div className="confirm-slider">
                                    <TfiUnlock className='icon' />
                                </div>
                            </div>
                        }
                    </>
                    :
                    <Button className='button-to-edit' onClick={() => navigate('/editProfile')}>Edit profile</Button>
                }
            </div>
        </div>
    );
};

export default Start;
