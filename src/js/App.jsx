import React from "react";
import Header from "./components/Header.jsx";
import Game from "./components/Game.jsx";

export default class App extends React.Component {

    render() {
        return <>
            <Header/>
            <div className="container">
                <Game/>
            </div>
        </>
    }
}
