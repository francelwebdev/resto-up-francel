import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'restaurants'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('raison_social').unique()
      table.string('siret').unique()
      table.string('adresse')
      table.string('nom_gerant')
      table.string('prenom_gerant')
      table.string('email_de_contact')
      table.string('piece_identite_gerant')
      table.integer('proprietaire_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
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
