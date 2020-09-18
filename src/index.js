import React, { Fragment } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import history from './history';
import Root from './components/Root';
import { fetchAuthenticated } from './actions/account';
import './index.css';
import AuthForm from './components/AuthForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingTable from './components/TrainingTable';
import test1 from './components/test1';
import test2 from './components/test2';
import Navigation from './components/Navigation';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

const AuthRoute = props => {
    if (!store.getState().account.loggedIn) {
        return <Redirect to={{ pathname: '/' }} />
    }

    const { component, path } = props;

    return <Route path={path} component={component} />;
}

store.dispatch(fetchAuthenticated())
    .then(() => {
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Root} />
                        <Fragment>
                            <div className='content'>
                                <Navigation />
                                    <AuthRoute exact path='/trainings' component={TrainingTable} />
                                    <AuthRoute exact path='/test1' component={test1} />
                                    <AuthRoute exact path='/test2' component={test2} />
                            </div>
                        </Fragment>
                    </Switch>
                </Router>
            </Provider>,
            document.getElementById('root')
        );
    });
