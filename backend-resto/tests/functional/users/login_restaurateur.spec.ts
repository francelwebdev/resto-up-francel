import { test } from '@japa/runner'

test('Users loginRestaurateur', async ({ client }) => {
  const response = await client.post('/api/users/login-restaurateur')
    .form({
      numero_de_telephone: '+22996619073',
    })

  response.assertStatus(200)
})
