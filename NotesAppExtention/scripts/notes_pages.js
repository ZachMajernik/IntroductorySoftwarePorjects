const currentUserText = document.getElementById("current_user_text");
const logoutButton = document.getElementById("logout_button");

let currentUser = ""
window.addEventListener("load", () => {
  if (localStorage.getItem("currentUser")) {
    currentUser = localStorage.getItem("currentUser");
  }
  console.log(currentUser);
  currentUserText.innerHTML = `<h3>Current User: ${currentUser}</h3>`
});


logoutButton.addEventListener("click", () => {
    window.location.replace('login.html')
});