    // Chặn chuột phải
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        alert("🚫 Bạn không thể chọn chuột phải!");
    });

    // Chặn F12, Ctrl+U, Ctrl+Shift+I/J/C/S, Cmd+Opt+I (Mac)
    document.addEventListener("keydown", function (e) {
        if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && ["i", "j", "c", "s"].includes(e.key.toLowerCase())) ||
            (e.ctrlKey && e.key.toLowerCase() === "u") ||
            (e.metaKey && e.altKey && e.key.toLowerCase() === "i") || // Cmd + Opt + I
            (e.metaKey && e.key.toLowerCase() === "u") // Cmd + U
        ) {
            e.preventDefault();
            alert("🚫 Trang web đã được bảo vệ chống DevTools!");
            return false;
            
        }
    });

    // Xóa console methods
    console.log = () => {};
    console.debug = () => {};
    console.warn = () => {};
    console.info = () => {};

    // Phát hiện DevTools bằng thời gian thực thi debugger
    setInterval(() => {
        const before = new Date().getTime();
        debugger;
        const after = new Date().getTime();
        if (after - before > 100) {
            document.body.innerHTML = '<h1 style="text-align:center;margin-top:100px;color:red">🔒 Bạn đang cố mở Developer Tools!</h1>';
        }
    }, 1000);

    (function () {
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function () {
                document.body.innerHTML = '<h1 style="text-align:center;margin-top:100px;color:red">⚠️ Đừng mở console!</h1>';
                throw new Error("Console is blocked");
            }
        });

        setInterval(() => {
            console.log(element);
            console.clear();
        }, 2000);
    })();

    // Ngăn inspect element qua mouse drag
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
    });

    // Ngăn chọn toàn bộ (Ctrl+A)
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
            e.preventDefault();
            alert("🚫 Bạn không thể chọn toàn bộ hay Ctrl A!");
        }
    });
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
            e.preventDefault();
            alert("🚫 Bạn không thể sao chép hay Ctrl C!");
        }
    });
    // Kiểm tra sau khi reload nếu có cờ "devtools_detected"
    if (localStorage.getItem("devtools_detected") === "true") {
        localStorage.removeItem("devtools_detected");
        location.href = "https://minamifukun.github.io/Personal-Pages/canhcao.html";
    }

    // Phát hiện DevTools qua kích thước cửa sổ
    function detectDevToolsSize() {
        if (
            window.outerWidth - window.innerWidth > 160 ||
            window.outerHeight - window.innerHeight > 160
        ) {
            localStorage.setItem("devtools_detected", "true");
            location.reload(); // reload lại trang
        }
    }
    function detectFakeMobile() {
        const isMobileUA = /Mobi|Android|iPhone/i.test(navigator.userAgent);
        const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

        if (isMobileUA && !hasTouch) {
            console.warn("⚠️ Có thể đang giả lập mobile trong DevTools");
            document.body.innerHTML =
            '<h1 style="text-align:center;color:red;margin-top:100px">🔒 Không được giả lập mobile!</h1>';
            localStorage.setItem("devtools_detected", "true");
            setTimeout(() => {
            location.href =
                "https://minamifukun.github.io/Personal-Pages/canhcao.html";
            }, 500);
        }
        }


    window.onresize = detectDevToolsSize;
    window.onload = () => {
    detectDevToolsSize();
    detectFakeMobile();

    // Nếu đã phát hiện devtools trước đó
    if (localStorage.getItem("devtools_detected") === "true") {
        localStorage.removeItem("devtools_detected");
        location.href = "https://minamifukun.github.io/Personal-Pages/canhcao.html";
    }
 };
