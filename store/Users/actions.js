import * as services from '../../plugins/socket-connect'

export default {
  async fetchUsers({ commit }) {
    // find service
    // const res = await new Promise((resolve) => {
    //   // services.usersService.on('find', (data) => {
    //   //   console.log(data);
    //   //   // commit('setUserList', data)
    //   // })
    //   services.usersService.find()
    // })
    const res = await services.usersService.find()
    console.log(res);
  },
}
