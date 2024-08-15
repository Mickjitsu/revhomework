import RevolutCheckout from './esm/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const proceed = document.getElementById('proceed');
    const paymentModal = document.getElementById('payment-modal');
    const paymentModalDiv = document.getElementById('payment-div');
    const payButton = document.getElementById('pay-button');
    let orderToken;
    
    proceed.addEventListener('click', () => {
      fetch(`/create-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        console.log('Token created:', data); 
        orderToken = data.token
        console.log(orderToken)
        paymentModal.classList.remove('hidden');
        payButton.classList.remove('hidden');
        paymentModalDiv.classList.remove('hidden');

        RevolutCheckout(orderToken, "sandbox").then(function (instance) {
    
          
          payButton.addEventListener("click", function () {
            instance.payWithPopup({
              email: "example.customer@example.com",
              onSuccess() {
               
                window.alert("Thank you!")
              },
              onError(error) {
          
                window.alert(`Something went wrong. ${error}`)
              }
            })
          })
    })
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });

    
     });
  