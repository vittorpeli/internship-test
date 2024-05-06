const keywordInput = document.getElementById('keyword')
const scrapeButton = document.getElementById('scrape-button')
const resultsContainer = document.getElementById('results')

scrapeButton.addEventListener('click', async () => {
  const keyword = keywordInput.value

  if (!keyword) {
    alert('Please enter a search term')
    return
  }

  resultsContainer.innerHTML = ''

  try {
    const response = await fetch(`/api/scrape?keyword=${keyword}`)
    const data = await response.json()

    if (data.error) {
      alert('Error: ' + data.error)
      return
    }

    const products = data.products

    products.forEach((product) => {
      const productElement = document.createElement('div')
      productElement.classList.add('product')

      const titleElement = document.createElement('h3')
      titleElement.classList.add('product-title')
      titleElement.textContent = product.title

      const imageElement = document.createElement('img')
      imageElement.classList.add('product-image')
      imageElement.src = product.imageURL

      const ratingElement = document.createElement('p')
      ratingElement.classList.add('product-rating')
      ratingElement.textContent = `Rating: ${product.rating}`

      const reviewsElement = document.createElement('p')
      reviewsElement.classList.add('product-reviews')
      reviewsElement.textContent = `Reviews: ${product.reviews}`

      productElement.appendChild(titleElement)
      productElement.appendChild(imageElement)
      productElement.appendChild(ratingElement)
      productElement.appendChild(reviewsElement)

      resultsContainer.appendChild(productElement)
    })
  } catch (err) {
    console.error(error)
    alert('An error ocurred during scraping.')
  }
})