import React from 'react'
import * as Bs from 'react-bootstrap'

const cardEditView = ({ defaults, props, card, addCard, FieldGroup, cancel }) => {
  let form = {}
  return (
    <Bs.Grid>
      <Bs.Row>
      <Bs.Col md={12}>
        <Bs.Modal.Header>
          <Bs.Modal.Title>Edit {card.name}</Bs.Modal.Title>
        </Bs.Modal.Header>
      </Bs.Col>
      </Bs.Row>
      <Bs.Row>
        <form onSubmit={(e) => addCard(e,form)} id="credit-card-form" ref={(el)=> form = el}>
        <Bs.Row>
          <Bs.Col md={5}>
            <FieldGroup 
              id='name'
              type='text'
              label='Card Name'
              placeholder='Insert Card Name'
              defaultValue={card.name}
            />
          </Bs.Col>
          <Bs.Col md={4}>
            <Bs.FormGroup controlId="cardType">
              <Bs.ControlLabel>Card Type</Bs.ControlLabel>
              <Bs.FormControl componentClass="select" placeholder="select">
                <option value="MasterCard">MasterCard</option>
                <option value="Visa">Visa</option>
                <option value="American Express">American Express</option>
                <option value="Discover">Discover</option>
              </Bs.FormControl>
            </Bs.FormGroup>
          </Bs.Col>
          <Bs.Col md={3}>
            <FieldGroup 
              id='Category'
              type='text'
              label='Last 4 Digits'
              placeholder='XXXX'
              defaultValue={card.last4digits || ''}
            />
          </Bs.Col>
        </Bs.Row>
        <Bs.Row>
          <Bs.Col md={5}>
            <Bs.FormGroup controlId="cardType">
              <Bs.ControlLabel>Reward Category</Bs.ControlLabel>
              <Bs.FormControl componentClass="select" placeholder="select">
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
              defaultValue={card.program || ''}
            />
          </Bs.Col>
          <Bs.Col md={3}>
            <FieldGroup 
              id='rewardsAmt'
              type='number'
              label='Rewards Amount'
              placeholder='XXXX.XX'
              defaultValue={card.rewardsAmt || ''}
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
              defaultValue={card.expiration || ''}
            />
          </Bs.Col>
          <Bs.Col md={6}>
            <FieldGroup 
              id='monthlyBilldate'
              type='date'
              label='Monthly Bill Date'
              placeholder='XX/XX/XXXX'
              defaultValue={card.monthlyBilldate || ''}
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
              defaultValue={card.applicationDate || ''}
            />
          </Bs.Col>
          <Bs.Col md={6}>
            <FieldGroup 
              id='expCancelDate'
              type='date'
              label='Expected Cancel Date'
              placeholder='XX/XX/XXXX'
              defaultValue={card.expCancelDate || ''}
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
              defaultValue={card.signupBonus || ''}
            />
          </Bs.Col>
          <Bs.Col md={6}>
            <FieldGroup 
              id='spendTotal'
              type='number'
              label='Spent so far'
              placeholder='XXXX.XX'
              defaultValue={card.spendTotal || ''}
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
              defaultValue={card.minSpend || ''}
            />
          </Bs.Col>
          <Bs.Col md={6}>
            <FieldGroup 
              id='spendDeadline'
              type='date'
              label='Spend Deadline'
              placeholder='XX/XX/XXXX'
              defaultValue={card.spendDeadline || ''}
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
              defaultValue={card.annFeeAmt || ''}
            />
          </Bs.Col>
          <Bs.Col md={5}>
            <FieldGroup 
              id='annFeeDate'
              type='date'
              label='Annual Fee Date'
              placeholder='XX/XX/XXXX'
              defaultValue={card.annFeeDate || ''}
            />
          </Bs.Col>
          <Bs.Col md={3}>
            <Bs.FormGroup>
              <Bs.Checkbox>Annual Fee Waived?</Bs.Checkbox>
            </Bs.FormGroup>
          </Bs.Col>
        </Bs.Row>
        <Bs.Row>
        <Bs.Modal.Footer>
          <Bs.Col md={12}>
            <Bs.Col md={6} className="left-button">
            <Bs.Button onClick={cancel}>
              Cancel
            </Bs.Button>
            </Bs.Col>
            <Bs.Col md={6} className="right-button">
            <Bs.Button type="submit">
              Submit
            </Bs.Button>
            </Bs.Col>
          </Bs.Col>
        </Bs.Modal.Footer>
        </Bs.Row>
        </form>
      </Bs.Row>
    </Bs.Grid>
  )
}


export default cardEditView