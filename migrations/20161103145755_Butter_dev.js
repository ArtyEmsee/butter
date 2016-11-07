
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Users', function(table){
      table.increments('id').primary()
      table.string('firstName', 20).notNullable()
      table.string('lastName', 20).notNullable()
      table.string('email', 40)
      table.unique('email')
      table.integer('creditScore').nullable()
    }),

    knex.schema.createTable('Cards', function(table){
      table.increments('id').primary()
      table.string('name', 80)
      table.integer('user_id')
      table.foreign('user_id').references('Users.id')
      table.integer('cardType')
      table.integer('category_id')
      table.foreign('category_id').references('Categories.id')
      table.integer('balance')
      table.date('expiration')
      table.date('applicationDate')
      table.date('spendDeadline')
      table.date('monthlyBilldate')
      table.date('annFeeDate')
      table.date('expCancelDate')
      table.integer('rewardsAmt')
      table.integer('last4digits')
      table.integer('spendTotal')
      table.integer('annBenefit')
      table.integer('annFeeAmt')
      table.integer('waivedFees')
      table.integer('creditLine')
      table.integer('signupBonus')
      table.integer('minSpend')
    }),

    knex.schema.createTable('Categories', function(table){
      table.increments('id')
      table.string('category', 30).notNullable()
      table.string('program', 30)
    }),

    knex.schema.createTable('DefaultCards', function(table){
      table.increments('id').primary()
      table.string('name', 80)
      table.integer('cardType')
      table.integer('category_id')
      table.foreign('category_id').references('Categories.id')
      table.integer('annBenefit')
      table.integer('annFeeAmt')
      table.integer('waivedFees')
      table.integer('signupBonus')
      table.integer('minSpend')

    })

  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('Users'),
    knex.schema.dropTableIfExists('Cards'),
    knex.schema.dropTableIfExists('Categories')
  ])
}
