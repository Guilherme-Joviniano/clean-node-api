import { SignUpController } from './signup'

describe('test the signup controller', () => {
  test('it should return 400 if no name is provided', async () => {
    // sut = System under test
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name (string)'))
  })

  test('it should return 400 if no email is provided', async () => {
    // sut = System under test
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        // email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email (string)'))
  })
})
