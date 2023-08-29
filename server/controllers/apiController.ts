import axios from 'axios'

// get data from input api
const apiController = {
  getApiData: async (): Promise<any> => {
    const dataRetrieve = await axios.get('')
    console.log(dataRetrieve[0])
  }
}

export default apiController
