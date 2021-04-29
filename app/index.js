import React from "react";
import ReactDOM from "react-dom";

// Styling
import "./index.css";

import Nav from "./components/Nav";
import Exchanger from "./components/Exchanger";

import ExchangeInput from "./components/ExchangeInput";
import ExchangeOutput from "./components/ExchangeOutput";

class App extends React.Component {
    render() {
        return (
            <React.StrictMode>
                <Nav />
                <Exchanger input={ExchangeInput} output={ExchangeOutput} />
            </React.StrictMode>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
