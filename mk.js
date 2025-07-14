    let loginAttempts = 0;

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

      if (username === "MF" && password === "1234") {
        window.location.href = "https://minami";
        return false;
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
        return false;
      }
    }
    
