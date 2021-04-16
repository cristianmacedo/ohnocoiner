import React from "react";
import ReactDOM from "react-dom";

// Styling
import "./index.css";

import Nav from "./components/Nav";
import Card from "./components/Card";
import Exchanger from "./components/Exchanger";

class App extends React.Component {
    render() {
        return (
            <div>
                <Nav />
                <Card>
                    <Exchanger />
                </Card>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
