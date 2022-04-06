export interface UserCompare {
    compare: (password: string, hashPassword: string) => Promise<boolean>
}