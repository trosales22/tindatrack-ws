import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import GeneralConstants from 'App/Constants/GeneralConstants'

export default class BusinessProductsSchema extends BaseSchema {
  protected tableName = 'business_products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').notNullable().unique().index()
      table.uuid('business_id').notNullable().index()
      table.string('name').notNullable().index()
      table.string('category').notNullable().index()
      table.decimal('unit_price', 10, 2).notNullable().defaultTo(0.0).index()
      table.decimal('cost_price', 10, 2).notNullable().defaultTo(0.0).index()
      table.string('status').nullable().defaultTo(GeneralConstants.GENERAL_STATUS_TYPES.ACTIVE).index()
      table.dateTime('created_at', { useTz: true }).notNullable()
      table.dateTime('updated_at', { useTz: true }).nullable()
      table.index(['created_at', 'updated_at'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
