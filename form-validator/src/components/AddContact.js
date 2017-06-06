import React from 'react';

export default function Form(props) {

    function handleErrors(e, i) {
        return (
            <li className="error" key={i}>{e.errMsg}</li>
        )
    }
    //disabling the button
    function saveContact(refs) {
        if (props.errors.length > 0) {
            return;
        }
        props.save()
    }

    function createinput(key, index) {
        return (
            <div key={index}>

                <input
                    onChange={props.change}
                    onBlur={props.blur}
                    key={index}
                    name={key}
                    value={props.contact[key]}
                    type='text'
                    placeholder={key} />
                <br />
            </div>
        )
    }
    return (
        <div>
            <ul>
                {props.errors.map((e, i) => handleErrors(e, i))}
            </ul>
            <form refs="form">
                {Object.keys(props.contact).map((k, i) => createinput(k, i))}
                <br />

                <button type="button" onClick={saveContact.bind(this)}>Save Contact</button>
            </form>
        </div>
    )
}