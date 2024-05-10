import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = ({ language }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    axios.post('http://localhost:8081/change-password', {
      currentPassword,
      newPassword
    }, { withCredentials: true })
    .then(res => {
      console.log(res.data);
      // Handle success, e.g., show a success message
    })
    .catch(err => {
      console.error(err);
      setErrorMessage("Failed to change password");
    });
  };

  return (
    <div>
      <h2>{language === 'fr' ? 'Changer le mot de passe' : 'Change Password'}</h2>
      <div>
        <label htmlFor="currentPassword">{language === 'fr' ? 'Mot de passe actuel' : 'Current Password'}:</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">{language === 'fr' ? 'Nouveau mot de passe' : 'New Password'}:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmNewPassword">
          {language === 'fr' ? 'Confirmer le nouveau mot de passe' : 'Confirm New Password'}:
        </label>
        <input
          type="password"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <button onClick={handleChangePassword}>
        {language === 'fr' ? 'Changer le mot de passe' : 'Change Password'}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ChangePassword;
