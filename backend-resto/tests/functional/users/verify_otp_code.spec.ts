import { test } from '@japa/runner'

test('Users verifyOtpCode', async ({ client }) => {
  const response = await client.post('/api/users/verify-otp-code')
    .form({
      code_otp: "1234",
    })

  response.assertStatus(200)
})
