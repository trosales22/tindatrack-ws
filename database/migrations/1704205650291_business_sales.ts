import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BusinessSalesSchema extends BaseSchema {
  protected tableName = 'business_sales'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').notNullable().unique().index()
      table.uuid('business_id').notNullable().index()
      table.string('refno').nullable().index()
      table.uuid('product_id').notNullable().index()
      table.decimal('cost_price', 10, 2).notNullable().defaultTo(0.0).index()
      table.integer('quantity').notNullable().defaultTo(0).index()
      table.decimal('total_amount', 10, 2).notNullable().defaultTo(0.0).index()
      table.string('customer_name').nullable().index()
      table.string('remarks').nullable()
      table.dateTime('created_at', { useTz: true }).notNullable()
      table.dateTime('updated_at', { useTz: true }).nullable()
      table.index(['created_at', 'updated_at'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
