import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FeedbacksSchema extends BaseSchema {
  protected tableName = 'feedbacks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').notNullable().unique().index()
      table.string('name').notNullable().index()
      table.string('email').notNullable().index()
      table.string('message').notNullable()
      table.dateTime('created_at', { useTz: true }).notNullable()
      table.dateTime('updated_at', { useTz: true }).nullable()
      table.index(['created_at', 'updated_at'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
