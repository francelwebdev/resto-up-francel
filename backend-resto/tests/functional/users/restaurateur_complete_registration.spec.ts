import { test } from '@japa/runner'

test('Users registerRestaurateur', async ({ client }) => {
  const response = await client.post('/api/users/register-restaurateur')
    .form({
      raison_social: 'test-resto-up',
      siret: 0123456789,
      adresse: 'test-cotonou',
      nom_gerant: 'test-francel',
      prenom_gerant: 'test-francel',
      email_de_contact: 'test-francel.webdev@gmail.com',
      piece_identite_gerant: 'test-piece_identite_gerant.png'
    })

  response.assertStatus(200)
})
