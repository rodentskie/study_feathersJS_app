import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import crypto from 'crypto'

export const socket = io('http://localhost:44')

export const app = feathers().configure(socketio(socket))

// repeat this line for every service in our backend
export const usersService = app.service('users')
export const ordersService = app.service('orders')

const decrypt = (text) => {
  const algorithm = process.env.ALGORITHM
  const password = process.env.ENCRYPTION_KEY
  const iv = process.env.IV
  const decipher = crypto.createDecipheriv(algorithm, password, iv)
  const dec = decipher.update(text, 'hex', 'utf8')
  return dec
}

if (localStorage.user) {
  const user = decrypt(localStorage.user)
  const userJson = JSON.parse(user)
  const { email, password } = userJson

  socket.emit(
    'create',
    'authentication',
    {
      strategy: process.env.strategy,
      email: email,
      password: password,
    },
    function (error, authResult) {
      if (error) console.log(error) // return if error
      console.log('reconnecting')
    }
  )
}
