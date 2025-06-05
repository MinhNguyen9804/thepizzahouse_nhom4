// Hiệu ứng fade-in khi cuộn
const contactItems = document.querySelectorAll('.contact-form .form-group, .contact-info');
function checkScroll() {
    contactItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight * 0.8) {
            item.classList.add('fade-in');
        }
    });
}
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Kiểm tra định dạng email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Kiểm tra định dạng số điện thoại (10 chữ số, bắt đầu bằng 0)
function validatePhone(phone) {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
}

// Hàm kiểm tra và cập nhật lỗi theo thời gian thực
function checkInputValidity() {
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');

    // Kiểm tra email
    if (!validateEmail(email)) {
        emailError.textContent = 'Vui lòng nhập email đúng định dạng (ví dụ: example@domain.com).';
    } else {
        emailError.textContent = '';
    }

    // Kiểm tra số điện thoại
    if (!validatePhone(phone)) {
        phoneError.textContent = 'Vui lòng nhập số điện thoại đúng định dạng (10 chữ số, bắt đầu bằng 0).';
    } else {
        phoneError.textContent = '';
    }
}

// Gắn sự kiện oninput cho email và phone
document.getElementById('email').addEventListener('input', checkInputValidity);
document.getElementById('phone').addEventListener('input', checkInputValidity);

// Xử lý form
function submitForm(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');

    // Kiểm tra email
    if (!validateEmail(email)) {
        emailError.textContent = 'Vui lòng nhập email đúng định dạng (ví dụ: example@domain.com).';
        return;
    }

    // Kiểm tra số điện thoại
    if (!validatePhone(phone)) {
        phoneError.textContent = 'Vui lòng nhập số điện thoại đúng định dạng (10 chữ số, bắt đầu bằng 0).';
        return;
    }

    // Nếu hợp lệ, sử dụng alert như trước
    alert('Cảm ơn bạn! Thông tin đã được gửi thành công.');
    document.getElementById('contactForm').reset();
}
$(document).ready(function () {
    $.get("../components/Us_header.html", function (headerHtml) {
        $('#header-placeholder').replaceWith(headerHtml);

        // Sau khi chèn header, thực hiện các logic liên quan đến header
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            const usernameDisplay = document.getElementById('username-display');
            if (usernameDisplay) usernameDisplay.textContent = loggedInUser;
        } else {
            const dropdown = document.querySelector('#logout-dropdown');
            if (dropdown) dropdown.style.display = 'none';
        }

        // Toggle dropdown khi click vào biểu tượng tài khoản
        const accountLink = document.getElementById('account-link');
        const dropdown = document.querySelector('.dropdown-content');
        if (accountLink && loggedInUser) {
            accountLink.addEventListener('click', (event) => {
                event.preventDefault();
                dropdown.classList.toggle('show-dropdown');
            });

            // Ẩn dropdown khi click ra ngoài
            document.addEventListener('click', (event) => {
                if (!accountLink.contains(event.target) && !dropdown.contains(event.target)) {
                    dropdown.classList.remove('show-dropdown');
                }
            });
        }
    }).fail(function () {
        console.error("Failed to load ./components/Us_header.html");
    });
});