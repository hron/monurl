const axios = require('axios')

const urls = ['https://tutlbalkjsdf.by', 'https://google.com', 'https://nasa.gov']

const main = () => {
  console.log("Checking for monitors to run...")
  urls.forEach(checkSite)
  setTimeout(main, 10)
}

const checkSite = async (url) => {
  try {
    await axios.get(url)
    console.log(`Fetched ${url}!`)
  } catch (e) {
    console.log(`Can't fetch ${url}`)
  }
}

main()
