import * as services from '../../plugins/socket-connect'

export default {
  async fetchUsers({ commit }) {
    // find service
    const res = await services.usersService.find()
    return res
  },
}
