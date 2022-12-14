import { test } from '@japa/runner'

test('Restaurateurs show', async ({ client }) => {
  const response = await client.get('/api/restaurateurs/4')

  response.assertStatus(200)
})
