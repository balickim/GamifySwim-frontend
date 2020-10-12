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
import Designer from './stimulsoft/Designer';
import ContestantTable from './components/ContestantTable';

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

const reload = () => window.location.reload();

store.dispatch(fetchAuthenticated())
    .then(() => {
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Root} />
                        <AuthRoute exact path="http://localhost:8080/" />
                        <AuthRoute exact path="/stimulsoft" component={Designer} />
                        <Fragment>
                            <div className='content'>
                                <Navigation />
                                    <AuthRoute exact path='/trainings' component={TrainingTable} />
                                    <AuthRoute exact path='/contestants' component={ContestantTable} />
                                    {/* <AuthRoute exact path='/test1' component={test1} /> */}
                                    <AuthRoute exact path='/test2' component={test2} />
                            </div>
                        </Fragment>
                    </Switch>
                </Router>
            </Provider>,
            document.getElementById('root')
        );
    });
