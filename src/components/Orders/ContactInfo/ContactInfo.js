import React from 'react';

import Button from '../../UI/Button/Button';
import classes from './ContactInfo.module.css';

const ContactInfo = props => {
    return (
        <div className={classes.ContactInfo}>
            <h2>Enter your contact data:</h2>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Phone" />
            <input type="text" placeholder="Address" />
            <Button type="Success" onClick={props.order}>ORDER</Button>
        </div>
    );
};

export default ContactInfo;