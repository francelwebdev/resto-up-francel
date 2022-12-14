import { test } from '@japa/runner'
import User from 'App/Models/User'

test('Users validateRestaurateur', async ({ client }) => {
  const admin = await User
    .query()
    .where('role_id', 1)
    .firstOrFail()

  const restaurateur = await User
    .query()
    .where('role_id', 6)
    .firstOrFail()

  const response = await client.get(`/api/restaurateurs/${restaurateur.id}/validate`).loginAs(admin)

  response.assertStatus(200)
})
