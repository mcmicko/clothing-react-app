import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-up/sign-in-up.component';
import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebease.utils';
import {setCurrentUser} from './redux/user/user.actions';
import CheckoutPage from './pages/checkout/checkout.component';
import CollectionPage from './pages/collection/collection.component'
import {selectCollectionsForPreview} from './redux/shop/shop.selectors';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser, collectionsArray} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }

      setCurrentUser(userAuth);
      addCollectionAndDocuments('collections', collectionsArray
        .map(({title, items}) => ({title, items})));
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    const {currentUser} = this.props
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/shop/:collectionId' component={CollectionPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage/>)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
