import { test } from '@japa/runner'

test('Users registerRestaurateur', async ({ client }) => {
  const response = await client.post('/api/users/register-restaurateur')
    .form({
      raison_social: ,
      siret: ,
      adresse: ,
      nom_gerant: ,
      prenom_gerant: ,
      email_de_contact: ,
      piece_identite_gerant:
    })

  response.assertStatus(200)
})
