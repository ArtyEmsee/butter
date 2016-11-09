require(TEST_HELPER)

const request = require('supertest-as-promised')
const routes = require(__server + '/index.js')
const db = require(__server + '/config/db.js')
const app = TestHelper.createApp()

app.use('/', routes)
app.testReady()

before('truncate db tables', function(){
  db.deleteEverything()
})
let userId
let cardIdOne
let cardIdTwo
describe('Stores a User', function () {

  it_('stores a user and responds',function * () {
    const user = {firstName: "Darion", lastName: "Freeman", email: "lel@test.com"}
    try {
      //sets response constant
      const response = yield request(app)
      .post('/api/user')
      .send(user)
      .expect(201)
      //the user id should be in the resonse body
      userId = response.body.id
      expect(userId).to.be.a("number")
    } catch(err) {

      throw new Error(err)

    }
  })
})
describe('save card', function () {
  it_('stores a card and responds with the ID', function * () {
    const card = { name: 'Mariott Rewards',
                    cardType: 'Visa',
                    user_id: userId,
                    balance: 1000,
                    expiration: "2018-12-12",
                    applicationDate: "2016-3-4",
                    spendDeadline: '2016-12-12',
                    monthlyBilldate: 22,
                    expCancelDate: '2017-12-12',
                    rewardsAmt: 500,
                    last4digits: 1211,
                    spendTotal: 5000,
                    annBenefit: 300,
                    annFeeAmt: 50,
                    waivedFees: true,
                    creditLine: 1500,
                    signupBonus: 100,
                    minSpend: 3000 }
    try {
      const response = yield request(app)
      .post('/api/cards')
      .send(card)
      const cardId = response.body
      cardIdOne = cardId
      expect(cardId).to.be.a('number')
    } catch(err) {
      throw new Error(err)
    }
  })
  it_('stores a second card and responds with the ID', function * () {
  const card = { name: 'Double Cash',
                  cardType: 'Visa',
                  user_id: userId,
                  balance: 1000,
                  expiration: "2018-12-12",
                  applicationDate: "2016-3-4",
                  spendDeadline: '2016-12-12',
                  monthlyBilldate: 22,
                  expCancelDate: '2017-12-12',
                  rewardsAmt: 500,
                  last4digits: 1211,
                  spendTotal: 5000,
                  annBenefit: 300,
                  annFeeAmt: 50,
                  waivedFees: true,
                  creditLine: 1500,
                  signupBonus: 100,
                  minSpend: 3000 }
    try {
      const response = yield request(app)
      .post('/api/cards')
      .send(card)
      const cardId = response.body
      cardIdTwo = cardId
      expect(cardId).to.be.a('number')
    } catch(err) {
      throw new Error(err)
    }
  })
})

describe('getAllCards', function () {
  it_('should return all cards in the database', function * () {
    try {
      const response = yield request(app)
      .get('/api/users/1/cards')
      .expect(200)
      const cards = response.body
      expect(cards).to.be.an('array')
    } catch(err) {
     throw new Error(err)
    }
  })
})

describe('getOneCard', function () {
  it_('should return the card name from the database', function * () {
    try {
      const response = yield request(app)
      .get(`/api/cards/${cardIdOne}`)
      .expect(200)
      const card = response.body
      expect(card).to.be.an('object')
      expect(card.name).to.equal('Mariott Rewards')
      expect(card.id).to.equal(cardIdOne)
    } catch(err) {
      throw new Error(err)
    }
  })
})

describe('updateCard', function () {
  it_('should return the updated card info', function * () {
    const card = { name: 'Mariott Rewards' , expCancelDate: '2018-12-12' }
    yield request(app)
    .put(`/api/cards/${cardIdOne}`)
    .send(card)
    .expect(200)
    .expect(function (response) {
      expect(response.body).to.be.an('object')
      expect(response.body.name).to.equal('Mariott Rewards')
      expect(response.body.id).to.equal(cardIdOne)
    })
  })
})

describe('removeCard', function () {
  it_('should delete a card from the database', function * () {
    yield request(app)
    .delete(`/api/cards/${cardIdOne}`)
    .expect(200)
    .expect(function (response) {
      expect(response.body).to.be.a('number')
    })
  })
  it_('should delete a card from the database', function * () {
    yield request(app)
    .delete(`/api/cards/${cardIdTwo}`)
    .expect(200)
    .expect(function (response) {
      expect(response.body).to.be.a('number')
    })
  })
})

// describe('getDefaults', function () {
//   it_('should return all default cards', function * () {
//     yield request(app)
//     .get('/api/defaults')
//     .expect(200)
//     .expect(function (response) {
//       expect(response.body).to.be.an('array')
//     })
//   })
// })
