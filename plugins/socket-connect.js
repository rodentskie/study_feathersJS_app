import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

export const socket = io('http://localhost:44')

export const app = feathers().configure(socketio(socket))

// repeat this line for every service in our backend
export const usersService = app.service('users')
export const ordersService = app.service('orders')
