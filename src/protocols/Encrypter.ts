export interface Enctrypter {
    encrypt: (id: string) => Promise<string>
}