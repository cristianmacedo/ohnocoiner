import React from "react";
import PropTypes from "prop-types";

/**
 * Animated element designed to temporary show up when some content is still loading.
 */
export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.text,
    };
  }

  componentDidMount() {
    const { speed, text } = this.props;

    this.interval = window.setInterval(() => {
      this.state.content === text + "..."
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + "." }));
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <p>{this.state.content}</p>;
  }
}

Loading.propTypes = {
  speed: PropTypes.number,
  text: PropTypes.string,
};
