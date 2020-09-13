import React, {useEffect} from 'react';
import './App.css';
import AuthenticationScreen from './components/AuthenticationScreen';
import {StateProvider, useStateValue} from './StateProvider';
import reducer, {initialState} from './reducer';
// import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Messages from './components/Messages';
import Profile from './components/Profile';
import ReactDOM from 'react-dom';
import Header from "./components/Header";
import NotFound from './components/NotFound';
import HomeScreen from "./components/HomeScreen";

const App = () => {
    const [{user}] = useStateValue();

    useEffect(() => {

    }, []);

    return (
        <Router>
            <div className="App">
                <Header/>
                <div className={"container"}>
                    <Switch>
                        <Route exact path="/">
                            {!user ? <AuthenticationScreen/> : <HomeScreen/>}
                        </Route>
                        <Route path="/chat/:id" children={<Messages/>}/>
                        <Route path="/profile/" children={<Profile/>}/>
                        <Route children={<NotFound/>}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
if (document.getElementById('app')) {
    ReactDOM.render(
        <StateProvider initialState={initialState} reducer={reducer}>
            <App/>
        </StateProvider>, document.getElementById('app'));
}


