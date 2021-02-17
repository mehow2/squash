import React from 'react';
import SideBarItem from './SideBarItem/SideBarItem';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    Link: {
        textDecoration: 'none'
    }
}))

const SideBarItems = props => {
    const classes = useStyles();

    return (
        <>
            <Link to='/leagues' className={ classes.Link }>
                <SideBarItem
                    text='All Leagues' />
            </Link>
            <SideBarItem
                text='Create New League'
                opened={ props.dialogOpened } />
        </>
    )
};

export default SideBarItems;
