export type Role = 'member' | 'leader'

export type User = {
    id: number
    email: string
    username: string
    boat_class? : string
    role: Role
}