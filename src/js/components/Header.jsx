import React from "react";

export default class Header extends React.Component {

    render() {
        return <nav className="navbar navbar-dark bg-dark mb-3">
            <div className="container">
                <a className="navbar-brand" href="#">Firebase Game Example</a>
            </div>
        </nav>
    }
}
