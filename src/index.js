const express = require('express')
const scrape = require('./scrape')
const path = require('path')

const app = express()

const PORT = 3333

app.use('/', express.static(path.join(__dirname, '../public')))

app.get('/api/scrape', async (req, res) => {
  const { keyword } = req.query

  if (!keyword) {
    return res.status(404).json({
      error: 'Keyword is missing'
    })
  }

  const products = await scrape(keyword)

  res.status(200).json({
    products,
  })
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))