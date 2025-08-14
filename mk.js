
const maxAttempts = 3;
let loginAttempts = parseInt(getCookie("loginAttempts")) || 0;

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

function getCookie(name) {
  const decoded = decodeURIComponent(document.cookie);
  const cookies = decoded.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const c = cookies[i].trim();
    if (c.indexOf(name + "=") === 0) {
      return c.substring(name.length + 1, c.length);
    }
  }
  return "";
}

function openLoginModal() {
  document.getElementById("mdl-login").style.display = "block";
}

function closeLoginModal() {
  document.getElementById("mdl-login").style.display = "none";
}

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("loginMessage");

  // Kiểm tra đã bị cấm
  if (getCookie("banned") === "true") {
    message.textContent = "Cấm vĩnh viễn";
    disableLoginForm();
    return false;
  }

  if (username === "NamLaGaiGenz208" && password === "01122008") {
    // Xóa dữ liệu khi đăng nhập đúng
    document.cookie = "loginAttempts=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "Secret.html";
  } else {
    loginAttempts++;
    setCookie("loginAttempts", loginAttempts, 1);

    if (loginAttempts >= maxAttempts) {
      setCookie("banned", "true", 999999);
      message.textContent = "Cấm vĩnh viễn";
      disableLoginForm();
    } else {
      message.textContent = "Sai rồi! Bạn còn " + (maxAttempts - loginAttempts) + " lần.";
    }
  }
}

function disableLoginForm() {
  document.getElementById("username").disabled = true;
  document.getElementById("password").disabled = true;
  document.querySelector("#mdl-login button[type='submit']").disabled = true;
}

// Khi load trang, nếu đã bị cấm thì disable form
window.onload = function() {
  if (getCookie("banned") === "true") {
    disableLoginForm();
    document.getElementById("loginMessage").textContent = "Cấm vĩnh viễn";
  }
};

