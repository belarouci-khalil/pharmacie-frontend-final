import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Presence.css';
import './Dashbord.css';

const API_BASE_URL = 'http://localhost:3001';

const Presence = () => {
  const [medicaments, setMedicaments] = useState([]);
  const [panier, setPanier] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMedicaments();
  }, []);

  const fetchMedicaments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medicaments`);
      setMedicaments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des médicaments : ', error);
    }
  };

  const ajouterAuPanier = (medicament) => {
    const produitExiste = panier.find(item => item.id === medicament.id);
    if (produitExiste) {
      setPanier(panier.map(item => item.id === medicament.id ? { ...item, quantite: item.quantite + 1 } : item));
    } else {
      setPanier([...panier, { ...medicament, quantite: 1 }]);
    }
  };

  const retirerDuPanier = (medicamentId) => {
    setPanier(panier.filter(item => item.id !== medicamentId));
  };

  const vendreMedicament = async () => {
    try {
      for (const produit of panier) {
        await axios.post(`${API_BASE_URL}/ventes`, {
          medicament_id: produit.iid,
          quantite: produit.quantite,
          prix_unitaire: produit.prix_unitaire,
          date: new Date().toISOString().slice(0, 10),
          heureVente: new Date().toISOString().slice(11, 19),

          nom_medicament: produit.nom
        });

        await axios.put(`${API_BASE_URL}/medicaments/${produit.id}/vente`, {
          quantite: produit.quantite
        });

        await axios.post(`${API_BASE_URL}/historique_ventes`, {
          medicament_id: produit.iid,
          quantite: produit.quantite,
          prix_unitaire: produit.prix_unitaire,
          date_vente: new Date().toISOString().slice(0, 10),
          date: new Date().toISOString().slice(0, 10),

          heureVente: new Date().toISOString().slice(11, 19),
          nom_medicament: produit.nom
        });
      }

      console.log('Vente enregistrée avec succès');
      fetchMedicaments();
      setPanier([]);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la vente : ', error);
    }
  };

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    try {
      const response = await axios.get(`${API_BASE_URL}/medicaments?searchTerm=${e.target.value}`);
      setMedicaments(response.data);
    } catch (error) {
      console.error('Erreur lors de la recherche des médicaments : ', error);
    }
  };

  return (
    <div className='content'>
      <section className="main">
        <section className="attendance">
          <div className="attendance-list">
            <div className="container">
              <div className="medicaments">
                <h2>Médicaments disponibles</h2>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Rechercher un médicament..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Famille</th>
                      <th>Prix (DA)</th>
                      <th>Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicaments.map(medicament => (
                      <tr key={medicament.id}>
                        <td>{medicament.nom}</td>
                        <td>{medicament.famille_medicament}</td>
                        <td>{medicament.prix_unitaire}</td>
                        <td>{medicament.quantite}</td>
                        <td>
                          <button onClick={() => ajouterAuPanier(medicament)} className='CartBtnn'>
                            <span className="IconContainer"> 
                              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#7e97b8" className="cart">
                                <path d="M440 224H248V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v192H8c-13.3 0-24 10.7-24 24s10.7 24 24 24h176v192c0 17.7 14.3 32 32 32s32-14.3 32-32V272h192c17.7 0 32-14.3 32-32s-14.3-32-32-32z"/>
                              </svg>
                            </span>
                            <p className="text">Add to cart</p>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="panier">
                <h2>Panier</h2>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prix (DA)</th>
                      <th>Quantité</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {panier.map(item => (
                      <tr key={item.id}>
                        <td>{item.nom}</td>
                        <td>{item.prix_unitaire}</td>
                        <td>{item.quantite}</td>
                        <td>
                          <button onClick={() => retirerDuPanier(item.id)}>Retirer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <h3>Total: {panier.reduce((acc, item) => acc + (item.prix_unitaire * item.quantite), 0)} DA</h3>
                  <button className='btn' onClick={vendreMedicament}>Finaliser la présence</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Presence;
