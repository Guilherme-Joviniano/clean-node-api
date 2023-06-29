import { type Crypter } from './bcrypt.protocol'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Crypter {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)
    return hashedValue
  }
}
