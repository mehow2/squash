import React, { useState } from 'react';
import axios from '../../../axios';
import { useSelector } from 'react-redux';
import {
    makeStyles,
    Paper,
    Table,
    TableHead,
    TableCell,
    TableContainer,
    TableRow,
    TableBody,
    Button,
    CircularProgress
} from '@material-ui/core';
import dateTime from 'dateformat';

const useStyles = makeStyles(theme => ({
    root: {
        width: '80%',
        margin: 'auto'
    },
    currentUser: {
        fontWeight: 'bold'
    }
}));

const LeagueMatches = props => {
    const classes = useStyles();
    const user = useSelector(state => state.authentication.user);
    const [loading, setLoading] = useState(false);

    const onConfirm = ({ id }) => {
        setLoading(true);
        axios.patch(`/matches/${id}/`, { is_confirmed: true })
            .then(() => {
                setLoading(false);
                props.updateLeagueDetails();
            });
    };

    const playerFormatter = val => {
        if (!val) return '-';

        if (user.username === val.username) {
            return <span className={ classes.currentUser }>{ val.username }</span>
        }
        return val.username
    }
    const isConfirmedFormatter = (confirmed, match) => {
        if (loading) return <CircularProgress size={ 20 } />
        if (match.opponent.username === user.username && !confirmed) {
            return <Button color='secondary' onClick={ () => onConfirm(match) }> Confirm </Button>
        }
        return confirmed ? 'Yes' : 'No'
    };

    const datetimeFormatter = (datetime) => dateTime(datetime, "dddd, mmmm dS, yyyy, h:MM:ss TT");

    const columns = [
        { id: 'creator', label: 'Creator', minWidth: 50, align: 'center', format: playerFormatter },
        { id: 'sets', label: 'Sets', minWidth: 50, align: 'center' },
        { id: 'opponent', label: 'Opponent', minWidth: 50, align: 'center', format: playerFormatter },
        { id: 'winner', label: 'Winner', format: playerFormatter },
        { id: 'datetime', label: 'Datetime', align: 'center', format: datetimeFormatter },
        { id: 'is_confirmed', label: 'Confirmed', align: 'center', format: isConfirmedFormatter }
    ]

    const tableColumns = (
        <TableRow hover>
            { columns.map(col => (
                <TableCell key={ col.id } align={ col.align }>
                    { col.label }
                </TableCell>
            )) }
        </TableRow>
    );

    const tableRows = props.matches.map(match => (
        <TableRow key={ match.id }>
            { columns.map(col => (
                <TableCell key={ col.id } align={ col.align }>
                    {col.format ? col.format(match[col.id], match) : match[col.id] }
                </TableCell>
            )) }
        </TableRow>
    ));

    return (
        <>
            <Paper className={ classes.root } elevation={ 3 }>
                <TableContainer>
                    <Table>
                        <TableHead>
                            { tableColumns }
                        </TableHead>
                        <TableBody>
                            { tableRows }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}

export default LeagueMatches;
