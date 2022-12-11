import { DateTime } from 'luxon'
import {
  BaseModel, column, manyToMany,
  ManyToMany,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
  beforeSave
} from '@ioc:Adonis/Lucid/Orm'
import Role from 'App/Models/Role'
import Restaurant from 'App/Models/Restaurant'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public code_otp: number

  @column({ serializeAs: null })
  public password: string

  @column()
  public nom: string

  @column()
  public prenom: string

  @column()
  public numero_de_telephone: string

  @column()
  public imei_du_telephone: string

  @column()
  public indicatif_telephonique: string

  @column()
  public is_verified: boolean

  @column()
  public roleId: number

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @hasOne(() => Restaurant, { foreignKey: 'proprietaire_id' })
  public restaurant: HasOne<typeof Restaurant>

  // @manyToMany(() => Role)
  // public roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
