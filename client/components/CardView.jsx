import React from 'react'
import { ProgressBar, Modal, Button, Col, Row, Grid, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Action from '../actions/actions'
import Sidebar from './Sidebar'
import CardEdit from "./CardEditView"

class CardView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
  }  
  collectForm(e,el) {
    e.preventDefault()
    const domForm = el.elements
    const submitItem = Object.keys(domForm).slice(18)
    .reduce((acc,id) =>{
      if(id != 'submit' && domForm[id].value != "") acc[id] = domForm[id].value
      return acc
    },{})

    submitItem.id = this.props.card.id
    this.props.addCard(submitItem)
  }
  edit(){
    this.setState({edit: true})
  }
  closeEdit(){
    this.setState({edit: false})
    this.props.close()
  }
  cancel(){
    this.setState({edit: false})
  }
  componentDidMount() {
  }

  FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    )
  }

  render() {
    let cardCompView = (<div></div>)
    if(this.props.card) cardCompView = (      
      <Grid>
        <Row>
        <Row>
          <Col md={12}>
            <h3>{this.props.card.name}</h3>
          </Col>
          <Col md={1}>
            {this.props.card.balance}/{this.props.card.minSpend}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            Sign Up bonus:{this.props.card.signupBonus}
          </Col>
          <Col md={6}>
            Deadline:{this.props.card.spendDeadline}
          </Col>
        </Row> 
        <Row>
          <Col md={8}>
            {this.props.card.cardType}/{this.props.card.category}
          </Col>
          <Col md={4}>
            {this.props.card.program}
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            Points:{this.props.card.rewardsAmt}
          </Col>
          <Col md={4}>
            Application Date:{this.props.card.applicationDate}
          </Col>
          <Col md={4}>
            Cancel Date:{this.props.card.expCancelDate}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            Expiration:{this.props.card.expiration}
          </Col>
        </Row>
        <Col md={12}>
        <Modal.Footer>
          <Col md={6} className="left-button">
          <Button onClick={this.edit.bind(this)}>
            edit
          </Button>
          </Col>
          <Col md={6} className="right-button">
          <Button onClick={this.closeEdit.bind(this)}>
           close
           </Button>
           </Col>
         </Modal.Footer>
         </Col>
         </Row>
      </Grid>
    )
    if(this.state.edit) cardCompView = (<CardEdit addCard={this.collectForm.bind(this)} FieldGroup={this.FieldGroup} card={this.props.card} cancel={this.cancel.bind(this)} />)
    return (
      <Modal show={this.props.show} onHide={this.closeEdit.bind(this)}>
        {cardCompView}
      </Modal>
    )   
  }
}
function mapStateToProps(store){
  return {
    //object w/ one card data
    card: store.cardStates.card,
    //object w/ default cards data
    defaults: store.cardStates.defaults
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addCard: Action.addCard,
    deleteCard: Action.deleteCard,
    viewCard: Action.viewCard,
    updateCard: Action.updateCard
  }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(CardView)