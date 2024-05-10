import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SaleHistory.css';

const HistoriqueVentes = () => {
  const [historique, setHistorique] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Nombre d'éléments par page

  useEffect(() => {
    fetchHistoriqueVentes();
  }, [searchDate, currentPage]);

  const fetchHistoriqueVentes = async () => {
    try {
      let url = 'http://localhost:3001/historique_ventes';
      if (searchDate) {
        url = `http://localhost:3001/historique_ventes/recherche/date?date=${searchDate}`;
      }
      const response = await axios.get(url);
      setHistorique(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique des ventes : ', error);
    }
  };

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
    setCurrentPage(1); // Réinitialiser à la première page lors de la recherche
  };

  // Fonction pour formater la date au format local
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Calcul des index du premier et du dernier élément de la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historique.slice(indexOfFirstItem, indexOfLastItem);

  // Gérer le changement de page
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Générer les numéros de page pour la pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(historique.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='content'>
      <section className="main">
        <section className="attendance">
          <div className="attendance-list">
            <div className="sale-history-container">
              <h1>Historique des Ventes de Médicaments</h1>
              <div className="search-container">
                <input
                  type="date"
                  value={searchDate}
                  onChange={handleSearchDateChange}
                />
                <button onClick={fetchHistoriqueVentes}>Rechercher</button>
              </div>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Date</th>
                    <th>Quantité</th>
                    <th>Prix Unité (DA)</th>
                    <th>Total (DA)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((vente) => (
                    <tr key={vente.id}>
                      <td>{vente.id}</td>
                      <td>{vente.nom_medicament}</td>
                      <td>{formatDate(vente.date_vente)}</td>
                      <td>{vente.quantite}</td>
                      <td>{vente.prix_unitaire} DA</td>
                      <td>{vente.quantite * vente.prix_unitaire} DA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button className="btn" onClick={prevPage} disabled={currentPage === 1}>
                  Prev
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    className={`btn ${currentPage === number ? 'active' : ''}`}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                ))}
                <button
                  className="btn"
                  onClick={nextPage}
                  disabled={currentPage >= Math.ceil(historique.length / itemsPerPage)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default HistoriqueVentes;
