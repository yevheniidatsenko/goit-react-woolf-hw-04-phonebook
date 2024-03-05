import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import styles from './App.module.css';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Beyoncé', number: '342-12-44' },
    { id: 'id-2', name: 'Drake', number: '440-22-78' },
    { id: 'id-3', name: 'Taylor Swift', number: '897-11-20' },
    { id: 'id-4', name: 'Shawn Mendes', number: '284-91-51' },
  ],
  filter: '',
};

const App = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setState(prevState => ({
        ...prevState,
        contacts: JSON.parse(storedContacts),
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const addContact = contact => {
    const isInContacts = state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setState(prevState => ({
      ...prevState,
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };

  const changeFilter = event => {
    setState(prevState => ({
      ...prevState,
      filter: event.target.value,
    }));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = state.filter.toLowerCase();
    return state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const removeContact = contactId => {
    setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <h1 className={styles.title}>Phonebook</h1>

      <ContactForm onSubmit={addContact} />

      <h2 className={styles.title}>Contacts</h2>
      {state.contacts.length > 0 ? (
        <Filter value={state.filter} onChangeFilter={changeFilter} />
      ) : (
        <p className={styles.noContacts}>
          Your phonebook is empty. Add first contact!
        </p>
      )}
      {state.contacts.length > 0 && (
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </div>
  );
};

export default App;
