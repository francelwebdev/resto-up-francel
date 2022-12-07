import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run
    await Role.createMany([
      {
        name: 'Administrateur',
        description: 'Administrateur',
      },
      {
        name: 'Responsable achat fournisseur',
        description: 'Responsable achat fournisseur',
      },
      {
        name: 'Livreur',
        description: 'Livreur',
      },
      {
        name: 'Responsable stock',
        description: 'Responsable stock',
      },
      {
        name: 'Responsable revendeur',
        description: 'Responsable revendeur',
      },
      {
        name: 'Restaurateur',
        description: 'Restaurateur',
      },
    ])
  }
}
