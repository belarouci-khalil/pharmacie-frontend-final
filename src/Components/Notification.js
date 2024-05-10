import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './Nonti.css';

const NotificationComponent = () => {
  const [medicamentsStockCritique, setMedicamentsStockCritique] = useState([]);
  const [medicamentsDateExpirationProche, setMedicamentsDateExpirationProche] = useState([]);
  const [error, setError] = useState(null);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  useEffect(() => {
    fetchMedicamentsStockCritique();
    fetchMedicamentsDateExpirationProche();
  }, []);

  const fetchMedicamentsStockCritique = async () => {
    try {
      const response = await axios.get('http://localhost:3001/medicaments/stock-critique');
      setMedicamentsStockCritique(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des médicaments avec un stock critique');
      console.error(error);
    }
  };

  const fetchMedicamentsDateExpirationProche = async () => {
    try {
      const response = await axios.get('http://localhost:3001/medicaments/date-expiration-proche');
      setMedicamentsDateExpirationProche(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des médicaments avec une date d\'expiration proche');
      console.error(error);
    }
  };

  return (
    <div className='reglages-container'>
      <div className="notification-container">
        <div className="notification-card">
          <h2 className="notification-title">Notifications</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul className="notification-list">
            {medicamentsStockCritique.map(medicament => (
              <li key={medicament.id} className="notification-item">
                <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'red', marginRight: '5px' }} />
                <span style={{ color: 'red' }}>{medicament.nom}</span> - Quantité : {medicament.quantite}
              </li>
            ))}
            {medicamentsDateExpirationProche.map(medicament => (
              <li key={medicament.id} className="notification-item">
                <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'red', marginRight: '5px' }} />
                <span style={{ color: 'red' }}>{medicament.nom}</span> - Date d'expiration : {formatDate(medicament.dateExpiration_medicament)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
