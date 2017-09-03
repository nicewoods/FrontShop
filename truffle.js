// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id 
    },
    "net6272": {
      host: 'localhost',
      port: 8545,
      network_id: '6272' // Match any network id
    }
  }
}
