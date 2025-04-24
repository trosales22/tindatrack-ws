import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BusinessInventoriesSchema extends BaseSchema {
  protected tableName = 'business_inventories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').notNullable().unique().index()
      table.uuid('business_id').notNullable().index()
      table.uuid('product_id').notNullable().index()
      table.integer('stock').notNullable().defaultTo(0).index()
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
