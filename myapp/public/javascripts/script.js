document.addEventListener('DOMContentLoaded', () => {
    const proceed = document.getElementById('proceed');
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
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  });
  