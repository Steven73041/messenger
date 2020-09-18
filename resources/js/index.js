import React, {useEffect} from 'react';
import './App.css';
import AuthenticationScreen from './components/AuthenticationScreen';
import {StateProvider, useStateValue} from './StateProvider';
import reducer, {initialState} from './reducer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Messages from './components/Messages/Messages';
import EditProfile from './components/Users/EditProfile';
import ReactDOM from 'react-dom';
import Header from "./components/Header";
import NotFound from './components/NotFound';
import HomeScreen from "./components/HomeScreen";
import Profile from "./components/Users/Profile";

const App = () => {
    const [{user, loading}] = useStateValue();

    useEffect(() => {

    }, []);

    return (
        <Router>
            <div className="App">
                <Header/>
                <div className={"container"}>
                    <div className={`loading ${!loading ? `d-none` : ``}`}>

                    </div>
                    <Switch>
                        <Route exact path="/">
                            {!user ? <AuthenticationScreen/> : <HomeScreen/>}
                        </Route>
                        <Route path="/chat/:id" children={<Messages/>}/>
                        <Route exact path="/profile/edit" children={<EditProfile/>}/>
                        <Route path="/profile/:userId" children={<Profile/>}/>
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


