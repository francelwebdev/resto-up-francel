import { test } from '@japa/runner'

test('Users validateUser', async ({ client }) => {
  const response = await client.get('/api/users/1/validate')

  response.assertStatus(200)
})
