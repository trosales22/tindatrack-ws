import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BusinessInvestmentsSchema extends BaseSchema {
  protected tableName = 'business_investments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').notNullable().unique().index()
      table.uuid('business_id').notNullable().index()
      table.string('type').notNullable().index()
      table.decimal('amount', 10, 2).notNullable().defaultTo(0.0)
      table.string('source').nullable().index
      table.string('description').nullable()
      table.dateTime('created_at', { useTz: true }).notNullable()
      table.dateTime('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
