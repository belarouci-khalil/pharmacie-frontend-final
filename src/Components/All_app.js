import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Sidebar, Dashbord, Stockk, Reglages, Presence, LineChart, Notification} from './Index'; 
import { SaleHistory } from './Index';

//import { ColorModeContext,useMode } from "./Theme";

function All_app() {
  return (
    <Router>
      <div className='wrapper'>
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="style.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <div className="container">
          <Sidebar/>
          <Switch>
            <Route exact path="/" component={Dashbord}/>
            <Route path="/Reglages" component={Reglages}/>
            <Route path="/Stockk" component={Stockk}/>
            <Route path="/Presence" component={Presence}/>
            <Route path="/SaleHistory" component={SaleHistory}/>

            <Route path="/Notification" component={Notification}/>

            <Route path="/LineChart" component={LineChart}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default All_app;
