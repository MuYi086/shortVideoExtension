import axios from 'axios'
import fetchAdapter from '@vespaiach/axios-fetch-adapter'
// const axios = require('axios')
// const fetchAdapter = require('@vespaiach/axios-fetch-adapter')
const service = axios.create({ adapter: fetchAdapter })
// module.exports = service
export { service }