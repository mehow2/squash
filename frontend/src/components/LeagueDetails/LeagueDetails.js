import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import LeagueMembersList from './LeagueMembersList/LeagueMembersList';
import LeagueMatches from './LeagueMatches/LeagueMatches';
import MatchAddDialog from './MatchAddDialog/MatchAddDialog';
import { IconButton, Grid } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const LeagueDetails = props => {
    const name = props.match.params.name;
    const [leagueDetails, setLeagueDetails] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const updateLeagueDetails = () => {
        axios.get(`leagues/${name}/`)
            .then(({ data }) => {
                setLeagueDetails(data);
            })
            .catch(error => { })
    }

    useEffect(() => {
        updateLeagueDetails();
    }, [dialogOpen])

    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);

    if (!leagueDetails) return null;

    return (
        <>
            <Grid container spacing={ 1 }>
                <Grid item xs>
                    <LeagueMembersList
                        members={ leagueDetails.members }
                        matches={ leagueDetails.matches } />

                </Grid>
                <Grid item xs={ 9 }>
                    <LeagueMatches
                        updateLeagueDetails={updateLeagueDetails}
                        matches={ leagueDetails.matches } />
                </Grid>
                <Grid item xs>
                    <IconButton
                        size='medium'
                        onClick={ handleDialogOpen }>
                        <AddCircle
                            fontSize='large'
                            color='primary' /><span>Add new match</span>
                    </IconButton>
                </Grid>
                <MatchAddDialog
                    open={ dialogOpen }
                    onClose={ handleDialogClose }
                    leagueName={ leagueDetails.name }
                    members={ leagueDetails.members } />
            </Grid>
        </>
    )
}

export default LeagueDetails;
