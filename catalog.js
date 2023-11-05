const apiToken = 'Ma0by1nMhgzkoGPL2enBBObsBkrIajmSt3uvXD2F';
const catalogContainer = document.getElementById('catalog-container');

// Fetch the product catalog
fetch('https://api.printful.com/products', {
  headers: {
    Authorization: `Bearer ${apiToken}`,
  },
})
  .then(response => response.json())
  .then(data => {
    // Process and display the products
    const products = data.result;
    const catalogHTML = products.map(product => `
      <div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.retail_price}</p>
      </div>
    `).join('');

    catalogContainer.innerHTML = catalogHTML;
  })
  .catch(error => console.error('Error fetching product catalog:', error));
