import './App.css';
import All_app from './Components/All_app';
import Welcomp from './Components/Pagesb/Welcomp';
import Appp from './Components/Pagesb/Appp';
import MedicineDetails from './Components/MedicineDetails';
function App() {
    /*let Component
    switch (window.location.pathname) {
        case "/welcomepage":
            Component = <WelcomePage/>
            break;
        case "/Welcomepage/Secondpagee":
            Component = <Secondpagee/>
            break;
        case "/Welcomepage/Secondpagee/Login":
            Component = <Loginuser/>
            break;
        case "/Welcomepage/Secondpagee/Login/Dashbord":
            Component = <All_app/>
            break;
    }*/              
  return (<>
{  <All_app/>
}
</>
   /* <>
      <head>
        <meta charSet="UTF-8" />
        <title>Attendance Dashboard | By Code Info</title>
        <link rel="stylesheet" href="style.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      </head>
      <body>
        <div className="container">
          <nav>
            <ul>
              <li>
                <a href="#" className="logo">
                  <img src="./Pic/logo.jpg" alt="Logo" />
                  <span className="nav-item">Khalil</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-menorah"></i>
                  <span className="nav-item">Tableau de bord</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-comment"></i>
                  <span className="nav-item">Message</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chart-bar"></i>
                  <span className="nav-item">Présence</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-cog"></i>
                  <span className="nav-item">Réglages</span>
                </a>
              </li>
              <li>
                <a href="#" className="logout">
                  <i className="fas fa-sign-out-alt"></i>
                  <span className="nav-item">Déconnexion</span>
                </a>
              </li>
            </ul>
          </nav>

          <section className="main">
            <div className="main-top">
              <h1>salariés</h1>
              <i className="fas fa-user-cog"></i>
            </div>
            <div className="users">
              <div className="card">
                <img src="./Pic/photo2.jpg" alt="User 1" />
                <h4>Mohammed Belarouci</h4>
                <p>salarié</p>
                <div className="per">
                  <table>
                    <tr>
                      <td><span>85%</span></td>
                      <td><span>87%</span></td>
                    </tr>
                    <tr>
                      <td>Mois</td>
                      <td>Année</td>
                    </tr>
                  </table>
                </div>
                <button>Profil</button>
              </div>
              <div className="card">
                <img src="./Pic/photo2.jpg" alt="User 2" />
                <h4>abdenour benmostfa</h4>
                <p>salarié</p>
                <div className="per">
                  <table>
                    <tr>
                      <td><span>82%</span></td>
                      <td><span>85%</span></td>
                    </tr>
                    <tr>
                      <td>Mois</td>
                      <td>Année</td>
                    </tr>
                  </table>
                </div>
                <button>Profil</button>
              </div>
              <div className="card">
                <img src="./Pic/photo2.jpg" alt="User 3" />
                <h4>Naghem atallah</h4>
                <p>salarié</p>
                <div className="per">
                  <table>
                    <tr>
                      <td><span>94%</span></td>
                      <td><span>92%</span></td>
                    </tr>
                    <tr>
                      <td>Mois</td>
                      <td>Année</td>
                    </tr>
                  </table>
                </div>
                <button>Profil</button>
              </div>
              <div className="card">
                <img src="./Pic/photo2.jpg" alt="User 4" />
                <h4>maryem benhmed</h4>
                <p>salarié</p>
                <div className="per">
                  <table>
                    <tr>
                      <td><span>85%</span></td>
                      <td><span>82%</span></td>
                    </tr>
                    <tr>
                      <td>Mois</td>
                      <td>Année</td>
                    </tr>
                  </table>
                </div>
                <button>Profile</button>
              </div>
            </div>

            <section className="attendance">
              <div className="attendance-list">
                <h1>Liste de Présence</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Département</th>
                      <th>Date</th>
                      <th>Heure d'arrivée</th>
                      <th>Heure de départ</th>
                      <th>Détails</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01</td>
                      <td>Mohammed Belarouci</td>
                      <td>salarié</td>
                      <td>03-24-22</td>
                      <td>8:00AM</td>
                      <td>3:00PM</td>
                      <td><button>Voir</button></td>
                    </tr>
                    <tr className="active">
                      <td>02</td>
                      <td>Abdenour benmostfa</td>
                      <td>salarié</td>
                      <td>03-24-22</td>
                      <td>9:00AM</td>
                      <td>4:00PM</td>
                      <td><button>Voir</button></td>
                    </tr>
                    <tr>
                      <td>03</td>
                      <td>Naghem atallah</td>
                      <td>salarié</td>
                      <td>03-24-22</td>
                      <td>8:00AM</td>
                      <td>3:00PM</td>
                      <td><button>Voir</button></td>
                    </tr>
                    <tr>
                      <td>04</td>
                      <td>Benhmed meryem</td>
                      <td>salarié</td>
                      <td>03-24-22</td>
                      <td>8:00AM</td>
                      <td>3:00PM</td>
                      <td><button>Voir</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>
      </body>
    </>
*/

  );
}

export default App;
