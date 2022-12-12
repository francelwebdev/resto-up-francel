import { test } from '@japa/runner'

test('Users login', async ({ client }) => {
  const response = await client.post('/api/users/login')
    .form({
      email: 'test-francel.webdev@gmail.com',
      password: '0123456789'
    })

  response.assertStatus(200)
})
