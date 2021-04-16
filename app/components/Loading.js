import React from "react";

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
