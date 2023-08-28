const axios = require('axios')

const apiController = {}

// get data from input api
async function getApiData(): Promise<any> {
  const dataRetrieve = await axios.get('')
  console.log(dataRetrieve[0])

//
}

module.exports = apiController