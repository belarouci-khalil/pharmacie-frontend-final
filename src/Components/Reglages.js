import React, { useState } from 'react';
import './Reglages.css';
import './Sidebar.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = () => {
    // Implement your password change logic here
    console.log('Changing password...');
  };

  return (
    <div className="change-password-container">
      <h2> Changer le mot de passe </h2>
      <div className="password-input">
        <label htmlFor="currentPassword"> 'Mot de passe actuel'</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="password-input">
        <label htmlFor="newPassword"> 'Nouveau mot de passe'</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="password-input">
        <label htmlFor="confirmNewPassword">
         Confirmer le nouveau mot de passe'
        </label>
        <input
          type="password"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <button className='btn'  onClick={handleChangePassword}>
        Changer le mot de passe
      </button>
    </div>
  );
};

const ChangeUsername = ({ language }) => {
  const [currentUsername, setCurrentUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const handleChangeUsername = () => {
    // Implement your username change logic here
    console.log('Changing username...');
  };

  return (
    <div className="change-username-container">
      <h2>Changer le nom de'utilisateur </h2>
      <div className="username-input">
        <label htmlFor="currentUsername"> Nom d\'utilisateur actuel </label>
        <input
          type="text"
          id="currentUsername"
          value={currentUsername}
          onChange={(e) => setCurrentUsername(e.target.value)}
        />
      </div>
      <div className="username-input">
        <label htmlFor="newUsername" > Nouveau nom d\'utilisateur </label>
        <input
          type="text"
          id="newUsername"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <button className='btn' onClick={handleChangeUsername}>
        Changer le nom d'utilisateur
      </button>
    </div>
  );
};



const Reglages = () => {
  

  return (
    <div className="reglages-container">
      <li>
          <a className="logoo">
            <img src="./Pic/photo2.jpg" alt="Logo"/>
            <span className="nav-item">User</span>
          </a>
        </li>
    
      <ChangePassword  />
      <ChangeUsername  />
    </div>
  );
};

export default Reglages;
