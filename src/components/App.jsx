import { useState, useEffect, useRef } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-0', name: 'Helen', number: '459-12-56' },
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!localStorage.getItem('contacts')) {
        return;
      }
      const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
      if (parsedContacts.length === 0) {
        return;
      } else {
        setContacts(parsedContacts);
      }
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      return alert(`${data.name} is already in contacts.`);
    }

    data.id = nanoid();

    setContacts(prevState => [...prevState, data]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmitHandle={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />

      <ContactList
        contacts={contacts}
        filter={filter}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
