import { DateTime } from 'luxon'
import {
  BaseModel, column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Restaurant extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public raison_social: string

  @column()
  public siret: string

  @column()
  public adresse: string

  @column()
  public is_verified: boolean

  @column()
  public nom_gerant: string

  @column()
  public prenom_gerant: string

  @column()
  public email_de_contact: string

  @column()
  public piece_identite_gerant: string | null | undefined

  @column()
  public proprietaire_id: number

  @belongsTo(() => User, { foreignKey: 'proprietaire_id' })
  public proprietaire: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
