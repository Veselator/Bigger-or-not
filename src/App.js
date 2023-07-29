import React from "react"
import Panel from "./components/panel"
import Menu from "./components/starting-menu"
import EndMenu from "./components/end-menu"
import NextButton from "./components/next-button"

import names from "./names.json"
import * as images from "./theImages"
import data from "./data.json"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      targetRegions: [],
      score: 0,
      isGameEnded: false,
      wrapperState: [0, 0],
      isValuesVisible: false
    }

    this.addScore = this.addScore.bind(this)
    this.endGame = this.endGame.bind(this)
    this.changeRegions = this.changeRegions.bind(this)

    this.setNewWrapperStates = this.setNewWrapperStates.bind(this)
    this.resetWrapperStates = this.resetWrapperStates.bind(this)

    this.changeValuesVisible = this.changeValuesVisible.bind(this)
  }

  componentDidMount() {
    this.changeRegions()
  }

  changeValuesVisible() {
    this.setState({ isValuesVisible: !this.state.isValuesVisible })
  }

  changeRegions() {
    this.changeValuesVisible()
    this.resetWrapperStates()
    var newRegions = this.getRandomRegions()
    this.setState({ targetRegions: newRegions })
  }

  isCorrectlyOptionChoosed = (selectedOption, anotherOption) => {
    return selectedOption.value > anotherOption.value
  }

  endGame() {
    this.setState({ isGameEnded: true })
  }

  getRandomNum = (maxValue) => {
    return Math.floor(Math.random() * maxValue)
  }

  getRandomRegions = () => {
    var targetData = data.info.concat()
    var Regions = []
    for (var i = 0; i < 2; i++) {
      var randomRegionId = this.getRandomNum(targetData.length)

      Regions.push(targetData[randomRegionId])
      targetData.splice(randomRegionId, 1)
    }

    return Regions
  }

  getOptionIndex = (someId) => {
    return this.state.targetRegions[0].id === someId ? 0 : 1
  }

  setNewWrapperStates(correctlyIndex) {
    var newWrapperStates = [0, 0]
    newWrapperStates[correctlyIndex] = 2
    newWrapperStates[1 - correctlyIndex] = 1

    this.setState({ wrapperState: newWrapperStates })
  }

  resetWrapperStates() {
    this.setState({ wrapperState: [0, 0] })
  }

  onOptionChoosed = (someId) => {
    var targetRegionId = this.getOptionIndex(someId)
    var selectedRegion = this.state.targetRegions[targetRegionId]
    var anotherRegion = this.state.targetRegions[1 - targetRegionId]

    this.changeValuesVisible()
    if (!this.isCorrectlyOptionChoosed(selectedRegion, anotherRegion)) {
      this.endGame()
      return
    }

    this.addScore()
    this.setNewWrapperStates(targetRegionId)
    //this.changeRegions()
  }

  render() {
    return (<div className="background">
      <div className="main-content">
        <b className="counter">{this.state.score}$</b>
        <Menu />
        {this.state.targetRegions.map((el) => (
          <Panel onClickFunction={this.onOptionChoosed}
            regionName={names[el.code]}
            regionValue={el.value}
            regionImage={images[el.code]}
            id={el.id}
            key={el.id}
            panelState={this.state.wrapperState[this.getOptionIndex(el.id)]}
            isValuesVisible={this.state.isValuesVisible} />
        ))}
        <NextButton callbackFunction={this.changeRegions} wrapperState={this.state.wrapperState} />
        <EndMenu isGameEnded={this.state.isGameEnded} score={this.state.score} />
      </div>
    </div>)
  }

  addScore() {
    this.setState({ score: this.state.score + 5 })
  }
}

export default App