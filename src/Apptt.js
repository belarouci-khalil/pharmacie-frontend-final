// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Sidebar, Dashbord, Stockk, Reglages, Presence, LineChart, Notification } from './Components/Index'; 
import { SaleHistory } from './Components/Index';
import Login from './Login';
import { AuthProvider, useAuth } from './AuthContext'; // Importer le contexte d'authentification et le hook useAuth

function App() {
  return (
    <AuthProvider> {/* Utiliser le contexte d'authentification */}
      <Router>
        <div className='wrapper'>
          <meta charSet="UTF-8" />
          <link rel="stylesheet" href="style.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
          <div className="container">
            <Switch>
              <Route exact path="/login" component={Login} />
              {/* Définir les routes privées en utilisant le composant PrivateRoute */}
              <PrivateRoute exact path="/" component={Dashbord} />
              <PrivateRoute path="/Reglages" component={Reglages} />
              <PrivateRoute path="/Stockk" component={Stockk} />
              <PrivateRoute path="/Presence" component={Presence} />
              <PrivateRoute path="/SaleHistory" component={SaleHistory} />
              <PrivateRoute path="/Notification" component={Notification} />
              <PrivateRoute path="/LineChart" component={LineChart} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Composant pour protéger les routes privées
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Utiliser le hook useAuth pour accéder à l'état d'authentification

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default App;
