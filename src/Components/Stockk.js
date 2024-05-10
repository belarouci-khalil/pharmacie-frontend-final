import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Message.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Gstock = () => {
  const [allMedicaments, setAllMedicaments] = useState([]);
  const [medicaments, setMedicaments] = useState([]);
  const [medicamentActif, setMedicamentActif] = useState({
    id: null,
    nom: "",
    famille_medicament: "",
    description_medicament: "",
    prix_unitaire: "",
    quantite: "",
    grammage_medicament: "",
    dateExpiration_medicament: "",
    type_medicament: ""
  });
  const categories = ["Cachet", "Pommade", "Sirop", "Suppositoire", "Injection"];
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddMedicamentPopup, setShowAddMedicamentPopup] = useState(false);
  const [showEditMedicamentPopup, setShowEditMedicamentPopup] = useState(false);
  const [showDeleteConfirmationPopup, setShowDeleteConfirmationPopup] = useState(false);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  useEffect(() => {
    fetchMedicaments();
  }, []);

  const fetchMedicaments = () => {
    axios.get('http://localhost:3001/medicaments')
      .then(response => {
        setAllMedicaments(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des médicaments:', error);
        alert('Une erreur s\'est produite lors de la récupération des médicaments');
      });
  }

  useEffect(() => {
    setMedicaments(allMedicaments);
  }, [allMedicaments]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicamentActif(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleAddMedicament = () => {
    axios.post('http://localhost:3001/medicaments', medicamentActif)
      .then(response => {
        alert(response.data);
        fetchMedicaments();
        resetForm();
        window.location.reload(); // Rafraîchir la page
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du médicament:', error);
        alert('Une erreur s\'est produite lors de l\'ajout du médicament');
      });
  }

  const handleDeleteMedicament = (id) => {
    axios.delete(`http://localhost:3001/medicaments/${id}`)
      .then(response => {
        alert(response.data);
        fetchMedicaments();
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du médicament:', error);
        alert('Une erreur s\'est produite lors de la suppression du médicament');
      });
  }

  const handleUpdateMedicament = () => {
    axios.put(`http://localhost:3001/medicaments/${medicamentActif.id}`, medicamentActif)
      .then(response => {
        alert(response.data);
        fetchMedicaments();
        resetForm();
        window.location.reload(); // Rafraîchir la page
      })
      .catch(error => {
        console.error('Erreur lors de la modification du médicament:', error);
        alert('Une erreur s\'est produite lors de la modification du médicament');
      });
  }

  const handleSelectMedicament = (medicamentId) => {
    const selectedMedicament = allMedicaments.find(medicament => medicament.id === medicamentId);
    setMedicamentActif(selectedMedicament);
  }

  const handleSearch = () => {
    axios.get(`http://localhost:3001/medicaments/recherche/nom?nom=${searchTerm}`)
      .then(response => {
        setMedicaments(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la recherche des médicaments:', error);
        alert('Une erreur s\'est produite lors de la recherche des médicaments');
      });
  }

  const resetForm = () => {
    setMedicamentActif({
      id: null,
      nom: "",
      famille_medicament: "",
      description_medicament: "",
      prix_unitaire: "",
      quantite: "",
      grammage_medicament: "",
      dateExpiration_medicament: "",
      type_medicament: ""
    });
  }

  return (
    <div className="container">
      <div className="stock-section">
        <h2>Gestion des médicaments</h2>
        <input
          type="text"
          placeholder="Rechercher un médicament"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Rechercher</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Famille</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Grammage</th>
              <th>Date d'expiration</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicaments.map(medicament => (
              <tr key={medicament.id}>
                <td>{medicament.id}</td>
                <td>{medicament.nom}</td>
                <td>{medicament.famille_medicament}</td>
                <td>{medicament.description_medicament}</td>
                <td>{medicament.prix_unitaire}</td>
                <td>{medicament.quantite}</td>
                <td>{medicament.grammage_medicament}</td>
                <td>{formatDate(medicament.dateExpiration_medicament)}</td>
                <td>{medicament.type_medicament}</td>
                <td>
                  <FaEdit onClick={() => {
                    handleSelectMedicament(medicament.id);
                    setShowEditMedicamentPopup(true);
                  }} />
                  <FaTrash onClick={() => {
                    handleDeleteMedicament(medicament.id);
                  }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setShowAddMedicamentPopup(true)}>Ajouter un médicament</button>
      </div>

      {showAddMedicamentPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Ajouter un médicament</h2>
            <input
              type="text"
              name="nom"
              value={medicamentActif.nom}
              onChange={handleInputChange}
              placeholder="Nom du médicament"
            />
            <input
              type="text"
              name="famille_medicament"
              value={medicamentActif.famille_medicament}
              onChange={handleInputChange}
              placeholder="Famille du médicament"
            />
            <input
              type="text"
              name="description_medicament"
              value={medicamentActif.description_medicament}
              onChange={handleInputChange}
              placeholder="Description du médicament"
            />
            <input
              type="text"
              name="prix_unitaire"
              value={medicamentActif.prix_unitaire}
              onChange={handleInputChange}
              placeholder="Prix du médicament"
            />
            <input
              type="number"
              name="quantite"
              value={medicamentActif.quantite}
              onChange={handleInputChange}
              placeholder="Quantité"
            />
            <input
              type="text"
              name="grammage_medicament"
              value={medicamentActif.grammage_medicament}
              onChange={handleInputChange}
              placeholder="Grammage du médicament"
            />
            <input
              type="date"
              name="dateExpiration_medicament"
              value={medicamentActif.dateExpiration_medicament}
              onChange={handleInputChange}
              placeholder="Date d'expiration du médicament"
            />
            <select
              name="type_medicament"
              value={medicamentActif.type_medicament}
              onChange={handleInputChange}
            >
              <option value="">Sélectionnez un type de médicament</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <button onClick={handleAddMedicament}>Ajouter</button>
            <button onClick={() => {
              setShowAddMedicamentPopup(false);
              resetForm();
            }}>Annuler</button>
          </div>
        </div>
      )}

      {showEditMedicamentPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Modifier le médicament</h2>
            <input
              type="text"
              name="nom"
              value={medicamentActif.nom}
              onChange={handleInputChange}
              placeholder="Nom du médicament"
            />
            <input
              type="text"
              name="famille_medicament"
              value={medicamentActif.famille_medicament}
              onChange={handleInputChange}
              placeholder="Famille du médicament"
            />
            <input
              type="text"
              name="description_medicament"
              value={medicamentActif.description_medicament}
              onChange={handleInputChange}
              placeholder="Description du médicament"
            />
            <input
              type="text"
              name="prix_unitaire"
              value={medicamentActif.prix_unitaire}
              onChange={handleInputChange}
              placeholder="Prix du médicament"
            />
            <input
              type="number"
              name="quantite"
              value={medicamentActif.quantite}
              onChange={handleInputChange}
              placeholder="Quantité"
            />
            <input
              type="text"
              name="grammage_medicament"
              value={medicamentActif.grammage_medicament}
              onChange={handleInputChange}
              placeholder="Grammage du médicament"
            />
            <input
              type="date"
              name="dateExpiration_medicament"
              value={medicamentActif.dateExpiration_medicament}
              onChange={handleInputChange}
              placeholder="Date d'expiration du médicament"
            />
            <select
              name="type_medicament"
              value={medicamentActif.type_medicament}
              onChange={handleInputChange}
            >
              <option value="">Sélectionnez un type de médicament</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <button onClick={handleUpdateMedicament}>Enregistrer</button>
            <button onClick={() => {
              setShowEditMedicamentPopup(false);
              resetForm();
            }}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gstock;
