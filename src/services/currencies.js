import axios from 'axios'
const baseURL = 'https://api.exchangeratesapi.io'

const getCurrencies = async () => {
  const response = await axios.get(`${baseURL}/latest`)
  console.log('getCurrencies', Object.keys(response.data.rates))
  return Object.keys(response.data.rates)
}

const convert = async (inputCurrency, outputCurrency, inputValue ) => {
  const response = await axios.get(`${baseURL}/latest?symbols=${outputCurrency}&&base=${inputCurrency}`)
  return response.data.rates[outputCurrency] * inputValue
}

export default { getCurrencies, convert }