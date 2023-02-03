import jwt from "jsonwebtoken";

export function createJWT(user: User, callback: (error: Error | null, token: string | null) => void) {
    try {
        jwt.sign({
            context: {
                id: user.id,
                username: user.username
            }
        }, process.env.TOKEN_SECRET as string, {
            expiresIn: process.env.TOKEN_EXPIRE_TIME
        }, (err, token) => {
            if (err) {
                callback(err, null)
            }

            if (token) {
                callback(null, token)
            }

        })
    } catch (error) {
        console.trace(error)
    }
}