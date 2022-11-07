import React from 'react';
import './App.scss';
import {BrowserRouter, Link} from "react-router-dom";
import trainListIcon from "./assets/icons/trainList.svg"
import trainIcon from "./assets/icons/train.svg"
import AppRoutes from "./router/router";
import Header from "./components/header/Header";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />

                <div className="work-area">
                    <AppRoutes />
                </div>

                <div className="bottom-nav">
                    <Link to={"train-list"}>
                        <img src={trainListIcon}/>
                    </Link>
                    <Link to={""}>
                        <img src={trainIcon}/>
                    </Link>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
