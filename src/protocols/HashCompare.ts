export interface HashCompare {
    compare: (password: string, hashedPassword: string) => Promise<boolean>
}