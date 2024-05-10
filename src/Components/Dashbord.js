import React, { useState, useEffect } from 'react';
import './Dashbord.css';
import {FaClock, FaShoppingCart, FaDollarSign , FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; // Importez axios

const Dashboard = () => {
  const history = useHistory();
 
  const [revenue, setRevenue] = useState(0);
  const [sales, setSales] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [recentlySoldMedicines, setRecentlySoldMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Nombre de médicaments par page
  const [searchTerm, setSearchTerm] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [revenuJour, setRevenuJour] = useState(null);

  const fetchRevenuJour = async () => {
    try {
      const response = await axios.get('http://localhost:3001/ventes/revenu'); // Utilisez l'URL directement ici
      setRevenuJour(response.data.revenu);
    } catch (error) {
      console.error('Erreur lors de la récupération du revenu par jour : ', error);
    }
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  useEffect(() => {
    fetchRevenuJour(); // Appelez la fonction fetchRevenuJour ici
    

    // Appel à l'API pour récupérer le nombre de produits vendus par jour
    fetch('http://localhost:3001/ventes/medicaments-par-jour')
      .then(response => response.json())
      .then(data => setSales(data.nombre))
      .catch(error => console.error('Erreur lors de la récupération du nombre de produits vendus : ', error));

    // Appel à l'API pour récupérer les médicaments les plus récemment vendus
    fetch('http://localhost:3001/medicaments/recemment-vendus')
      .then(response => response.json())
      .then(data => setRecentlySoldMedicines(data))
      .catch(error => console.error('Erreur lors de la récupération des médicaments récemment vendus : ', error));
  }, []);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }

  const toggleSearchActive = () => {
    setSearchActive(!searchActive);
  }

  const showMedicineDetails = (medicine) => {
    history.push(`/medicine-details/${medicine.id}`);
  }

  return ( 
    <div className='content'>
      <section className="main">
        <div className="content-container">
          <div className="cardBox">
            <div className="card">
              <div>
                <div className="numbers">{currentTime}</div>
                <div className="cardName">Heure actuelle</div>
              </div>
              <div className="iconBx">
              <FaClock />
              </div>
            </div>
            <div className="card">
              <div>
                <div className="numbers">{sales}</div>
                <div className="cardName">Ventes</div>
              </div>
              <div className="iconBx">
                <FaShoppingCart />
              </div>
            </div>
            <div className="card">
              <div>
                <div className="numbers">{revenuJour !== null ? `${revenuJour} DA` : 'Chargement...'} </div>
                <div className="cardName">Revenus</div>
              </div>
              <div className="iconBx">
              <FaDollarSign />
              </div>
            </div>
          </div>
        </div>

        <section className="attendance">
          <div className="attendance-list">
            <h1>Liste des médicaments les plus récemment vendus</h1>
            <div className={`search-container ${searchActive ? 'active' : ''}`}>
              <input
                type="text"
                placeholder="Rechercher un médicament..."
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={toggleSearchActive}
                onBlur={toggleSearchActive}
              />
              <div className="search-line"></div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Date </th>
                  <th>heure de Vente</th>
                  
                  <th>Prix (DA)</th>
                </tr>
              </thead>
              <tbody>
                {recentlySoldMedicines.map((medicine, index) => (
                  <tr key={index}>
                    <td>{medicine.id}</td>
                    <td>{medicine.nom_medicament}</td>    
                    <td>{formatDate(medicine.date)}</td>
                    <td>{medicine.heureVente}</td>
                    <td>{medicine.prix_unitaire ? `${medicine.prix_unitaire	} DA` : 'N/A'}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button className="btn" onClick={prevPage} disabled={currentPage === 1}><FaChevronLeft /></button>
              {[...Array(Math.ceil(recentlySoldMedicines.length / itemsPerPage)).keys()].map(number => (
                <button key={number + 1} className={`btn ${currentPage === number + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(number + 1)}>{number + 1}</button>
              ))}
              <button className="btn" onClick={nextPage} disabled={recentlySoldMedicines.length < itemsPerPage}><FaChevronRight /></button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Dashboard;
