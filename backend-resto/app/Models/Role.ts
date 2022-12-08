import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany,
  ManyToMany,
  hasMany,
  HasMany
 } from '@ioc:Adonis/Lucid/Orm'
 import User from 'App/Models/User'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @hasMany(() => User)
  public users: HasMany<typeof User>

  // @manyToMany(() => User)
  // public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
