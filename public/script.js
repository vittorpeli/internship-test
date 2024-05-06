const keywordInput = document.getElementById('keyword')
const scrapeButton = document.getElementById('scrape-button')
const resultsContainer = document.getElementById('results')

scrapeButton.addEventListener('click', async () => {
  const keyword = keywordInput.value

  // Check if keyword is empty and alert user if do
  if (!keyword) {
    alert('Please enter a search term')
    return
  }

  // Clear any previous results before fetching new ones
  resultsContainer.innerHTML = ''

  try {
    // Fetch data from the API using AJAX
    const response = await fetch(`/api/scrape?keyword=${keyword}`)
    const data = await response.json()

    // Check for errors returned by the API
    if (data.error) {
      alert('Error: ' + data.error)
      return
    }

    const products = data.products

    // Loop through each product in the list
    products.forEach((product) => {
      // Create a new DOM element to represent the product
      const productElement = document.createElement('div')
      productElement.classList.add('product')

      // Create elements for title, image, rating, and reviews
      const titleElement = document.createElement('h3')
      titleElement.classList.add('product-title')
      titleElement.textContent = product.title

      // Add classes for styling
      const imageElement = document.createElement('img')
      imageElement.classList.add('product-image')
      imageElement.src = product.imageURL

      // Set content for each element
      const ratingElement = document.createElement('p')
      ratingElement.classList.add('product-rating')
      ratingElement.textContent = `Rating: ${product.rating}`

      const reviewsElement = document.createElement('p')
      reviewsElement.classList.add('product-reviews')
      reviewsElement.textContent = `Reviews: ${product.reviews}`

      // Append the elements to the product
      productElement.appendChild(titleElement)
      productElement.appendChild(imageElement)
      productElement.appendChild(ratingElement)
      productElement.appendChild(reviewsElement)

      // Append the products to the results list
      resultsContainer.appendChild(productElement)
    })
  } catch (err) {
    console.error(error)
    alert('An error ocurred during scraping.')
  }
})