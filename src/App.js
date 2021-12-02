import React, { useReducer, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import PersonalDetail from './Components/Sales/PersonalDetail';
import EditPersonalDetail from './Components/Sales/EditPersonalDetail';
import OrderSummary from './Components/Sales/OrderSummary';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Sales from './Components/Sales/Sales';
import EditSales from './Components/Sales/EditSales';
import Order from './Components/Sales/Order';
import Home from './Components/Home/Home';
import Loginpage from './Components/Home/Loginpage';
import About from './Components/Home/About';
import Contact from './Components/Home/Contact';
import Quote  from './Components/Home/Quote';
import New from "./Components/Sales/modal/Status";
import Logout from "./Components/Login/logout";
import OrderView from './Components/Sales/OrderView';
import AdditionalCharges from './Components/Sales/modal/AdditionalCharges';
import Discount from './Components/Sales/modal/Discount'
import { Settings, Account, ResetPassword, CoveringType, Location, Status, Measure } from './Components/Sidebar/pages/Settings';

function App() {

  return (
    <BrowserRouter>
    <div>
        <Route path="/" exact component={Home} />
        <Route path="/loginpage" exact component={Loginpage} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/quote" exact component={Quote} />    
    </div>
      {
        sessionStorage.getItem('tokenTime') === '7200' ?
        (
            <div >
                  <Switch>
                    <Route exact path='/logout'component={Logout} />
                    <Route exact path='/order'component={Order} />
                    <Route exact path="/personal" component={PersonalDetail} />
                    <Route exact path="/personal/:id" component={EditPersonalDetail} />
                    <Route exact path="/ordersummary/:id" component={OrderSummary}/>
                    <Route exact path="/orderview/:id" component={OrderView}/>
                    <Route path="/addorder/:id" component={Sales}/>
                    <Route path="/editorder/:id" component={EditSales}/>
                    <Route path='/settings' component={Settings} />
                    <Route path='/settings/settings1'  component={Account} />
                    <Route path='/settings/settings2'  component={ResetPassword} />
                    <Route path='/settings/settings3'  component={CoveringType} />
                    <Route path='/settings/settings4'  component={Location} />
                    <Route path='/settings/settings5'  component={Status} />
                    <Route path='/settings/settings6'  component={Measure} />
                    <Route path ='/charges/:id' component={AdditionalCharges}/>
                    <Route path ='/discount/:id' component={Discount}/>
                    <Route exact path='/edit/status/:id' component={New}/>
                    
                   
                  </Switch>
            </div>
        )
        : null
      }
    </BrowserRouter>
  );
}

export default App;
