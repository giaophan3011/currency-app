import React, { useState, useEffect } from 'react';
import currencyService from './services/currencies'
import Header from './components/Header'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'

function App() {
  const [currencies, setCurrencies] = useState([])
  const [inputCurrency, setInputCurrency] = useState(null)
  const [outputCurrency, setOutputCurrency] = useState(null)
  const [result, setResult] = useState(null)
  const [inputValue, setInputValue] = useState(null)
  const [outputValue, setOutputValue] = useState(null)


  useEffect(() => {
    currencyService.getCurrencies()
      .then(response => setCurrencies(response))
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault()
    const convertResult = await  currencyService.convert(inputCurrency, outputCurrency, inputValue)
    console.log('convertResult', convertResult)
    setOutputValue(convertResult)
    setResult(`${inputValue} ${inputCurrency} equals ${convertResult} ${outputCurrency}`)
  }

  return (
    <div className="App">
    <Header/>
    {result ? <div>{result}</div> : ''}
    <form onSubmit={handleSubmit}>
      <Select
        value={inputCurrency}
        onChange={event => setInputCurrency(event.target.value)}
        input={<Input id="input-currency" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {currencies.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
      </Select>
      <Select
        value={outputCurrency}
        onChange={event => setOutputCurrency(event.target.value)}
        input={<Input id="output-currency" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {currencies.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
      </Select>
      <br/>
      <input value={inputValue} onChange={event => setInputValue(event.target.value)}/>
      <span>{outputValue}</span>
      <br/>
      <button type='submit'>Result</button>
    </form>
    </div>
  )
}

export default App;
