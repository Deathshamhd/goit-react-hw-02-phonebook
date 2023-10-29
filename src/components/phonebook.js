import React, { Component } from 'react';

import{
    MainContainer,
    ContactsTable,
    AddContactBttn,
    ContactDetails,
    ContactsContainer,
    FindContact,
    RemoveBttn
} from './phonebook.styled'

export class PhoneBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            filter: '',
            name: '',
            number: '',
        };
    }

    handleChange = e => {
        
        this.setState({
            name: e.target.value
        });
        
        
    };
    handleNumberChange = e => {
        this.setState({
            number: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { contacts, name, number } = this.state;

        if (name.trim() && number.trim() !== '') {
            if (contacts.some(contact => contact.name === name)){
                window.alert('Error: Contact already exists.')
            } else{
                // If contact doesn't exist, create a new contact object with the current timestamp as the unique 'id'
                const newContact = {
                    id: Date.now(),
                    name: name,
                    number: number,
                }
                // Add the new contact to the contacts array and reset the name field

                this.setState(() => ({
                    contacts: [...contacts, newContact],
                    name: '',
                    number: ''
                }));
            }
            
        } 
    };
    // Event handler for changes in the filter input field
    handleFilterChange = e => {
        this.setState({
            filter: e.target.value
        })
    }

    handleRemove = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId)
        }))
    
    }

    render() {
        // Extract the values from the state for ease of use
        const { number, name, contacts, filter } = this.state;

         // Filter the contacts based on the 'filter' state
         const filteredContacts = contacts.filter(contact => contact.name.includes(filter))

        const ContactForm = () => {
            return(
                <div>
                    <MainContainer>
                    <h1>Phonebook</h1>
                    <ContactsTable>
                {/* Input field for entering contact name */}
                <ContactDetails>Name</ContactDetails>
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
                    required
                    value={name} // Bind the input value to the 'name' state
                    onChange={this.handleChange} // Call handleChange function when the input value changes
                />
                <ContactDetails>Phone Number</ContactDetails>
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={this.handleNumberChange}
                /> <br></br>
                <AddContactBttn onClick={this.handleSubmit}>Add contact</AddContactBttn>
                </ContactsTable>
                </MainContainer>
                </div>

            )
        }
        
        const Filter = () => {
            return(
                <div>
                    <ContactsContainer>
                    <h2>Contacts</h2>
                    <FindContact>Find contacts by name</FindContact>
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
                    // Display the list of contacts using the 'ul' and 'li' elements
                    <ul>
                        {filteredContacts.map(({name, number, id})=>(
                            <li key={id}> {name}: {number} 
                            
                            <RemoveBttn type='button' onClick={() => this.handleRemove(id)}>Delete Contact</RemoveBttn>
                            </li>  
                        ))
                        }
                    </ul>
                )}  
                </ContactsContainer>
                </div>
            )
        }

        return(
            <div>
                <ContactForm></ContactForm>
                <Filter></Filter>
            </div>
        )
    }
}