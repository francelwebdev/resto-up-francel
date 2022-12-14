import { test } from '@japa/runner'

test('Restaurateurs index', async ({ client }) => {
  const response = await client.get('/api/restaurateurs')

  response.assertStatus(200)
})
