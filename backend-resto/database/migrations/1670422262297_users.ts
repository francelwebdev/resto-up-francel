import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('email')
      table.string('code_otp')
      table.string('code_otp_expire_at')
      table.string('password')
      table.string('nom')
      table.string('prenom')
      table.string('numero_de_telephone')
      table.string('imei_du_telephone')
      table.string('indicatif_telephonique')
      table.integer('role_id').references('id').inTable('roles')
      table.boolean('is_verified').defaultTo(false)


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
