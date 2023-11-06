$(document).ready(function() {
  // Define your authentication token
  var authToken = 'Ma0by1nMhgzkoGPL2enBBObsBkrIajmSt3uvXD2F';

  // Fetch product data from the API
  $.ajax({
    url: 'https://api.printify.com/v1/products',
    method: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer ' + authToken
    },
    success: function(response) {
      if (response.success) {
        // Loop through the products and display them
        response.products.forEach(function(product) {
          var productHtml = '<div class="product">';
          productHtml += '<h3>' + product.title + '</h3>';
          productHtml += '<p>Price: $' + product.price + '</p>';
          productHtml += '<button class="add-to-cart" data-product-id="' + product.id + '">Add to Cart</button>';
          productHtml += '</div>';
          $('#product-list').append(productHtml);
        });

        // Add event listener for the "Add to Cart" buttons
        $('.add-to-cart').click(function() {
          var productId = $(this).data('product-id');
          addToCart(productId);
        });
      } else {
        console.error('Error fetching products: ' + response.error);
      }
    },
    error: function(xhr, status, error) {
      console.error('AJAX request failed: ' + error);
    }
  });

  // Function to handle adding a product to the cart
  function addToCart(productId) {
    // Implement the logic to add the product to the cart using the Printify API
    // You'll need to make another AJAX request to the appropriate endpoint, passing the productId
    // Handle the response and update the cart status accordingly
    // You can display the cart status in the header or a separate section on the page
  }
});
