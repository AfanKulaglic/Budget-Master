import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

interface AutoOpenSnackbarProps {
    buttonContent: string;
    snackbarMessage: string;
}

const AutoOpenSnackbar: React.FC<AutoOpenSnackbarProps> = ({ buttonContent, snackbarMessage }) => {
    const [state, setState] = useState<SnackbarOrigin & { open: boolean }>({
        open: true,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    useEffect(() => {
        // Zatvori Snackbar nakon 6 sekundi (6000ms)
        const timeoutId = setTimeout(() => {
            setState((prevState) => ({ ...prevState, open: false }));
        }, 6000);

        // Očisti timeout kad se komponenta unmount-uje
        return () => clearTimeout(timeoutId);
    }, []); // Prazan niz znači da će se useEffect pozvati samo prilikom montiranja komponente

    const handleClose = () => {
        setState((prevState) => ({ ...prevState, open: false }));
    };

    const action = (
        <React.Fragment>
            <div className='snackbar'>
                <Button id='btn' color="secondary" size="small" onClick={handleClose}>
                    {buttonContent}
                </Button>
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                </IconButton>
            </div>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbarMessage}
                action={action}
            />
        </div>
    );
};

export default AutoOpenSnackbar;
