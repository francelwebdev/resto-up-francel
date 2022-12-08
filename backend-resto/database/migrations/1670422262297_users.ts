import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('email').notNullable()
      table.integer('code_otp')
      table.string('password').notNullable()
      table.string('nom').notNullable()
      table.string('prenom').notNullable()
      table.string('numero_de_telephone').notNullable()
      table.string('imei_du_telephone').notNullable()
      table.string('indicatif_telephonique').notNullable()
      table.integer('role_id').references('id').inTable('roles')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
