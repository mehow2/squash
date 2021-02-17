import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    TextField,
    makeStyles,
    Typography,
    Button,
} from '@material-ui/core';
import axios from '../../../axios';
import { Autocomplete } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
    selectBox: {
        flexDirection: 'row',
        margin: 20,
        display: 'flex',
    },
    autocomplete: {
        width: 200,
        margin: 'auto'
    }
}));

const MatchAddDialog = props => {
    const classes = useStyles();
    const [creator, setCreator] = useState({
        username: useSelector(state => state.authentication.user.username),
        sets: null,
    });
    const [opponent, setOpponent] = useState({
        username: '',
        sets: null,
    });
    const availableUsers = props.members.filter(member => member.username !== creator.username);

    const onSetsChange = (newVal, playerState, changeHandler) => {
        changeHandler({ ...playerState, sets: newVal })
    }

    const calculatedWinner = () => {
        const creator_sets = creator.sets;
        const opponent_sets = opponent.sets;
        if (creator_sets > opponent_sets) {
            return { username: creator.username };
        } else if (opponent_sets > creator_sets) {
            return { username: opponent.username };
        }
    }

    const onCreateHandler = () => {
        const newMatchData = {
            league: props.leagueName,
            creator: { username: creator.username },
            creator_sets: creator.sets,
            opponent: { username: opponent.username },
            opponent_sets: opponent.sets,
            winner: calculatedWinner()
        };
        axios.post('matches/', newMatchData)
            .then(() => { props.onClose() })
            .catch(error => {})
    }

    const onSetOpponent = (value) => {
        setOpponent({
            ...opponent,
            username: value.username
        });
    };

    const isCreateBtnDisabled = () => {
        return !creator.username || !opponent.username || !creator.sets || !opponent.sets;
    }

    return (
        <>
            <Dialog
                open={ props.open }
                onClose={ props.onClose }
                maxWidth={ 'sm' }
                fullWidth
            >
                <DialogTitle>Add new match</DialogTitle>
                <DialogContent>
                    <div className={ classes.selectBox }>
                        <Autocomplete
                            className={ classes.autocomplete }
                            id="creator-select"
                            options={ availableUsers }
                            getOptionLabel={ (member) => member.username }
                            renderInput={ (params) => <TextField variant="standard" { ...params } label="Creator" /> }
                            value={ creator }
                            disabled
                        />
                        <Autocomplete
                            className={ classes.autocomplete }
                            onChange={ (e) => setOpponent(e.target.value) }
                            id="opponent-select"
                            options={ availableUsers }
                            getOptionLabel={ (member) => member.username }
                            renderInput={ (params) => <TextField variant="standard" { ...params } label="Select opponent" /> }
                            onChange={ (e, value) => onSetOpponent(value) }
                        />
                    </div>
                    <Typography align='center' variant="h6" gutterBottom>Sets</Typography>
                    <div className={ classes.selectBox }>
                        <TextField
                            type='number'
                            onChange={ (e) => onSetsChange(e.target.value, creator, setCreator) } className={ classes.autocomplete } placeholder='Player 1' />
                        <TextField
                            type='number'
                            onChange={ (e) => onSetsChange(e.target.value, opponent, setOpponent) } className={ classes.autocomplete } placeholder='Player 2' />
                    </div>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={ props.onClose }>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={ onCreateHandler } disabled={isCreateBtnDisabled()}>
                            Create
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MatchAddDialog;
