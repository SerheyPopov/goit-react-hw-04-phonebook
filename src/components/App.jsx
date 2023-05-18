import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import ContactForm from './Form/Form';
import { ContactList } from './Contacts/ContactList';
import { Filter } from './Filter/Filter';
import { Container, Title, SubTitle } from './App.styled';

const getInitialContacts = () => {
  const contact = localStorage.getItem('contacts');
  if (contact !== null) {
    const parseContacts = JSON.parse(contact);
    return parseContacts;
  }
  const initialContact = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  return initialContact;
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const AddPhoneContact = text => {
    const phoneContact = {
      id: nanoid(),
      name: text.name,
      number: text.number,
    };
    const allertMassage = contacts.filter(
      contact => contact.name.toLowerCase() === phoneContact.name.toLowerCase()
    );

    if (allertMassage.length === 0) {
      return setContacts(prevContacts => [phoneContact, ...prevContacts]);
    }
    alert(phoneContact.name + ' is already in contacts');
  };

  const deletePhoneContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = evt => {
    setFilter(evt.target.value);
  };

  const visiblesContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={AddPhoneContact} />

      <SubTitle>Contacts</SubTitle>
      <Filter onChange={changeFilter} value={filter} />
      <ContactList
        contact={visiblesContact()}
        onDeleteContact={deletePhoneContact}
      />
    </Container>
  );
};

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};
