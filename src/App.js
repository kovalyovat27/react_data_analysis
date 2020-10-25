import React from 'react';
import './App.css';
import Reader from "./model/Reader";
import {BrowserRouter as Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import 'bootstrap/dist/css/bootstrap.min.css';

const history = createBrowserHistory()

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Router history={history}>
                    <Reader/>
                </Router>
            </header>
        </div>
    );
}

export default App;
