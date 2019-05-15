import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import Address from './components/profile/Address';
import EditAddress from './components/profile/EditAddress';
import Order from './components/profile/Order';
import LogoutSuccess from './components/auth/LogoutSuccess';
import PrivateRoute from './components/routing/PrivateRoute';
import Cart from './components/profile/Cart';
import UserInfo from './components/profile/UserInfo';
import PerfumeDetail from './components/perfume/PerfumeDetail';
import AddPerfume from './components/perfume/AddPerfume';
import AllPerfume from './components/perfume/AllPerfume';
import MalePerfume from './components/perfume/MalePerfume';
import FemalePerfume from './components/perfume/FemalePerfume';
import SerachResult from './components/perfume/SerachResult';
import Alert from './components/utils/Alert';
import SpinnerUtils from './components/utils/SpinnerUtils';
import UseInfo from './components/serve/UseInfo';
import Contact from './components/serve/Contact';
import Deliver from './components/serve/Deliver';
import DataProtect from './components/serve/DataProtect';

import './App.scss';
import './scss/mobile.scss';

store.dispatch(loadUser());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Alert />
            <SpinnerUtils />
            <Switch>
              <Route
                exact
                path="/perfumedetail/:perfumeId"
                component={PerfumeDetail}
              />
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/logoutsuccess" component={LogoutSuccess} />
              <Route exact path="/addperfume" component={AddPerfume} />
              <Route exact path="/maleperfume" component={MalePerfume} />
              <Route exact path="/allperfume" component={AllPerfume} />
              <Route exact path="/serchresult" component={SerachResult} />
              <Route exact path="/femaleperfume" component={FemalePerfume} />
              <Route exact path="/useinfo" component={UseInfo} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/deliver" component={Deliver} />
              <Route exact path="/dataprotect" component={DataProtect} />
              <PrivateRoute exact path="/userinfo" component={UserInfo} />
              <PrivateRoute exact path="/address" component={Address} />
              <PrivateRoute exact path="/cart" component={Cart} />
              <PrivateRoute exact path="/editaddress" component={EditAddress} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/order" component={Order} />

              {/* <Route component={Routes} /> */}
            </Switch>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
