import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    ListItemAvatar,
    makeStyles,
    Avatar,
    Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,
    }
}));

const LeagueMembersList = props => {
    const classes = useStyles();
    const confirmedMatches = props.matches.filter(match => match.is_confirmed);
    const winners = confirmedMatches.map(match => (match.winner));

    const members = props.members.map(member => {
        const user = { username: member.username, wins: 0 };
        winners.forEach(winner => {
            if (!winner) return
            if (winner.username === member.username) {
                user.wins += 1
            }
        });
        return user;
    }).sort((a, b) => b.wins - a.wins);

    return (
        <>
            <Paper className={ classes.root } elevation={ 3 }>
                <List dense >
                    { members.map(member => (
                        <ListItem key={ member.username }>
                            <ListItemAvatar>
                                <Avatar alt={ 'Avatar...' }></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={ member.username }></ListItemText>
                            <ListItemSecondaryAction>
                                <ListItemText primary={ member.wins }></ListItemText>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )) }
                </List>
            </Paper>
        </>
    );
}

export default LeagueMembersList;