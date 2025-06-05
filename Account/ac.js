document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    console.log("Login Form:", loginForm, "Register Form:", registerForm);

    // Hàm kiểm tra
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        if (!password) return false;
        return password.length >= 8;
    }

    function validateHoten(hoten) {
        if (!hoten) return false;
        return hoten.length >= 2;
    }

    function showError(id, message) {
        const err = document.getElementById(id + "Error");
        if (err) err.textContent = message;
    }

    function clearError(id) {
        const err = document.getElementById(id + "Error");
        if (err) err.textContent = "";
    }

    // ----- Xử lý form đăng ký -----
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("Register form submitted");

            const hotenInput = document.getElementById("hoten");
            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");
            const confirmInput = document.getElementById("confirmPassword");
            const agreeCheckbox = document.getElementById("agreePolicy");

            const hoten = hotenInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const confirm = confirmInput.value.trim();
            const agree = agreeCheckbox.checked;

            let isValid = true;

            if (!hoten) {
                showError("hoten", "Họ tên không được để trống.");
                isValid = false;
            } else if (!validateHoten(hoten)) {
                showError("hoten", "Họ tên phải từ 2 ký tự trở lên.");
                isValid = false;
            }

            if (!email) {
                showError("email", "Email không được để trống.");
                isValid = false;
            } else if (!validateEmail(email)) {
                showError("email", "Email không đúng định dạng.");
                isValid = false;
            }

            if (!password) {
                showError("password", "Mật khẩu không được để trống.");
                isValid = false;
            } else if (!validatePassword(password)) {
                showError("password", "Mật khẩu phải từ 8 ký tự trở lên.");
                isValid = false;
            }

            if (!confirm) {
                showError("confirmPassword", "Vui lòng nhập lại mật khẩu.");
                isValid = false;
            } else if (password !== confirm) {
                showError("confirmPassword", "Mật khẩu nhập lại không khớp.");
                isValid = false;
            }

            if (!agree) {
                alert("Bạn cần đồng ý với chính sách.");
                isValid = false;
            }

            if (!isValid) return;

            const userData = { hoten, email, password }; // Thêm hoten vào userData
            localStorage.setItem("user", JSON.stringify(userData));
            if (agreeCheckbox.checked) {
                localStorage.setItem("remember", "true");
                localStorage.setItem("savedEmail", email);
                localStorage.setItem("savedPassword", password);
            }

            alert("Đăng ký thành công! Đang chuyển sang trang đăng nhập...");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }

    // ----- Xử lý form đăng nhập -----
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("Login form submitted");

            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");
            const rememberCheckbox = document.getElementById("remember");

            if (localStorage.getItem("remember") === "true") {
                emailInput.value = localStorage.getItem("savedEmail") || "";
                passwordInput.value = localStorage.getItem("savedPassword") || "";
                if (emailInput.value && passwordInput.value) {
                    rememberCheckbox.checked = true;
                }
            }

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const storedUser = JSON.parse(localStorage.getItem("user"));
            console.log("Stored User:", storedUser); // Debug

            let isValid = true;

            clearError("email");
            clearError("password");

            if (!email) {
                showError("email", "Email không được để trống.");
                isValid = false;
            } else if (!validateEmail(email)) {
                showError("email", "Email không đúng định dạng.");
                isValid = false;
            }

            if (!password) {
                showError("password", "Mật khẩu không được để trống.");
                isValid = false;
            } else if (!validatePassword(password)) {
                showError("password", "Mật khẩu phải từ 8 ký tự trở lên.");
                isValid = false;
            }

            if (isValid) {
                if (!storedUser) {
                    showError("email", "Tài khoản không tồn tại. Vui lòng đăng ký!");
                    isValid = false;
                } else if (storedUser.email !== email) {
                    showError("email", "Tài khoản không tồn tại. Vui lòng kiểm tra lại email!");
                    isValid = false;
                } else if (storedUser.password !== password) {
                    showError("password", "Mật khẩu không chính xác. Vui lòng thử lại!");
                    isValid = false;
                }
            }

            if (!isValid) return;

            if (rememberCheckbox.checked) {
                localStorage.setItem("remember", "true");
                localStorage.setItem("savedEmail", email);
                localStorage.setItem("savedPassword", password);
            }

            alert("Đăng nhập thành công!");
            setTimeout(() => {
                window.location.href = "index.html"; // Đảm bảo đường dẫn đúng
            }, 1500);
        });
    }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (!password) return false;
    return password.length >= 8;
}

function validateHoten(hoten) {
    if (!hoten) return false;
    return hoten.length >= 2;
}

function showError(id, message) {
    const err = document.getElementById(id + "Error");
    if (err) err.textContent = message;
}

function clearError(id) {
    const err = document.getElementById(id + "Error");
    if (err) err.textContent = "";
}