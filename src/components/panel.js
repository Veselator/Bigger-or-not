import React from "react"

class Panel extends React.Component {

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
    }

    componentDidMount() {
        this.initWrapper();
    }

    componentDidUpdate(prevProps) {
        console.log(this.props.id, "id: state = ", this.props.panelState)
        if (prevProps.panelState !== this.props.panelState) {
            this.initWrapper();
        }
    }

    getTargetWrapper = () => {
        var targetWrapper = ""
        switch (this.props.panelState) {
            case 0:
                targetWrapper = "normal"
                break
            case 1:
                targetWrapper = "falls"
                break
            case 2:
                targetWrapper = "correct"
                break
        }
        return targetWrapper
    }

    initWrapper = () => {
        var wrapper = this.wrapperRef.current
        wrapper.classList.remove('normal', 'falls', 'correct');
        wrapper.classList.toggle(this.getTargetWrapper())
        console.log(this.props.id, "id: changed state to = ", this.getTargetWrapper())
    }

    handleClick = () => {
        this.props.onClickFunction(this.props.id)
    }
    render() {
        return (
            <div ref={this.wrapperRef} className="region-div">
                <button onClick={this.handleClick} className="region-button">
                    <p>
                        <img src={this.props.regionImage} alt="Region image" className="region-image"></img>
                    </p>
                    <p>
                        <span className="region-name">
                            {this.props.regionName}
                        </span>
                    </p>
                    <p>
                        <span className="value-text">
                            {!this.props.isValuesVisible ? this.props.regionValue + " тис. км²" : " "}
                        </span>
                    </p>
                </button>
            </div>
        )
    }
}

export default Panel