import React from "react";
import ReactDOM from "react-dom";

// Styling
import "./index.css";

import Nav from "./components/Nav";
import Exchanger from "./components/Exchanger";

class App extends React.Component {
    render() {
        return (
            <React.StrictMode>
                <div className="p-1">
                    <Nav />
                    <Exchanger />
                </div>
            </React.StrictMode>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
