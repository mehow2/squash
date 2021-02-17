import React from 'react';
import SideBarItems from './SideBarItems';
import { Drawer, List, Toolbar, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    link: {
        textDecoration: 'none',
    }
}));


const SideBar = props => {
    const classes = useStyles();
    return (
        <Drawer
            className={ classes.drawer }
            variant="permanent"
            classes={ {
                paper: classes.drawerPaper,
            } }
        >
            <Toolbar />
            <div className={ classes.drawerContainer }>
                <List>
                    <SideBarItems
                        dialogOpened={ props.dialogOpened } />
                </List>
                <Divider />
            </div>
        </Drawer>
    )
};

export default SideBar;

