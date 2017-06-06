import React, { Component } from 'react';
import AddContact from './components/AddContact';
import Contacts from './components/Contacts';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contact: {
        "first name": '',
        "last name": '',
        email: '',
        zip: '',
        "phone number": ''
      },
      requiredFields: ['last name', 'email', 'phone number'],
      contacts: [],
      errors: []
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.addContact = this.addContact.bind(this);
  }

  checkValidEmailAddress(email) {

  }

  // clear all inputs
  clearForm() {
    let contact = this.state.contact;
    Object.keys(contact).forEach(key => {
      contact[key] = '';
    });
    this.setState({ contact });
  }
  //handle change event
  changeHandler(e) {
    let contact = this.state.contact;
    contact[e.target.name] = e.target.value;
    this.setState({ contact });
  }
  //handle blur event
  blurHandler(e) {
    let required = this.state.requiredFields.includes(e.target.name);
    if (required) {
      let errors = this.state.errors,
        name = e.target.name;
      //nothing typed in
      if (e.target.value === '') {
        let exists = errors.find((err => {
          return name === err.errName;
        }));
        //checking if error already exists  to see if need add
        if (!exists) {
          errors.push({ errName: name, errMsg: name + ' is required' });
        }
      }
      //information put in remove error
      else {
        let index = errors.map(err => { return err.errName; }).indexOf(name);
        if (index !== -1) {
          errors.splice(index, 1);
        }
      }
      this.setState({ errors });
    }
  }
  //ad  the contact
  addContact() {
    let contacts = this.state.contacts,
      contact = this.state.contact,
      errors = this.state.errors;

    Object.keys(contact).forEach((k) => {
      if (this.state.requiredFields.includes(k) && contact[k] === '') {
        errors.push({ errName: k, errMsg: k + ' is required' });
      }
    });
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    } else {
      contacts.push(Object.assign({}, contact));
      this.setState({ contacts }, function () {
        this.clearForm();
      });
    }

  }

  render() {
    return (
      <div className="App">
        <AddContact reqFields={this.state.requiredFields} errors={this.state.errors} contact={this.state.contact} change={this.changeHandler} blur={this.blurHandler} save={this.addContact} />
        <Contacts contacts={this.state.contacts} />
      </div>
    );
  }
}

export default App;
