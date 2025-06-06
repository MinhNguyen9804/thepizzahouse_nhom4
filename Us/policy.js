
// Search function
function handleSearch(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('searchInput').value.toLowerCase();
        alert('Chuyển hướng đến trang thực đơn để tìm kiếm món ăn ');
        window.location.href = '../Menu/all.html?search=' + query;
    }
}
function showTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach((card, index) => {
        card.style.display = (index === currentIndex || index === currentIndex + 1) ? 'block' : 'none';
    });
}

function changeTestimonial(direction) {
    const cards = document.querySelectorAll('.testimonial-card');
    const total = cards.length;

    currentIndex += direction * 2;

    if (currentIndex < 0) currentIndex = total - 2;
    if (currentIndex >= total) currentIndex = 0;

    showTestimonials();
}

// Fade-in effect when scrolling
document.addEventListener("DOMContentLoaded", () => {
    const fadeItems = document.querySelectorAll('.fade-item');

    function checkFadeIn() {
        fadeItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.85) {
                item.classList.add("fade-in");
            }
        });
    }

    window.addEventListener("scroll", checkFadeIn);
    checkFadeIn(); // initial load
});


// Hàm kiểm tra và hiển thị trạng thái đăng nhập
    function updateAccountStatus() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userName = document.getElementById("userName");
    const accountMenu = document.getElementById("accountMenu");

    if (currentUser) {
            // Đã đăng nhập
            const hoten = currentUser.hoten; // Sử dụng hoten
    userName.textContent = hoten || "Người dùng"; // Hiển thị hoten, nếu không có thì dùng mặc định
    userName.style.display = "inline"; // Hiển thị tên
    accountMenu.innerHTML = `
    <li><a href="#" id="logoutLink">Đăng xuất</a></li>
    `;
        } else {
        // Chưa đăng nhập
        userName.textContent = "";
    userName.style.display = "none";
    accountMenu.innerHTML = `
    <li><a href="../Account/login.html">Đăng nhập</a></li>
    <li><a href="../Account/register.html">Đăng ký</a></li>
    `;
        }
    }

    // Gọi hàm khi trang tải
    document.addEventListener("DOMContentLoaded", updateAccountStatus);

    // Xử lý đăng xuất
    document.addEventListener("click", (e) => {
        if (e.target.id === "logoutLink") {
        e.preventDefault();
    localStorage.removeItem("currentUser"); // Chỉ xóa trạng thái đăng nhập hiện tại
    localStorage.removeItem("remember");
    updateAccountStatus();
    alert("Đăng xuất thành công!");
        }
    });