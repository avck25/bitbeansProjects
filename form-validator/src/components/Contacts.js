import React from 'react';

export default function List(props) {
    function createRow(contact, i) {
        return (
            <li key={i}>{contact['first name'] + ' ' + contact['last name'] + ': ' + contact['phone number']}</li>
        )
    }
    return (
        <ul>
            {props.contacts.map((c, i) => createRow(c, i))}
        </ul>
    )
}