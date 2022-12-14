import { test } from '@japa/runner'
import { join } from 'path'
import User from 'App/Models/User'

test('Restaurateurs completeRegistration', async ({ client }) => {
  const restaurateur = await User
    .query()
    .where('role_id', 6)
    .firstOrFail()

  const response = await client.post(`/api/restaurateurs/${restaurateur.id}/complete-registration`)
    .loginAs(restaurateur)
    .fields({
      raison_social: 'test-resto-up',
      siret: '0123456789',
      adresse: 'test-cotonou',
      nom_gerant: 'test-francel',
      prenom_gerant: 'test-francel',
      email_de_contact: 'test-francel.webdev@gmail.com',
      // piece_identite_gerant: 'test-piece_identite_gerant.png'
    })
    .file('piece_identite_gerant', join(__dirname, 'test-piece_identite_gerant.jpeg'))

  response.assertStatus(200)
})
