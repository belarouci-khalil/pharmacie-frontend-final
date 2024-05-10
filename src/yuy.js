// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Sidebar, Dashbord, Stockk, Reglages, Presence, LineChart, Notification } from './Components/Index'; 
import { SaleHistory } from './Components/Index';
import Login from './Login';
import { AuthProvider, useAuth } from './AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className='wrapper'>
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="style.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <div className="container">
          {isAuthenticated && <Sidebar />}
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute isAuthenticated={isAuthenticated} path="/" component={Dashbord} />
            <ProtectedRoute isAuthenticated={isAuthenticated} path="/Reglages" component={Reglages} />
            <ProtectedRoute isAuthenticated={isAuthenticated} path="/stockk" component={Stockk} />
            <ProtectedRoute isAuthenticated={isAuthenticated} path="/presence" component={Presence} />
            <ProtectedRoute isAuthenticated={isAuthenticated} path="/sale-history" component={SaleHistory} />
            <ProtectedRoute isAuthenticated={isAuthenticated} path="/notification" component={Notification} />
            <ProtectedRoute isAuthenticated={isAuthenticated} path="/line-chart" component={LineChart} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    )}
  />
);

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;