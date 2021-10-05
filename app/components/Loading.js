import React from "react";
import PropTypes from "prop-types";

/**
 * Animated element designed to temporary show up when some content is still loading.
 */

export default function Loading({ text }) {
  return <div class="spinner-border" role="status" />;
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
};
