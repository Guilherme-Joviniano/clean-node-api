import { type EmailValidator } from '../presentations/protocols/email-validator.protocol'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
