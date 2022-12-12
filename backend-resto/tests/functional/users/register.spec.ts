import { test } from '@japa/runner'

test('Users register', async ({ client }) => {
  const response = await client.post('/api/users/register')
    .form({
      email: "test-francel.webdev@gmail.com",
      password: "0123456789",
      nom: "test-francel",
      prenom: "test-francel",
      numero_de_telephone: "+22996619073",
      imei_du_telephone: "0123456",
      indicatif_telephonique: "+229",
      role_id: 3
    })

  response.assertStatus(200)
})
