type User = {
    id: number
    email?: string
    username: string
    password?: string
}

type UserToken = {
    context: {
        id: number
        username: string
    }
    iat: number
    exp: number
  }