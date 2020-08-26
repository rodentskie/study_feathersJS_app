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
      items: [],
    }
  },
  async created() {
    this.toLogin()

    // set time out; .5 sec
    setTimeout(async () => {
      await this.retrieveUsers()
    }, 500)
  },
  computed: {
    // ...mapGetters({
    //   listUsers: 'Users/getUserList',
    // }),
  },
  async mounted() {},
  methods: {
    async retrieveUsers() {
      try {
        const res = await this.$store.dispatch('Users/fetchUsers')
        const data = res.data
        for (let i = 0; i < data.length; i++) {
          const e = data[i]

          this.items.push({
            id: e.id,
            age: e.age,
            email: e.email,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
          })
        }
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
