<template>
  <div class="body_loading">
    <div class="container">
      <div>
        <b-card class="bcard">
          <h6 class="title noselect">FeathersJS</h6>
          <h6 class="title noselect">Testing</h6>
          <h2 class="subtitle noselect">Version 1.0.0</h2>

          <b-form @submit.prevent="loginSocket" id="login_form">
            <input
              id="emp_id"
              class="username noselect"
              placeholder="Email"
              autocomplete="off"
              v-model="user.email"
            />

            <b-input-group-append class="mb-1">
              <input
                id="login_password"
                class="password noselect"
                placeholder="Password"
                ref="password"
                type="password"
                v-model="user.password"
              />
              <span class="field-icon"> </span>
            </b-input-group-append>
            <b-btn pill id="btn_login" class="login" block type="submit"
              >LOGIN</b-btn
            >
          </b-form>

          <h2 class="subtitle noselect" style="margin-top: 30px;">
            &copy;2020 BIOTECH FARMS INCORPORATED
          </h2>
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
      user: { email: 'test@gmail.com', password: 'qwe' },
    }
  },
  async created() {
    localStorage.clear()
  },
  methods: {
    async login(evt) {
      try {
        evt.preventDefault()
        const res = await axios({
          method: 'POST',
          url: `${this.$axios.defaults.baseURL}/authentication`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            strategy: 'local',
            email: this.user.email,
            password: this.user.password,
          },
        })

        if (res.status == 201) {
          // success
          this.showMessage('Successful login!', 'primary', 'Success..')

          const data = res.data

          localStorage.token = data.accessToken
          localStorage.user = JSON.stringify(data.user)

          await this.delay(2000) // delay 2 sec; then redirect
          this.$router.push('/users')
        } else {
          // error
          this.showMessage(
            'Error on logging in, please try again!',
            'danger',
            'Error..'
          )
        }
      } catch (e) {
        console.log('Error: ', e)
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
    async loginSocket(evt) {
      try {
        evt.preventDefault()

        const info = {
          strategy: 'local',
          email: this.user.email,
          password: this.user.password,
        }
        // get auth function in store
        const res = await this.$store.dispatch('Authenticate/authUser', {
          info,
        })

        if (res) {
          await localStorage.clear() // clear localStorage

          const user = {
            email: this.user.email,
            password: this.user.password,
          }
          const users = JSON.stringify(user)
          localStorage.user = await this.encrypt(users)

          this.showMessage('Successful login!', 'primary', 'Success..')

          await this.delay(2000) // delay 2 sec; then redirect
          this.$router.push('/users')
        } else {
          // error
          this.showMessage(
            'Error on logging in, please try again!',
            'danger',
            'Error..'
          )
        }
      } catch (e) {
        console.log('Error on login: ', e)
      }
    },
    async encrypt(text) {
      const res = await this.$store.dispatch('Crypting/encrypt', text)
      return res
    },
    async decrypt(text) {
      const res = await this.$store.dispatch('Crypting/decrypt', text)
      return res
    },
  },
  computed: {},
}
</script>
