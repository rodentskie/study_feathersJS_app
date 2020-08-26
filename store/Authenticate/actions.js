import * as services from '../../plugins/socket-connect'

export default {
  async authUser({ commit }, { info }) {
    const res = await new Promise((resolve) => {
      services.socket.emit(
        'create',
        'authentication',
        {
          strategy: process.env.strategy,
          email: info.email,
          password: info.password,
        },
        function (error, authResult) {
          if (error) resolve(error) // return if error
          resolve(authResult)
        }
      )
    })

    return res;
  },
}
