import React, { useState } from 'react';
import axios from 'axios';

const ChangeUsername = ({ language }) => {
  const [currentUsername, setCurrentUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeUsername = () => {
    axios.post('http://localhost:8081/change-username', {
      newUsername
    }, { withCredentials: true })
    .then(res => {
      console.log(res.data);
      // Handle success, e.g., show a success message
    })
    .catch(err => {
      console.error(err);
      setErrorMessage("Failed to change username");
    });
  };

  return (
    <div>
      <h2>{language === 'fr' ? 'Changer le nom d\'utilisateur' : 'Change Username'}</h2>
      <div>
        <label htmlFor="currentUsername">{language === 'fr' ? 'Nom d\'utilisateur actuel' : 'Current Username'}:</label>
        <input
          type="text"
          id="currentUsername"
          value={currentUsername}
          onChange={(e) => setCurrentUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newUsername">{language === 'fr' ? 'Nouveau nom d\'utilisateur' : 'New Username'}:</label>
        <input
          type="text"
          id="newUsername"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <button onClick={handleChangeUsername}>
        {language === 'fr' ? 'Changer le nom d\'utilisateur' : 'Change Username'}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ChangeUsername;
