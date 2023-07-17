import { ContactListItem } from './ContactListItem/ContactListItem';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

export const ContactList = ({ contacts, filter, onDeleteContact }) => {
  const showContactByName = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const contactsToRender = showContactByName();

  return (
    <ul>
      {contactsToRender.map(el => (
        <li key={el.id} className={styles.item}>
          <ContactListItem contact={el} onDeleteContact={onDeleteContact} />
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
