const axios = require('axios');
const { JSDOM } = require('jsdom')

const baseUrl = 'https://www.amazon.com'

async function scrape(keyword) {
  try {
    const url = `${baseUrl}/s?k=${keyword}`
  
    // Get the HTML from the URL
    const response = await axios.get(url, {
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        Host: 'www.amazon.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:88.0) Gecko/20100101 Firefox/88.0',
        Pragma: 'no-cache',
        TE: 'Trailers',
        'Upgrade-Insecure-Requests': 1,
      },
    })

    const { data } = response
    const dom = new JSDOM(data)
    const document = dom.window.document

    const products = []
    const productElements = document.querySelectorAll('.s-card-container')

    productElements.forEach((productElement) => {
      const titleElement = productElement.querySelector('.s-title-instructions-style h2 a span')
      const title = titleElement ? titleElement.textContent.trim() : 'N/A'

      const ratingElement = productElement.querySelector('span.a-icon-alt')
      const rating = ratingElement ? ratingElement.textContent.replace(' out of 5 stars', '') : 'N/A'

      const reviewsElement = productElement.querySelector('span.a-size-base')
      const reviews = reviewsElement ? reviewsElement.textContent : 'N/A'

      const imageElement = productElement.querySelector('.s-image')
      const imageURL = imageElement ? imageElement.getAttribute('src') : 'N/A'

      products.push({
        title,
        rating,
        reviews,
        imageURL,
      })
    })

    return products
  } catch (err) {
    console.error('Error fetching Amazon search results:', err)
    return []
  }
}

module.exports = scrape