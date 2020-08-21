<template>
  <div id="main">
    <div>
      <div>
        <b-card>
          <h6 class="title noselect">Users</h6>
          <b-button variant="success" @click="addUser">Add User</b-button>
          <br />
          <br />
          <div>
            <b-card>
              <b-table
                striped
                hover
                :items="items"
                @row-clicked="makeOrders()"
                :fields="fields"
              ></b-table>
            </b-card>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  layout: 'loginLayout',
  data() {
    return {
      fields: [
        {
          key: 'age',
          label: 'Age',
          sortable: true,
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
        },
        {
          key: 'createdAt',
          label: 'Created At',
          sortable: true,
        },
        {
          key: 'updatedAt',
          label: 'Updated At',
          sortable: true,
        },
      ],
      items: [
        {
          age: 40,
          email: 'test@gmail.com',
          createdAt: '2020-08-15',
          updatedAt: '2020-08-15',
        },
        {
          age: 15,
          email: 'test1@gmail.com',
          createdAt: '2020-08-16',
          updatedAt: '2020-08-16',
        },
        {
          age: 24,
          email: 'test2@gmail.com',
          createdAt: '2020-08-17',
          updatedAt: '2020-08-17',
        },
      ],
    }
  },
  async created() {
    this.toLogin()
    await this.retrieveUsers()
  },
  computed: {
    // ...mapGetters({
    //   listUsers: 'Users/getUserList',
    // }),
  },
  methods: {
    async retrieveUsers() {
      try {
        const res = await this.$store.dispatch('Users/fetchUsers')
        console.log(res);
      } catch (e) {
        console.log('Error fetch users: ', e)
      }
    },
    async addUser() {
      try {
        console.log('lenete')
      } catch (e) {
        console.log('Error add users: ', e)
      }
    },
    async makeOrders() {
      try {
        console.log('tae')
      } catch (e) {
        console.log('Error make orders: ', e)
      }
    },
    showMessage(msg, variant, title) {
      this.$bvToast.toast(`${msg}`, {
        title: title,
        toaster: 'b-toaster-bottom-right',
        solid: true,
        variant: variant,
        appendToast: true,
      })
    },
    async delay(sec) {
      return new Promise((resolve) => setTimeout(resolve, sec))
    },
    toLogin() {
      if (localStorage.length == 0) this.$router.push('/')
    },
  },
}
</script>
