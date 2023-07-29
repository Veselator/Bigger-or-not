import React from "react"

class EndMenu extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
    }

    // Вызывается после рендеринга
    componentDidMount() {
        this.initWrapper();
    }

    // Вызывается при изменение пропсов
    componentDidUpdate(prevProps) {
        if (prevProps.isGameEnded !== this.props.isGameEnded) {
            this.initWrapper();
        }
    }

    initWrapper = () => {
        const wrapper = this.wrapperRef.current
        wrapper.classList.toggle(this.props.isGameEnded ? "game-ended" : "game-running")
    }

    getRightEndingOfWord = () => {
        var ending = ""

        switch (this.props.score) {
            case 0:
                ending = "ів"
                break
            case 1:
                ending = ""
                break
            case 2:
            case 3:
            case 4:
                ending = "а"
                break
            default:
                ending = "ів"
        }

        return ending
    }

    render() {
        return (
            <div ref={this.wrapperRef} className="end-menu">
                <div className="end-menu-content">
                    <h1 className="end-title-text">Тимчасова невдача!</h1>
                    <h2 className="end-info-text">
                        Ти справжній молодець!<br />
                        Заробив аж <span className="endMoneyCounter">{this.props.score}$</span>!<br />
                        Мої вітання!<br /><br />
                        Перезавантажте сторінку для повторної гри.
                    </h2>
                </div>
            </div>
        )
    }
}

export default EndMenu