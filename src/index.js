import React, { Fragment } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import history from './history';
// import Root from './components/Root';
import { fetchAuthenticated } from './actions/account';
import './index.css';
import AuthForm from './components/AuthForm';
import Home from './components/Dashboard/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingManagement from './components/trainer/TrainingManagement';
import Navigation from './components/Navigation';
import Designer from './stimulsoft/Designer';
import Contestants from './components/Contestants';
import PermissionDenied from './components/PermissionDenied';
import UserManagement from './components/admin/UserManagement';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

const AuthRoute = props => {
    const { path, component } = props;

    if (!store.getState().account.loggedIn) {
        return <Redirect to={{ pathname: '/' }} />
    }
    return <Route path={path} component={component} />;
}

const authorize = (roleId) => {
        return store.getState().account.roleId === roleId;
    };

store.dispatch(fetchAuthenticated())
    .then(() => {
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/'>
                            {store.getState().account.loggedIn ? <Redirect to="/home" /> : <AuthForm />}
                        </Route>
                        {/* <AuthRoute exact path="http://localhost:8080/" /> */}
                        {/* <AuthRoute exact path="/stimulsoft" component={Designer} /> */}
                        <Fragment>
                            <div className='content'>
                                <Navigation/>
                                    <AuthRoute exact path='/home' component={Home} />
                                    {authorize(3) ? <AuthRoute exact path='/trainingmanagement' component={TrainingManagement}/> : null }
                                    {authorize(1) ? <AuthRoute exact path='/contestants' component={Contestants}/> : null }
                                    {authorize(1) ? <AuthRoute exact path='/usermanagement' component={UserManagement}/> : null }
                            </div>
                        </Fragment>
                    </Switch>
                </Router>
            </Provider>,
            document.getElementById('root')
        );
    });
