import React from "react"

class NextButton extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
    }

    handleClick = () => {
        this.props.callbackFunction()
        this.initWrapper();
    }

    componentDidMount() {
        this.initWrapper();
    }

    initWrapper = () => {
        const wrapper = this.wrapperRef.current
        wrapper.classList.toggle(this.props.wrapperState[0] === 0 ? "notActive" : "active")
    }

    componentDidUpdate(prevProps) {
        if (prevProps.wrapperState[0] !== this.props.wrapperState[0]) {
            this.initWrapper();
        }
    }

    render() {
        return (
            <button ref={this.wrapperRef} onClick={this.handleClick} className="next-button">Далі</button>
        )
    }
}

export default NextButton