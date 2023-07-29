import React from "react"

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
    }
    handleClick = () => {
        const wrapper = this.wrapperRef.current;
        wrapper.classList.toggle('is-game-started')
    }

    render() {
        return (
            <div ref={this.wrapperRef} className="main-menu">
                <div className="main-menu-content">
                    <h1 className="title-text">Більше чи менше?</h1>
                    <h2 className="info-text">
                        Бажаєте переірити свої географічні навички чи просто порозважатись?<br />
                        Тоді ви зайшли на правильну адресу! Гра "Більше чи менше?" допоможе в цьому!<br />
                        Правила прості - демонструються дві області, із яких Ви обираєте найбільшу, на Вашу думку,
                        за площею.<br />Назвали правильно - йдете далі, неправильно - пощастить в наступний раз.<br />
                        Успіхів Вам!
                    </h2>
                    <h3 className="author-text">
                        Зробив Борис Соломка
                    </h3>
                    <button onClick={this.handleClick} className="start-button">Почати</button>
                </div>
            </div>
        )
    }
}

export default Menu