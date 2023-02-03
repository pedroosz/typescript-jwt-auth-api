
## User Authentication API
#### Technologies
- TypeScript
- Prisma
- JWT
- BCrypt
- Express

#### Getting started
##### Dependencies
You can install all dependencies by using `npm install` or `yarn`, you will also need [tsx]("https://www.npmjs.com/package/tsx") in order to run the without using [ts-node]("https://www.npmjs.com/package/ts-node") and [ts-node-dev]("https://www.npmjs.com/package/ts-node-dev"), unlike ts-node and ts-node-dev, tsx is powered by [esbuild]("https://esbuild.github.io/"), making it really fast.

##### Setting up tsx
In order to install [tsx]("https://www.npmjs.com/package/tsx") globally, run: 
`npm install tsx --global` or `yarn global add tsx`
then after installing  tsx *(and setting up prisma)*  you can simply run:
`npm run dev` or `yarn dev`

But if you don't want install it, you can run by using: 
`npx tsx watch ./src/index.ts`
this way it will run and automatically restart when a file changes.

##### Setting up our JWT secret
This secret should be a long random string in that will be used to encryt and decrypt our data. To generate one we can use the node library called `crypto`.
Run node on your terminal by simply using:
`node`
You should see something similar to this:
```
Welcome to Node.js v16.17.1.
Type ".help" for more information.
>
```

Now insert
`require('crypto').randomBytes(64).toString('hex')`
and hit enter.
it should result on something similar to this:
```
> require('crypto').randomBytes(64).toString('hex')
'461a4ba8e54ba021c25588d547844deeea8efa5ac8482228675fa8d4ba6bff1979d6266666172a28acf3b6eafa3c54826dcbfbbcae958908ceff34872dc8603c'
```
Copy this string and paste into `TOKEN_SECRET` inside the `.env` *(rename the .env.example to .env)*.

##### Setting up Prisma
In order to init our Prisma Client we can run the following command:
`npx prisma init --datasource-provider sqlite`
after it, we need to run a migration in order to create our tables
`npx prisma migrate dev --name init`
and there you go, now you can crank it up!

#### Endpoints
- `GET` `/users/@me` - Get your information (Protected)
- `GET` `/users/:id` - Get a specific user information  (Protected)
- `POST` `/auth/login` - Used to generate a JWT token
- `POST` `/auth/register` - Used to create a new user

#### Response examples

### GET /users/@me (Protected)
##### Expected response
> **(Status code 200)**
```json
{
  "id": 1,
  "email": "dummy@example.com",
  "created_at": "2023-02-02T15:40:06.891Z",
  "username": "Dummy"
}
```

### GET /users/:id (Protected)
##### Expected response
> **(Status code 200)**
```json
{
  "id": 1,
  "created_at": "2023-02-02T15:40:06.891Z",
  "username": "Dummy"
}
```

### POST - /auth/login
##### Expected body
```json
{
    "email": "dummy@example.com",
    "password": "youshallnotpass"
}
```

##### Expected response
> **(Status code 200)**
```json
{
    "username": "Dummy",
    "email": "dummy@example.com",
    "token": "eyJhbGciOiJIU..."
}
```

##### Possible responses
> **(Status code 401)**
```json
{
    "message": "Wrong password."
}
```

> **(Status code 500)**
```json
{
    "message": "Unable to sign a JWT",
    "error": {}
}
```

### POST - /auth/register
##### Expected body
```json
{
    "username": "Dummy",
    "email": "dummy@example.com",
    "password": "youshallnotpass"
}
```

##### Expected response
> **(Status code 200)**
```json
{
    "username": "Dummy",
    "token": "eyJhbGciOiJIU..."
}
```

##### Possible responses
> **(Status code 500)**
```json
{
    "message": "Unable to sign a JWT",
    "error": {}
}
```
