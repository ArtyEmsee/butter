import React from 'react'
import * as Bs from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Action from '../actions/actions'
import Autosuggest from 'react-autosuggest'

class DetailedNewCard extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      value: '',
      suggestions: [],
      newCard: {},
      cardType: '',
      category: ''
    }
  }

  componentDidMount(){
    this.props.getDefaults()
    .then(res => 
      this.setState({
        suggestions: this.props.defaults
      })
    )
  }

  createCard(e,el){
    e.preventDefault()
    const domForm = el.elements
    const name = domForm[0].value
    const submitItem = Object.keys(domForm).slice(17)
    .reduce((acc,id) =>{
      if(id != 'submit' && domForm[id].value != "") acc[id] = domForm[id].value
      return acc
    },{})
    submitItem.name = name
    this.props.addCard(submitItem)
    this.props.onHide()
  }

  onChange(event, { newValue, method }){
    this.setState({ value: newValue })
  }
  
  onSuggestionsFetchRequested({ value }){
    this.setState({ suggestions: this.getSuggestions(value) })
  }

  onSuggestionsClearRequested(){
    this.setState({ suggestions: []})
  }

  getSuggestions(value) {
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (escapedValue === '') return []
    const regex = new RegExp('\\b' + escapedValue, 'i')
    return this.props.defaults.filter(defaultCard => regex.test(this.getSuggestionValue(defaultCard)))
  }

  getSuggestionValue(suggestion) { 
    this.setState({newCard: suggestion, cardType:suggestion.cardType, category:suggestion.category})
    return `${suggestion.name}` 
  }
  typeChange(event) {
    this.setState({cardType: event.target.value})
  }
  catChange(event) {
    this.setState({category: event.target.value})
  }
  renderSuggestion(suggestion) {
    return (
      <div className="suggestion">
        <img src={suggestion.cardImg} />
        <div className="name"> {suggestion.name} </div>
      </div>
    )
  }
  render(){
    const FieldGroup = ({ id, label, help, ...props }) => {
      return (
        <Bs.FormGroup controlId={id}>
          <Bs.ControlLabel>{label}</Bs.ControlLabel>
          <Bs.FormControl {...props} />
          {help && <Bs.HelpBlock>{help}</Bs.HelpBlock>}
        </Bs.FormGroup>
      )
    }
    let form
    const { value, suggestions } = this.state
    const inputProps = {
      placeholder: "Add A Card",
      value,
      onChange: this.onChange.bind(this)
    }
    return (
      <Bs.Modal show={this.props.show} onHide={this.props.onHide}>
        <Bs.Grid>
        <Bs.Row>
        <Bs.Modal.Header>
          <Bs.Col md={12}>
            <h3>Create a new Card</h3>
          </Bs.Col>
        </Bs.Modal.Header>
        </Bs.Row>
        <Bs.Row>
        <Bs.Col md={12}>
          <Bs.Modal.Body>
              <Bs.Row>
                <Bs.Col md={12}>
                  <form onSubmit={(e) => this.createCard(e,form)} id="credit-card-form" ref={(el)=> form = el}>
                    <Bs.Row>
                      <Bs.Col md={5}>
                        <Bs.FormGroup controlId="name">
                          <Bs.ControlLabel>Card Name</Bs.ControlLabel>
                          <Autosuggest 
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                            getSuggestionValue={this.getSuggestionValue.bind(this)}
                            renderSuggestion={this.renderSuggestion.bind(this)}
                            inputProps={inputProps} />
                          </Bs.FormGroup>
                      </Bs.Col>
                      <Bs.Col md={4}>
                        <Bs.FormGroup controlId="cardType">
                          <Bs.ControlLabel>Card Type</Bs.ControlLabel>
                          <Bs.FormControl componentClass="select" value={this.state.cardType} onChange={this.typeChange.bind(this)}>
                            <option value="MasterCard">MasterCard</option>
                            <option value="Visa">Visa</option>
                            <option value="American Express">American Express</option>
                            <option value="Discover">Discover</option>
                          </Bs.FormControl>
                        </Bs.FormGroup>
                      </Bs.Col>
                      <Bs.Col md={3}>
                        <FieldGroup 
                          id='last4digits'
                          type='text'
                          label='Last 4 Digits'
                          placeholder='XXXX'
                        />
                      </Bs.Col>
                    </Bs.Row>
                    <Bs.Row>
                      <Bs.Col md={4}>
                        <Bs.FormGroup controlId="category">
                          <Bs.ControlLabel>Reward Category</Bs.ControlLabel>
                          <Bs.FormControl componentClass="select" value={this.state.category} onChange={this.catChange.bind(this)}>
                            <option value="Cash Back">Cash Back</option>
                            <option value="General Points">General Points</option>
                            <option value="Miles">Miles</option>
                            <option value="Hotel">Hotel</option>
                          </Bs.FormControl>
                        </Bs.FormGroup>
                      </Bs.Col>
                      <Bs.Col md={4}>
                        <FieldGroup 
                          id='program'
                          type='text'
                          label='Program'
                          placeholder='Program Title'
                          defaultValue={this.state.newCard.program || ''}
                        />
                      </Bs.Col>
                      <Bs.Col md={4}>
                        <FieldGroup 
                          id='rewardsAmt'
                          type='number'
                          label='Rewards Amount'
                          placeholder='XXXX.XX'                 
                        />
                      </Bs.Col>
                    </Bs.Row> 
                    <Bs.Row>
                      <Bs.Col md={6}>
                        <FieldGroup 
                          id='expiration'
                          type='date'
                          label='Expiration Date'
                          placeholder='XX/XX/XXXX'
                        />
                      </Bs.Col>
                      <Bs.Col md={6}>
                        <FieldGroup 
                          id='monthlyBilldate'
                          type='number'
                          label='Monthly Bill Date'
                          placeholder='XX'
                          />
                      </Bs.Col>
                    </Bs.Row>
                    <Bs.Row>
                      <Bs.Col md={6}>
                        <FieldGroup 
                          id='applicationDate'
                          type='date'
                          label='Application Date'
                          placeholder='XX/XX/XXXX'
                        />
                      </Bs.Col>
                      <Bs.Col md={6}>
                        <FieldGroup 
                          id='expCancelDate'
                          type='date'
                          label='Expected Cancel Date'
                          placeholder='XX/XX/XXXX'
                        />
                      </Bs.Col>
                    </Bs.Row>        
                    <Bs.Row>
                      <Bs.Col md={6}>
                        <FieldGroup 
                          id='signupBonus'
                          type='text'
                          label='Sign Up Bonus'
                          placeholder='Sign up bonus'
                          defaultValue={this.state.newCard.signupBonus || ''}
                          />
                      </Bs.Col>
                      <Bs.Col md={6}>
                        <FieldGroup 
                          id='spendTotal'
                          type='number'
                          label='Spent so far'
                          placeholder='XXXX.XX'
                          />
                      </Bs.Col>                    
                    </Bs.Row>
                    <Bs.Row>
                      <Bs.Col md={6}>
                        <FieldGroup 
                          id='minSpend'
                          type='number'
                          label='Minimum Spend'
                          placeholder='XXXX.XX'
                          defaultValue={this.state.newCard.minSpend || ''}
                          />
                      </Bs.Col>
                      <Bs.Col md={6}>
                        <FieldGroup 
                          id='spendDeadline'
                          type='date'
                          label='Spend Deadline'
                          placeholder='XX/XX/XXXX'
                        />
                      </Bs.Col>
                    </Bs.Row>
                    <Bs.Row>
                      <Bs.Col md={4}>
                        <FieldGroup 
                          id='annFeeAmt'
                          type='number'
                          label='Annual Fee'
                          placeholder='XXXX.XX'
                          defaultValue={this.state.newCard.annFeeAmt || ''}
                          />
                      </Bs.Col>
                      <Bs.Col md={5}>
                        <FieldGroup 
                          id='annFeeDate'
                          type='date'
                          label='Annual Fee Date'
                          placeholder='XX/XX/XXXX'
                        />
                      </Bs.Col>
                      <Bs.Col md={3}>
                        <Bs.FormGroup>
                          <Bs.Checkbox>Annual Fee Waived?</Bs.Checkbox>
                        </Bs.FormGroup>
                      </Bs.Col>
                    </Bs.Row>
                  </form>
                </Bs.Col>
              </Bs.Row>
          </Bs.Modal.Body>
        </Bs.Col>
        </Bs.Row>
        <Bs.Row>
        <Bs.Modal.Footer>
          <Bs.Col md={4}>
          <Bs.Button onClick={(e) => this.createCard(e,form)} > Create Card </Bs.Button>
          </Bs.Col>
          <Bs.Col md={4}>
          <Bs.Button onClick={(e) => this.props.switch(e) } > Less Details </Bs.Button>
          </Bs.Col>
          <Bs.Col md={4}>
          <Bs.Button onClick={this.props.onHide} > Cancel </Bs.Button>
          </Bs.Col>
        </Bs.Modal.Footer>
        </Bs.Row>
        </Bs.Grid>
      </Bs.Modal>
    )
  }
}

function mapStateToProps(store){
  return {
    defaults: store.cardStates.defaults
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    getDefaults: Action.getDefaults,
    addCard: Action.addCard
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DetailedNewCard)
// <Modal show={this.props.show} onHide={this.props.onHide} >
//         <div className='col-lg-12'>
//           <div className="">
//             <div className='row'>
//               <form onSubmit={this.createCard.bind(this)} id="credit-card-form" className="col-sm-12">
//                 <div className="row">
//                   <img src="" className="img-responsive col-sm-4"/>
//                   <ul className="col-sm-8">
//                     <div className="topFormItem" >
//                       <Autosuggest className="col-xs-4" 
//                         suggestions={suggestions}
//                         onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
//                         onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
//                         getSuggestionValue={this.getSuggestionValue.bind(this)}
//                         renderSuggestion={this.renderSuggestion.bind(this)}
//                         inputProps={inputProps} />
//                       <span className="col-md-3"> Card Name </span>
//                     </div>
//                     <br/>
//                       <div className="topFormItem">
//                         <select id="cardType" className="col-md-4">
//                           <option value="Visa">Visa</option> 
//                           <option value="MasterCard" >MasterCard</option>
//                           <option value="American Express">American Express</option>
//                           <option value="Discover">Discover</option>
//                         </select>
//                         <span className="col-md-3"> Card Type </span>
//                       </div>
//                       <br/>
//                       <div className="topFormItem">
//                         <input type="text" id="last4digits" className="creditInputForm col-md-4" placeholder="Last Four Digits"></input>
//                         <span className="col-md-3"> Last Four Digits </span>
//                       </div>
//                     <br/></ul>
//                 </div>
//                 <div className="row">
//                   <ul className="col-sm-6">
//                     <div className="bottomFormItem">
//                       <input type="text" id="spendTotal" className="creditInputForm col-md-4" placeholder="Spend Total"></input>
//                       <span className="col-md-3"> Spend Total </span>
//                     </div>
//                     <br/>
//                     <div className="bottomFormItem">
//                       <input type="text" id="signupBonus" className="creditInputForm col-md-4" placeholder="Sign-up Bonus"></input>
//                       <span className="col-md-3"> Sign-up Bonus </span>
//                     </div>
//                     <br/>
//                     <div className="bottomFormItem">
//                       <input type="text" id="minSpend" className="creditInputForm col-md-4" placeholder="Minimum Spend"></input>
//                       <span className="col-md-3"> Minimum Spend </span>
//                     </div>
//                     <br/>
//                     <div className="bottomFormItem">
//                       <input id="spendDeadline" type="date" className="creditInputForm col-md-4" placeholder="Spend Deadline"/>
//                       <span className="col-md-3"> Spend Deadline </span>
//                     </div> 
//                     <br/>
//                     <div className="bottomFormItem">
//                       <input type="number" id="monthlyBillDate" className="creditInputForm col-md-4" placeholder="Bill Due Date"></input>
//                       <span className="col-md-3"> Monthly Bill Due Date </span>
//                     </div>
//                     <br/>
//                   </ul>
//                   <ul className="col-sm-6">
//                     <div className="bottomFormItem">
//                       <input type="date" id="applicationDate" className="creditInputForm col-md-4" placeholder="Application Date"/>
//                       <span className="col-md-3"> Application Date </span>
//                     </div>
//                     <br/>
//                     <div className="bottomFormItem">
//                       <input type="text" id="benefit" className="creditInputForm col-md-4" placeholder="Annual Benefit"></input>
//                       <span className="col-md-3"> Annual Benefit </span>
//                     </div>
//                     <br/>
//                     <div className="bottomFormItem">
//                       <input type="text" id="annFeeAmt" className="creditInputForm col-md-4" placeholder="Annual Fee"></input>
//                       <span className="col-md-3"> Annual Fee </span>
//                     </div>
//                     <br/>
//                     <div className="bottomFormItem">
//                       <input id="waivedFees" type="checkbox"></input>
//                       <span className="col-md-3"> Annual Fee Waived First Year? </span>
//                     </div>
//                     <br/>
//                      <div className="bottomFormItem">
//                       <input type="date" id="annFeeDate" className="creditInputForm col-md-4" placeholder="Annual Fee Date"/>
//                       <span className="col-md-3"> Annual Fee Date </span>
//                     </div> 
//                     <br/>
//                     <div className="bottomFormItem">
//                       <input type="date" id="expCancelDate" className="creditInputForm col-md-4" placeholder="Planned Cancellation Date"/>
//                       <span className="col-md-3"> Planned Cancellation Date </span>
//                     </div> 
//                     <br/>
//                   </ul>
//                 </div>
//               </form>
//               <ButtonGroup className="buttonGroup">
//                 <Button onClick={this.createCard.bind(this)} > Create Card </Button>
//                 <Button onClick={(e) => this.props.switch(e) } > Less Details </Button>
//                 <Button onClick={this.props.onHide} > Cancel </Button>
//               </ButtonGroup>
//             </div>
//           </div>
//           <div className='progress row'>
//             <div id='progressBar'className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="600" aria-valuemin="0" aria-valuemax="3000">
//             </div>
//           </div>
//         </div>
//       </Modal>