import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';

const SideBarItem = props => {
    return (
        <ListItem button onClick={ props.opened }>
            <ListItemText primary={ props.text } />
        </ListItem>
    )
};

export default SideBarItem;
