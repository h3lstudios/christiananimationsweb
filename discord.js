const express = require('express');
const app = express();
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const clientId = '1173551794073387038';
const clientSecret = 'secrets.CLIENT_SECRET';
const redirectUri = 'https://castudios.h3l.fun/auth';
const scopes = 'identify email';

app.get('/auth', (req, res) => {
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopes)}`;
  res.redirect(discordAuthUrl);
});

app.get('/auth/callback', (req, res) => {
  const code = req.query.code;
  console.log('Authorization code:', code);

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    scope: scopes
  });

  fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
  .then(response => response.json())
  .then(data => {
    const accessToken = data.access_token;
    console.log('Access Token:', accessToken);

    // Use the access token for further API requests
    // ...

    res.send('Authentication successful!');
  })
  .catch(error => {
    console.error('Error exchanging authorization code:', error);
    res.status(500).send('Error exchanging authorization code');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
