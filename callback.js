app.get('/callback', (req, res) => {
    // Callback route logic
    res.send('Callback route');
  });

try {
    await logtoClient.handleSignInCallback(window.location.href);
    console.log(await logtoClient.isAuthenticated()); // true
  } catch {
    // Handle error
  }