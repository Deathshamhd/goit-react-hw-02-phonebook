import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  MainContainer,
  ContactsTable,
  AddContactBttn,
  ContactDetails,
  ContactsContainer,
  FindContact,
  RemoveBttn,
} from './phonebook.styled';

class PhoneBook extends Component {
  constructor(props) {
    super(props);
    // Initialize the component's state
    this.state = {
      contacts: [], // An array to store contact information
      filter: '', // Used to filter contacts by name
      name: '', // Name input field value
      number: '', // Phone number input field value
    };
  }

  handleChange = e => {
    // Update the 'name' state when the name input changes
    this.setState({
      name: e.target.value,
    });
  };

  handleNumberChange = e => {
    // Update the 'number' state when the phone number input changes
    this.setState({
      number: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { contacts, name, number } = this.state;

    // Check if name and number are not empty
    if (name.trim() && number.trim() !== '') {
      if (contacts.some(contact => contact.name === name)) {
        // Alert if a contact with the same name already exists
        window.alert('Error: Contact already exists.');
      } else {
        // If contact doesn't exist, create a new contact object with a unique 'id'
        const newContact = {
          id: nanoid(), // Generate a unique ID for the contact
          name: name, // Name of the contact
          number: number, // Phone number of the contact
        };
        // Add the new contact to the contacts array and reset input fields
        this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
          name: '',
          number: '',
        }));
      }
    }
  };

  handleFilterChange = e => {
    // Update the 'filter' state when the filter input changes
    this.setState({
      filter: e.target.value,
    });
  };

  handleRemove = contactId => {
    // Remove a contact from the contacts array by its ID
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    // Extract state values for easier use
    const { number, name, contacts, filter } = this.state;

    // Filter the contacts based on the 'filter' state
    const filteredContacts = contacts.filter(contact =>
      contact.name.includes(filter)
    );

    return (
      <div>
        {/* Main container */}
        <MainContainer>
          <h1>Phonebook</h1>
          <ContactsTable>
            <ContactDetails>Name</ContactDetails>
            {/* Name input field */}
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={this.handleChange}
            />
            <ContactDetails>Phone Number</ContactDetails>
            {/* Phone number input field */}
            <input
              type="tel"
              name="number"
              required
              value={number}
              onChange={this.handleNumberChange}
            />
            <br></br>
            {/* Button to submit a new contact */}
            <AddContactBttn onClick={this.handleSubmit}>
              Add contact
            </AddContactBttn>
          </ContactsTable>
        </MainContainer>

        {/* Contacts container */}
        <ContactsContainer>
          <h2>Contacts</h2>
          <FindContact>Find contacts by name</FindContact>
          {/* Filter input for searching contacts by name */}
          <input
            type="text"
            placeholder="Search by name"
            value={filter}
            onChange={this.handleFilterChange}
          />

          {filteredContacts.length === 0 ? (
            // Display "No contacts" if there are no contacts in the 'contacts' array
            <h2>No contacts</h2>
          ) : (
            // Display the list of contacts using 'ul' and 'li' elements
            <ul>
              {filteredContacts.map(({ name, number, id }) => (
                <li key={id}>
                  {name}: {number}
                  {/* Button to remove a contact */}
                  <RemoveBttn
                    type="button"
                    onClick={() => this.handleRemove(id)}
                  >
                    Delete Contact
                  </RemoveBttn>
                </li>
              ))}
            </ul>
          )}
        </ContactsContainer>
      </div>
    );
  }
}

export default PhoneBook;