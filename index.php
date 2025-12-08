<!DOCTYPE html>
<html>
<head>
  <title>Study Buddy</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <h1>Study Buddy</h1>
  <div id="auth">
    <h2>Register</h2>
    <input id="regName" placeholder="Name">
    <input id="regEmail" placeholder="Email">
    <input id="regPass" type="password" placeholder="Password">
    <button onclick="register()">Register</button>

    <h2>Login</h2>
    <input id="logEmail" placeholder="Email">
    <input id="logPass" type="password" placeholder="Password">
    <button onclick="login()">Login</button>
  </div>
  <script src="js/app.js"></script>
</body>
</html>