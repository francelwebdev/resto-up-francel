import { test } from '@japa/runner'

test('Users logout', async ({ client }) => {
  const response = await client.get('/api/users/logout')

  response.assertStatus(200)
})
