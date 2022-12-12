import { test } from '@japa/runner'

test('Users registerRestaurateur', async ({ client }) => {
  const response = await client.post('/api/users/register-restaurateur')
    .form({
      numero_de_telephone: "+22996619073",
      imei_du_telephone: "0123456789",
      indicatif_telephonique: "+229",
      role_id: 6
    })

  response.assertStatus(200)
})
