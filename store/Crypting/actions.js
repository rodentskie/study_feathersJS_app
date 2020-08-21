import crypto from 'crypto'
export default {
  async decrypt({ commit }, text) {
    const algorithm = process.env.ALGORITHM
    const password = process.env.ENCRYPTION_KEY
    const iv = process.env.IV
    const decipher = crypto.createDecipheriv(algorithm, password, iv)
    const dec = decipher.update(text, 'hex', 'utf8')
    return dec
  },

  async encrypt({ commit }, text) {
    const algorithm = process.env.ALGORITHM
    const password = process.env.ENCRYPTION_KEY
    const iv = process.env.IV

    const cipher = crypto.createCipheriv(algorithm, password, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
  },
}
