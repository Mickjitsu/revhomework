document.addEventListener('DOMContentLoaded', () =>{
    const proceed = document.getElementById('proceed');
    proceed.addEventListener('click', () => {
        fetch(`${window.location.origin}/create-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            console.log('Token created:', data);
          })
          .catch(error => {
            console.log('Error:', error);
          });
    })
})