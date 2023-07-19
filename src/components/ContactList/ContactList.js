import { ContactListItem } from './ContactListItem/ContactListItem';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

export const ContactList = ({ contactsToRender, onDeleteContact }) => {
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
  contactsToRender: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
