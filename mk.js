   let loginAttempts = 0;
   let users = [];
// Đọc file users.txt khi trang được tải
   fetch("file:///C:/Users/Admin/Downloads/userlogin.txt")

    .then(res => res.text())
    .then(data => {
    users = data.split("\n").map(line => {
        const [user, pass] = line.trim().split("|");
        return { username: user.toUpperCase(), password: pass };
    });
  });

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
    const match = users.find(user => user.username === inputUsername && user.password === inputPassword);

    if (match) {
      // Điều hướng tùy theo tài khoản
      if (inputUsername === "DUY PHÁT") {
        window.location.href = "https://youtube.com";
      } else if (inputUsername === "NGOC") {
        window.location.href = "https://example.com";
      } else {
        window.location.href = "https://minami";
      }
    } else {
      loginAttempts++;
      if (loginAttempts >= 3) {
        message.textContent = "Cấm vĩnh viễn";
        document.getElementById("username").disabled = true;
        document.getElementById("password").disabled = true;
        event.target.querySelector("button").disabled = true;
      } else {
        message.textContent = "Sai rồi! Bạn còn " + (3 - loginAttempts) + " lần.";
      }
    }
  }




    