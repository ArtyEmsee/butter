const bookshelf = require('../config/db')

var Card = bookshelf.Model.extend({
  tablename: 'Cards'
})