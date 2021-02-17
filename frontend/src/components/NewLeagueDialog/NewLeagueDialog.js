import React, { useState } from 'react';
import axios from '../../axios';
import { debounce } from 'lodash';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    DialogActions,
    Button,
    Checkbox,
    FormControlLabel,
    Snackbar
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getLeagues } from '../../store/actions/leagues';


const NewLeagueDialog = props => {
    const [leagueName, setLeagueName] = useState(null);
    const [autoAssign, setAutoAssign] = useState(false);
    // const [snackbarOpen, setSnackbarOpen] = useState(false);
    // const [snackbarMsg, setSnackbarMsg] = useState(null);
    const debouncedSetLeagueName = debounce(setLeagueName, 100);
    const dispatch = useDispatch();

    const onInputChange = ({ target: { value } }) => {
        debouncedSetLeagueName(value);
    }

    const onAutoAssignClicked = () => {
        setAutoAssign(!autoAssign);
    }

    const onSubmit = () => {
        axios.post('leagues/',
            {
                name: leagueName,
                join: autoAssign
            })
            .then(() => {
                props.setSnackbarMsg(`League ${leagueName} created successfully!`)
                props.setSnackbarOpen(true);
                dispatch(getLeagues())
            })
            .catch(error => {
                // setSnackbarMsg(`League ${leagueName} couldn\'t be created!`)
                // setSnackbarOpen(true);
                console.log(error);
            });
        props.onClose();
    }

    return (
        <>
            <Dialog
                open={ props.modalOpen }
                onClose={ props.onClose }
                maxWidth={ 'sm' }
                fullWidth
            >
                <DialogTitle>
                    Create New League
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        onChange={ onInputChange }
                        fullWidth
                    />
                    <FormControlLabel
                        label='Auto assign'
                        control={ <Checkbox checked={ autoAssign } onChange={ onAutoAssignClicked } /> }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={ props.onClose }
                        variant="contained"
                        color='primary'>Cancel</Button>
                    <Button
                        onClick={ onSubmit }
                        variant="contained"
                        color='primary'>Create</Button>
                    {/* <Snackbar
                        open={snackbarOpen}
                        message={snackbarMsg}
                        autoHideDuration={3000}
                        anchorOrigin={ {
                            vertical: 'bottom',
                            horizontal: 'left',
                        } } /> */}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NewLeagueDialog;
