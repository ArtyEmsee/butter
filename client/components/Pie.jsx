import React from 'react'
import * as d3 from 'd3'
import Slice from './Slice'
// const scale = require('d3-scale')
// const layout = require('d3-shape')
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Action from '../actions/actions'

class Pie extends React.Component {
  constructor (props) {
    super(props)
    this.colorScale = d3.schemeCategory10
    this.renderSlice = this.renderSlice.bind(this)
  }

  componentDidMount(){
    this.props.getPieData()
    .then(res => {console.log(this.props.pieData)})
  }


  translate (x, y) {
    return `translate(${x}, ${y})`
  }

  render (data) {
    let { x, y } = this.props
    // let data = this.mapPieData()
    let pie = d3.pie()
    return (
      <g transform = { this.translate(x, y) }>
        { pie(data).map(this.renderSlice) }
      </g>
    )
  }

  renderSlice (value, i) {
    let { innerRadius, outerRadius, cornerRadius, padAngle } = this.props
    return (
      <Slice key={i}
            innerRadius = { innerRadius }
            outerRadius = { outerRadius }
            cornerRadius = { cornerRadius }
            padAngle = { padAngle }
            value = { value[1] }
            label = { value[0] }
            fill = { this.colorScale[i] } />
    )
  }
}

function mapStateToProps(store){
  return {
    //object w/ all user cards data
    cards: store.cardStates.cards,
    pieData: store.cardStates.pieData

  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    viewAllCards: Action.viewAllCards,
    getPieData: Action.getPieData
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Pie)