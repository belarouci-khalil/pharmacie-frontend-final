// Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ hasNotifications }) => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <a href="/" className="logo">
            <span className="nav-itemm"></span>
            {hasNotifications && <span className="notification-indicator"></span>}
          </a>
        </li>
        <li>
          <a href="/">
            <i className="fas fa-home"></i>
            <span className="nav-item">Tableau de bord</span>
          </a>
        </li>
        <li>
          <a href="/Stockk">
            <i className="fas fa-save"></i>
            <span className="nav-item">Gestion du stock</span>
          </a>
        </li>
        <li>
          <a href="/Presence">
            <i className="fas fa-shopping-cart"></i>
            <span className="nav-item">Gestion des ventes</span>
          </a>
        </li>
        <li>
          <a href="/SaleHistory"> {/* Mettez à jour le lien pour pointer vers la nouvelle page */}
            <i className="fas fa-history"></i> {/* Changer la classe de l'icône ici */}
            <span className="nav-item">Historique des ventes</span>
          </a>
        </li>
        <li>
          <a href="/LineChart" className='link'>
            <i className="fas fa-chart-line"></i>
            <span className="nav-item">Line Chart</span>
          </a>
        </li>
        <li>
          <a href="/Notification">
            <i className="fas fa-bell"></i>
            <span className="nav-item">Notification</span>
            {hasNotifications && <span className="notification-indicator"></span>}
          </a>
        </li>
        <li>
          <a href="/Reglages" className='link'>
            <i className="fas fa-cog"></i>
            <span className="nav-item">Réglages</span>
          </a>
        </li>
        <li>
          <a href="/Loginuser" className="logout">
            <i className="fas fa-sign-out-alt"></i>
            <span className="nav-item">Déconnexion</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;