import React from "react";
import PropTypes from "prop-types";

/**
 * Card-styled container.
 */
export default function Card({ children }) {
    return (
        <div className="container card mb-4">
            <div className="card-body">{[children]}</div>
        </div>
    );
    // return <div className="container card center p-1 mb-1">{[children]}</div>;
}

Card.propTypes = {
    children: PropTypes.array,
};
