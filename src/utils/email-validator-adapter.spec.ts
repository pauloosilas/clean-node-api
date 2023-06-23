import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}
describe('EmailValidator Adapter', () => {
  test('Shold return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(false)
  })

  test('Shold return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(true)
  })

  test('Shold call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('invalid_email@gmail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('invalid_email@gmail.com')
  })
})
