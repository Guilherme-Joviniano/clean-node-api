export interface Crypter {
  encrypt: (value: string) => Promise<string>
}
