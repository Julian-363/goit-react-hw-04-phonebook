import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import ContactFilter from './ContactFilter';
import { Container, H1, H2 } from '../styles/AppStyles';
import { saveContacts, loadContacts } from './localStorage';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContacts(loadContacts());
  }, []);

  const addContact = contact => {
    if (
      contacts.some(c => c.name.toLowerCase() === contact.name.toLowerCase())
    ) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => {
      const updatedContacts = [...prevContacts, contact];
      saveContacts(updatedContacts);
      return updatedContacts;
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.filter(c => c.id !== id);
      saveContacts(updatedContacts);
      return updatedContacts;
    });
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <H1>Phonebook</H1>
      <ContactFilter filter={filter} handleFilterChange={handleFilterChange} />
      <H2>Add new contact</H2>
      <ContactForm contacts={contacts} addContact={addContact} />
      <H2>Contacts</H2>
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </Container>
  );
};

export default App;
