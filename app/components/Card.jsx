import React from "react";

import PropTypes from "prop-types";

/**
 * Card-styled container.
 */
export default function Card({ children }) {
  return <div className="container card mb-4 p-4">{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};
