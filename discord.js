function authorize() {
  window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code&scope=email%20identify';
}

function handleCallback() {
  const code = new URLSearchParams(window.location.search).get('code');

  fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: '1173551794073387038',
      client_secret: 'secrets.CLIENT_SECRET',
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'REDIRECT_URI',
      scope: 'identify'
    })
  })
  .then(response => response.json())
  .then(data => {
    const accessToken = data.access_token;

    fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(userData => {
      console.log(userData);
    })
    .catch(error => {
      console.error('Error retrieving user data:', error);
    });
  })
  .catch(error => {
    console.error('Error exchanging authorization code:', error);
  });
}

window.onload = () => {
  if (window.location.search.includes('code=')) {
    handleCallback();
  }
};
