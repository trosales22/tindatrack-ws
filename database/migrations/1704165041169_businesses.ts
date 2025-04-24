import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import GeneralConstants from 'App/Constants/GeneralConstants'

export default class BusinessesSchema extends BaseSchema {
  protected tableName = 'businesses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').notNullable().unique().index()
      table.uuid('owner_id').notNullable().index()
      table.string('name').notNullable().index()
      table.string('type').notNullable().index()
      table.string('status').nullable().defaultTo(GeneralConstants.GENERAL_STATUS_TYPES.ACTIVE).index()
      table.dateTime('created_at', { useTz: true }).notNullable()
      table.dateTime('updated_at', { useTz: true })
      table.index(['created_at', 'updated_at'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
