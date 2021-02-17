import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../../axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLeagues, sortLeagues } from '../../store/actions/leagues';
import slugify from 'slugify';

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableSortLabel,
    TableRow,
    Button
} from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        width: '60%',
        margin: 'auto',
    },
    container: {
        maxHeight: '100%',
    },
});

export function LeagueTable() {
    const classes = useStyles();
    const leagues = useSelector(state => state.leagues.leagues);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    const [sortedColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const membersFormatter = memberList => {
        const members = memberList.map(member => member.username)
        let repr;
        if (members.length > 3) {
            repr = members.slice(0, 3).join(', ') + '...'
        } else {
            repr = members.join(', ')
        }
        return repr;
    }

    const nameFormatter = name => {
        const slugName = slugify(name, { lower: true })
        return (
            <Link to={ `/leagues/${slugName}` }> { name } </Link>
        );
    };

    const actionFormatter = (val, league) => {
        const leagueMembers = league.members.map(member => member.username);
        if (leagueMembers.includes(user.username)) return '';

        return <Button
            onClick={ () => onJoinClicked(league.name) }
            variant="contained"
            color='primary'>JOIN</Button>
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170, align: 'left', format: (value) => nameFormatter(value) },
        { id: 'members', label: 'Members', minWidth: 100, align: 'left', format: (value) => membersFormatter(value) },
        { id: 'matches_count', label: 'Matches', minWidth: 50, align: 'left' },
        { id: 'action', label: 'Action', align: 'right', format: actionFormatter }
    ];

    useEffect(() => {
        dispatch(getLeagues());
    }, []);

    const onJoinClicked = (name) => {
        const slugName = slugify(name, { lower: true });
        axios.patch(`leagues/${slugName}/join_league/`, { join: true })
            .then(() => {
                dispatch(getLeagues())
            })
            .catch(error => { })
    }

    const onSortClicked = (columnId) => {
        if (!sortedColumn || columnId !== sortedColumn) {
            dispatch(sortLeagues(columnId, 'desc'));
            setSortColumn(columnId);
            setSortDirection('desc');
            return;
        }
        if (sortedColumn === columnId) {
            if (sortDirection === 'desc') {
                dispatch(sortLeagues(columnId, 'asc'));
                setSortDirection('asc');
                return
            }
            setSortDirection('desc');
            setSortColumn(null);
        }
    }

    const tableHeader = columns.map((column) => (
        <TableCell
            key={ column.id }
            align={ column.align }
            style={ { minWidth: column.minWidth } }
        >
            {column.label }
            <TableSortLabel
                active={ column.id === sortedColumn }
                direction={ sortDirection }
                onClick={ () => onSortClicked(column.id) }
            />
        </TableCell>
    ));

    const tableLeagues = leagues.map(league => (
        <TableRow hover tabIndex={ -1 } key={ league.id }>
            { columns.map(col => (
                <TableCell key={ col.id } align={ col.align }>
                    {col.format ? col.format(league[col.id], league) : league[col.id] }
                </TableCell>
            )) }
        </TableRow>
    ));

    return (
        <Paper className={ classes.root }>
            <TableContainer className={ classes.container }>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            { tableHeader }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { tableLeagues }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default LeagueTable;
