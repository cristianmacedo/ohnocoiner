import React from "react";
import ReactDOM from "react-dom";

// Styling
import "./index.css";

import Nav from "./components/Nav";
import Exchanger from "./components/Exchanger";

class App extends React.Component {
    render() {
        return (
            <div>
                <Nav />
                <Exchanger />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
