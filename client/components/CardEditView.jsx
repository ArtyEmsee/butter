import React from 'react'

const cardEdit = (props) => {
  return (
    <form class="col-sm-12">
      <div class="row">
        <img src="./CreditCard_325x132.png" class="img-responsive col-sm-4"/>
        <ul class="col-sm-8">
          <div class="topFormItem" >
            <input type="text" class="creditInputForm col-md-4" placeholder="Card Name"></input>
            <span class="col-md-3"> Card Name </span>
          </div>
          <br/>
            <div class="topFormItem">
              <select name="Card Type" class="col-md-4">
                <option value="Visa">Visa</option> 
                <option value="MasterCard" >MasterCard</option>
                <option value="American Express">American Express</option>
                <option value="Discover">Discover</option>
              </select>
              <span class="col-md-3"> Card Type </span>
            </div>
            <br/>
            <div class="topFormItem">
              <input type="text" class="creditInputForm col-md-4" placeholder="Last Four Digits"></input>
              <span class="col-md-3"> Last Four Digits </span>
            </div>
          <br/></ul>
      </div>
      <div class="row">
        <ul class="col-sm-6">
          <div class="bottomFormItem">
            <input type="text" class="creditInputForm col-md-4" placeholder="Spend This Month"></input>
            <span class="col-md-3"> Spend This Month </span>
          </div>
          <br/>
          <div class="bottomFormItem">
            <input type="text" class="creditInputForm col-md-4" placeholder="Spend Total"></input>
            <span class="col-md-3"> Spend Total </span>
          </div>
          <br/>
          <div class="bottomFormItem">
            <input type="text" class="creditInputForm col-md-4" placeholder="Sign-up Bonus"></input>
            <span class="col-md-3"> Sign-up Bonus </span>
          </div>
          <br/>
          <div class="bottomFormItem">
            <input type="text" class="creditInputForm col-md-4" placeholder="Minimum Spend"></input>
            <span class="col-md-3"> Minimum Spend </span>
          </div>
          <br/>
          <div class="bottomFormItem">
            <input id="spendDate" class="creditInputForm col-md-4" placeholder="Spend Deadline"/>
            <span class="col-md-3"> Spend Deadline </span>
          </div> 
          <br/>
          <div class="bottomFormItem">
            <input type="text" class="creditInputForm col-md-4" placeholder="Bonus Currency"></input>
            <span class="col-md-3"> Reward Type </span>
          </div>
          <br/>
          <div class="bottomFormItem">
            <input type="text" class="creditInputForm col-md-4" placeholder="Bill Due Date"></input>
            <span class="col-md-3"> Monthly Bill Due Date </span>
          </div>
          <br/>
        </ul>
        <ul class="col-sm-6">
          <div class="bottomFormItem">
            <input id="appDate" class="creditInputForm col-md-4" placeholder="Application Date"/>
            <span class="col-md-3"> Application Date </span>
          </div>
          <br/>
          <div class="bottomFormItem">
            <input type="text" class="creditInputForm col-md-4" placeholder="Annual Benefit"></input>
            <span class="col-md-3"> Annual Benefit </span>
          </div>
          <br/>
          <div class="bottomFormItem">
            <input type="text" class="creditInputForm col-md-4" placeholder="Annual Fee"></input>
            <span class="col-md-3"> Annual Fee </span>
          </div>
          <br/>
          <div class="bottomFormItem">
            <input type="checkbox"></input>
            <span class="col-md-3"> Annual Fee Waived First Year? </span>
          </div>
          <br/>
           <div class="bottomFormItem">
            <input id="feeDate" class="creditInputForm col-md-4" placeholder="Annual Fee Date"/>
            <span class="col-md-3"> Annual Fee Date </span>
          </div> 
          <br/>
          <div class="bottomFormItem">
            <input id="cancelDate" class="creditInputForm col-md-4" placeholder="Planned Cancellation Date"/>
            <span class="col-md-3"> Planned Cancellation Date </span>
          </div> 
          <br/>
        </ul>
      </div>
    </form>
  )
}


export default cardEdit 