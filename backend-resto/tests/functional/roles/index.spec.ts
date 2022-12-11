import { test } from '@japa/runner'

test('Roles index', async ({ client }) => {
  const response = await client.get('/api/roles')

  response.assertStatus(200)
})
