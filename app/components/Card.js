import React from "react";
import PropTypes from "prop-types";

export default function Card({ children }) {
    return <div className="card center p-1 mb-1">{[children]}</div>;
}

Card.propTypes = {
    children: PropTypes.array,
};
