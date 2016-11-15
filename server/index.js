#! /usr/bin/env node
require('dotenv').config({silent: true})

const express = require('express')
const Path = require('path')
const session = require('express-session')
const routes = require('./routes/route')
const webpack = require('webpack')
const config = require('../webpack.config.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const bodyParser = require('body-parser')
const util = require('util')
const OperationHelper = require('apac').OperationHelper

var opHelper = new OperationHelper({
  awsId:     process.env.AWSID,
  awsSecret: process.env.AWSECRET,
  assocId:   process.env.AWASSOCIATEID
})

opHelper.execute('ItemSearch', {
  'SearchIndex': 'All',
  'Keywords': 'Amazon gift cards',
  'ResponseGroup': 'ItemAttributes,Images'
}, function(error, results) {
  if (error) { console.log('Error: ' + error + '\n') }
  // console.log('Results HEYYY:\n' + util.inspect(results) + '\n')
  console.log('RESULTS ARE!~!~!~!', util.inspect(results.ItemSearchResponse.Items.Item))
  // util.inspect(results.ItemSearchResponse.Items.Item[0].ItemAttributes.ListPrice.FormattedPrice
})

// Static assets (html, etc.)
//
const assetFolder = Path.resolve(__dirname, '../public')
routes.use(express.static(assetFolder))
if (process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route

  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function (req, res) {
    res.sendFile(assetFolder + '/index.html')
  })

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  const app = express()

  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
  // Parse incoming request bodies as JSON
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(session({
    secret: process.env.SUPERSECRET,
    resave: true,
    saveUninitialized: true
  }))
  require('./config/passport')(app)
  app.use((req,res,next) => {
    console.log(req.user)
    return next()
  })
  // Mount our main router
  app.use('/', routes)

  // Start the server!
  const port = process.env.PORT || 4000
  app.listen(port)
  console.log('Listening on port', port)
}
else {
  // We're in test mode; make this file importable instead.
  module.exports = routes
}
