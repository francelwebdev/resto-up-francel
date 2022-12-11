import { test } from '@japa/runner'

test('Users registerRestaurateur', async ({ client }) => {
  const response = await client.post('/api/users/register-restaurateur')
    .form({
      numero_de_telephone: ,
      imei_du_telephone: ,
      indicatif_telephonique: ,
      role_id:
    })

  response.assertStatus(200)
})
