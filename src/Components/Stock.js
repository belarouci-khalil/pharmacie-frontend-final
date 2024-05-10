import React, { useState, useEffect } from 'react';
import './Message.css';
import { FaTrash } from 'react-icons/fa'; // Import des icônes de Font Awesome
import { useHistory } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Delete from '../icons/Delete';
import { FaRegPenToSquare } from "react-icons/fa6";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'; // Import icons from Ant Design Icons



const Message = () => {
  const [selectedCategory] = useState(null);

  const history = useHistory();
  const [allMedicaments, setAllMedicaments] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(4); // Nombre de médicaments par page
const [searchTerm, setSearchTerm] = useState('');
const [searchActive, setSearchActive] = useState(false);

  const [medicaments, setMedicaments] = useState([]);
  
  const [medicamentActif, setMedicamentActif] = useState({
    id: null,
    nom: "",
    famille: "",
    description: "",
    prix: "",
    stock: "",
    grammage: "",
    dateExpiration: "",
    type: ""
  });
  const [recherche, setRecherche] = useState("");
  const [showTypeOptions, setShowTypeOptions] = useState(false); // État pour afficher/masquer les options de type
  const [showAddMedicamentPopup, setShowAddMedicamentPopup] = useState(false); // État pour afficher/masquer le pop-up d'ajout de médicament
  const [showEditMedicamentPopup, setShowEditMedicamentPopup] = useState(false); // État pour afficher/masquer le pop-up de modification de médicament
  const [showDeleteConfirmationPopup, setShowDeleteConfirmationPopup] = useState(false); // État pour afficher/masquer le pop-up de confirmation de suppression
  const categories = ["Cachet", "Pommade", "Sirop", "Suppositoire", "Injection"]; // Liste des catégories de médicaments

  useEffect(() => {
    const fakeMedicaments = [
      { id: 1, nom: "Aspirine", famille: "Analgesiques", description: "Traitement contre la douleur", prix: "150 ", stock: 100, grammage: "500mg", dateExpiration: "2024-12-31", type: "Cachet" },
      { id: 2, nom: "Paracétamol", famille: "Analgesiques", description: "Traitement contre la fièvre", prix: "200 ", stock: 150, grammage: "1g", dateExpiration: "2023-10-15", type: "Cachet" },
      { id: 3, nom: "Ibuprofène", famille: "Anti-inflammatoires", description: "Traitement anti-inflammatoire", prix: "180 ", stock: 80, grammage: "400mg", dateExpiration: "2023-05-20", type: "Cachet" },
      { id: 4, nom: "Amoxicilline", famille: "Antibiotiques", description: "Antibiotique à large spectre", prix: "300 ", stock: 200, grammage: "500mg", dateExpiration: "2025-07-01", type: "Sirop" },
      { id: 5, nom: "Doliprane", famille: "Analgesiques", description: "Traitement contre la fièvre et les douleurs", prix: "250 ", stock: 120, grammage: "1g", dateExpiration: "2024-09-30", type: "Cachet" },{ id: 6, nom: "Omeprazole", famille: "Anti-ulcéreux", description: "Inhibiteur de la pompe à protons", prix: "220", stock: 90, grammage: "20mg", dateExpiration: "2023-11-15", type: "Gélule" },
      { id: 7, nom: "Loratadine", famille: "Antihistaminiques", description: "Traitement contre les allergies", prix: "180", stock: 110, grammage: "10mg", dateExpiration: "2024-08-20", type: "Comprimé" },
      { id: 8, nom: "Lévothyroxine", famille: "Hormones thyroïdiennes", description: "Traitement de l'hypothyroïdie", prix: "300", stock: 70, grammage: "100µg", dateExpiration: "2025-04-10", type: "Comprimé" },
      { id: 9, nom: "Atorvastatine", famille: "Hypocholestérolémiants", description: "Réduction du cholestérol", prix: "280", stock: 150, grammage: "20mg", dateExpiration: "2023-12-25", type: "Comprimé" },
      { id: 10, nom: "Métronidazole", famille: "Antibiotiques", description: "Traitement des infections bactériennes et parasitaires", prix: "320", stock: 80, grammage: "500mg", dateExpiration: "2024-06-30", type: "Comprimé" },
      { id: 11, nom: "Amlodipine", famille: "Antihypertenseurs", description: "Traitement de l'hypertension artérielle", prix: "240", stock: 120, grammage: "5mg", dateExpiration: "2024-10-05", type: "Comprimé" },
      { id: 12, nom: "Warfarine", famille: "Anticoagulants", description: "Prévention des caillots sanguins", prix: "190", stock: 100, grammage: "2.5mg", dateExpiration: "2023-09-15", type: "Comprimé" },
      { id: 13, nom: "Insuline glargine", famille: "Antidiabétiques", description: "Traitement du diabète", prix: "350", stock: 80, grammage: "100UI/ml", dateExpiration: "2024-07-20", type: "Injection" },
      { id: 14, nom: "Prednisone", famille: "Corticostéroïdes", description: "Traitement anti-inflammatoire", prix: "270", stock: 90, grammage: "5mg", dateExpiration: "2025-01-10", type: "Comprimé" },
      { id: 15, nom: "Morphine", famille: "Analgésiques opioïdes", description: "Traitement de la douleur sévère", prix: "400", stock: 70, grammage: "10mg", dateExpiration: "2024-03-30", type: "Injection" }

      
    ];
    setAllMedicaments(fakeMedicaments);
  }, []);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Filtrer les médicaments en fonction du terme de recherche
  const filteredMedicines = allMedicaments.filter(medicine =>
    medicine.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Récupère les médicaments à afficher sur la page actuelle
  const currentItems = filteredMedicines.slice(indexOfFirstItem, indexOfLastItem);
  
  // Fonction pour passer à la page suivante
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }
  
  // Fonction pour passer à la page précédente
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  }
  
  // Fonction pour gérer le changement dans le terme de recherche
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Réinitialise la page à la première page lors du changement de terme de recherche
  }
  
  // Fonction pour basculer l'état de la recherche
  const toggleSearchActive = () => {
    setSearchActive(!searchActive);
  }
  
  // Fonction pour afficher les détails du médicament
  const showMedicineDetails = (medicine) => {
    // Utilisez la méthode history.push pour naviguer vers la page des détails du médicament avec l'ID du médicament en tant que paramètre d'URL
    history.push(`/medicine-details/${medicine.id}`);
  }

  useEffect(() => {
    setMedicaments(allMedicaments.slice(0, 11));
  }, [allMedicaments]);

  const ajouterOuModifierMedicament = () => {
    // Vérifier si tous les champs obligatoires sont renseignés
    if (
      !medicamentActif.nom ||
      !medicamentActif.famille ||
      !medicamentActif.description ||
      !medicamentActif.prix ||
      !medicamentActif.stock ||
      !medicamentActif.grammage ||
      !medicamentActif.dateExpiration ||
      !medicamentActif.type
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (medicamentActif.id) {
      const index = allMedicaments.findIndex(medicament => medicament.id === medicamentActif.id);
      const nouveauxMedicaments = [...allMedicaments];
      nouveauxMedicaments[index] = medicamentActif;
      setAllMedicaments(nouveauxMedicaments);
    } else {
      const nouvelId = allMedicaments.length > 0 ? allMedicaments[allMedicaments.length - 1].id + 1 : 1;
      const nouveauMedicament = {
        id: nouvelId,
        nom: medicamentActif.nom,
        famille: medicamentActif.famille,
        description: medicamentActif.description,
        prix: medicamentActif.prix,
        stock: medicamentActif.stock,
        grammage: medicamentActif.grammage,
        dateExpiration: medicamentActif.dateExpiration,
        type: medicamentActif.type
      };
      setAllMedicaments([...allMedicaments, nouveauMedicament]);
    }
    setMedicamentActif({
      id: null,
      nom: "",
      famille: "",
      description: "",
      prix: "",
      stock: "",
      grammage: "",
      dateExpiration: "",
      type: ""
    });
    setShowAddMedicamentPopup(false); // Fermer le pop-up d'ajout/modification
    setShowEditMedicamentPopup(false); // Fermer le pop-up de modification après l'ajout/modification
  };

  const openAddMedicamentPopup = () => {
    setShowAddMedicamentPopup(true);
  };

  const closeAddMedicamentPopup = () => {
    setShowAddMedicamentPopup(false);
  };

  const openEditMedicamentPopup = () => {
    setShowEditMedicamentPopup(true);
  };

  const closeEditMedicamentPopup = () => {
    setShowEditMedicamentPopup(false);
  };

  const openDeleteConfirmationPopup = (medicamentId) => {
    setMedicamentActif(medicaments.find(medicament => medicament.id === medicamentId));
    setShowDeleteConfirmationPopup(true);
  };

  const closeDeleteConfirmationPopup = () => {
    setShowDeleteConfirmationPopup(false);
  };

  const supprimerMedicament = (id) => {
    closeDeleteConfirmationPopup(); // Fermer le pop-up de confirmation de suppression
    const nouveauxMedicaments = allMedicaments.filter(medicament => medicament.id !== id);
    setAllMedicaments(nouveauxMedicaments);
  };

  const filtrerMedicaments = (medicament) => {
    return (
      medicament.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      medicament.dateExpiration.toLowerCase().includes(recherche.toLowerCase())
    );
  };

  const handleTypeChange = (type) => {
    setMedicamentActif({ ...medicamentActif, type });
    setShowTypeOptions(false); // Masquer les options de type après la sélection
  };

  return (
    <div className='content'>
    <section className="main">
    <section className="attendance">
    <div className="attendance-list">
    <div className="container">
      
      <div className="stock-section">
        <div><h2>Stock de médicaments</h2></div>
        <div className={`search-containerr ${searchActive ? 'active' : ''}`}>
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
        <table className="stock-section table">
          

          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Famille</th>
              <th>Description</th>
              <th>Prix (DA)</th>
              <th>Stock</th>
              <th>Grammage</th> {/* Nouvelle colonne pour le grammage */}
              <th>Date d'expiration</th>
              <th>Type</th> {/* Nouvelle colonne pour le type */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {currentItems.map(medicament => (
    <tr key={medicament.id}>
        <td>{medicament.id}</td>
        <td>{medicament.nom}</td>
        <td>{medicament.famille}</td>
        <td>{medicament.description}</td>
        <td>{medicament.prix} DA</td>
        <td>{medicament.stock}</td>
        <td>{medicament.grammage || "Non spécifié"}</td>
        <td>{medicament.dateExpiration}</td>
        <td>{medicament.type}</td>
        <td>
         
                  
        <span onClick={() => openDeleteConfirmationPopup(medicament.id)}  style={{ marginRight: '10px', color: '#7e97b8' }}><FaTrash /></span>
                     {/* Icône de suppression */}
                  <span onClick={() => { setMedicamentActif(medicament); openEditMedicamentPopup(); }} style={{ marginRight: '10px', color: '#7e97b8' ,fontSize: '20px' }}><FaRegPenToSquare /></span> {/* Icône de modification */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
              <button className="btn" onClick={prevPage} disabled={currentPage === 1}><FaChevronLeft /></button>
              {[...Array(Math.ceil(filteredMedicines.length / itemsPerPage)).keys()].map(number => (
                <button key={number + 1} className={`btn ${currentPage === number + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(number + 1)}>{number + 1}</button>
              ))}
              <button className="btn" onClick={nextPage} disabled={currentItems.length < itemsPerPage}><FaChevronRight /></button>
            </div>
        
        
      </div>

      {showAddMedicamentPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Ajouter un médicament</h2>
            <input type="text" placeholder="Nom" value={medicamentActif.nom} onChange={(e) => setMedicamentActif({ ...medicamentActif, nom: e.target.value })} />
            <input type="text" placeholder="Famille" value={medicamentActif.famille} onChange={(e) => setMedicamentActif({ ...medicamentActif, famille: e.target.value })} />
            <input type="text" placeholder="Description" value={medicamentActif.description} onChange={(e) => setMedicamentActif({ ...medicamentActif, description: e.target.value })} />
            <input type="number" placeholder="Prix (DA)" value={medicamentActif.prix} onChange={(e) => setMedicamentActif({ ...medicamentActif, prix: e.target.value })} />
            <input type="number" placeholder="Stock" value={medicamentActif.stock} onChange={(e) => setMedicamentActif({ ...medicamentActif, stock: e.target.value })} />
            <input type="text" placeholder="Grammage" value={medicamentActif.grammage} onChange={(e) => setMedicamentActif({ ...medicamentActif, grammage: e.target.value })} />
            <input type="date" placeholder="Date d'expiration" value={medicamentActif.dateExpiration} onChange={(e) => setMedicamentActif({ ...medicamentActif, dateExpiration: e.target.value })} />
            <select className='categoryy' value={medicamentActif.type} onChange={(e) => setMedicamentActif({ ...medicamentActif, type: e.target.value })}>
              <option  value="">Sélectionner un type</option>
              {categories.map(category => (
                <option  key={category} value={category}>{category}</option>
              ))}
            </select>
            <button onClick={ajouterOuModifierMedicament}>Ajouter</button>
            <button onClick={closeAddMedicamentPopup}>Annuler</button>
          </div>
        </div> 
      )}

      {showEditMedicamentPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Modifier le médicament</h2>
            <input type="text" placeholder="Nom" value={medicamentActif.nom} onChange={(e) => setMedicamentActif({ ...medicamentActif, nom: e.target.value })} />
            <input type="text" placeholder="Famille" value={medicamentActif.famille} onChange={(e) => setMedicamentActif({ ...medicamentActif, famille: e.target.value })} />
            <input type="text" placeholder="Description" value={medicamentActif.description} onChange={(e) => setMedicamentActif({ ...medicamentActif, description: e.target.value })} />
            <input type="number" placeholder="Prix (DA)" value={medicamentActif.prix} onChange={(e) => setMedicamentActif({ ...medicamentActif, prix: e.target.value })} />
            <input type="number" placeholder="Stock" value={medicamentActif.stock} onChange={(e) => setMedicamentActif({ ...medicamentActif, stock: e.target.value })} />
            <input type="text" placeholder="Grammage" value={medicamentActif.grammage} onChange={(e) => setMedicamentActif({ ...medicamentActif, grammage: e.target.value })} />
            <input type="date" placeholder="Date d'expiration" value={medicamentActif.dateExpiration} onChange={(e) => setMedicamentActif({ ...medicamentActif, dateExpiration: e.target.value })} />
            <select value={medicamentActif.type} onChange={(e) => setMedicamentActif({ ...medicamentActif, type: e.target.value })}>
              <option value="">Sélectionner un type</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button onClick={ajouterOuModifierMedicament} className='bbutton' >Modifier</button>
            <button onClick={closeEditMedicamentPopup} className='bbbutton'>Annuler</button>
          </div>
        </div>
      )}

      {showDeleteConfirmationPopup && (
        <div className="popup">
           <div className="icon">
     <Delete/>
    </div>
          <div className="popup-content">
            <h2 style={{color: "#a42222"}} >Confirmation de suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer ce médicament ?</p>
            <button onClick={() => supprimerMedicament(medicamentActif.id)} className='bbutton' >Oui</button>
            <button onClick={closeDeleteConfirmationPopup} className='bbbutton' >Non</button>
          </div>
        </div>
      )}

      <button onClick={openAddMedicamentPopup} className="CartBtn">
      <span class="IconContainer"> 
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#7e97b8" class="cart">
  <path d="M440 224H248V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v192H8c-13.3 0-24 10.7-24 24s10.7 24 24 24h176v192c0 17.7 14.3 32 32 32s32-14.3 32-32V272h192c17.7 0 32-14.3 32-32s-14.3-32-32-32z"/>
</svg>
  </span>
  <p class="text">Add a Med</p>
</button>
         
    </div></div></section></section></div>
   
  );
}

export default Message;
