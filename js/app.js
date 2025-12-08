function register() {
  fetch("api/auth_register.php", {
    method: "POST",
    body: JSON.stringify({
      name: document.getElementById("regName").value,
      email: document.getElementById("regEmail").value,
      password: document.getElementById("regPass").value
    })
  }).then(r=>r.json()).then(d=>alert(d.message||d.error));
}

function login() {
  fetch("api/auth_login.php", {
    method: "POST",
    body: JSON.stringify({
      email: document.getElementById("logEmail").value,
      password: document.getElementById("logPass").value
    })
  }).then(r=>r.json()).then(d=>{
    if(d.userId){
      localStorage.setItem("userId",d.userId);
      window.location="dashboard.php";
    } else alert(d.error);
  });
}

function logout(){
  localStorage.clear();
  window.location="index.php";
}