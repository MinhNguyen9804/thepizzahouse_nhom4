// Hàm tìm kiếm
function handleSearch(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const products = document.querySelectorAll('.menu-item');
        let found = false;
        products.forEach(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            if (title.includes(query)) {
                product.style.display = 'block';
                found = true;
            } else {
                product.style.display = 'none';
            }
        });
        if (!found) {
            alert('Không tìm thấy món ăn bạn cần!');
        }
    }
}


    // Hàm kiểm tra và hiển thị trạng thái đăng nhập
    function updateAccountStatus() {
        const storedUser = JSON.parse(localStorage.getItem("user"));
    const userName = document.getElementById("userName");
    const accountMenu = document.getElementById("accountMenu");

    if (storedUser && localStorage.getItem("remember") === "true") {
            // Đã đăng nhập
            const hoten = storedUser.hoten; // Sử dụng hoten thay vì email
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
    <li><a href="Account/login.html">Đăng nhập</a></li>
    <li><a href="Account/register.html">Đăng ký</a></li>
            `;
        }
    }

    // Gọi hàm khi trang tải
    document.addEventListener("DOMContentLoaded", updateAccountStatus);

    // Xử lý đăng xuất
    document.addEventListener("click", (e) => {
        if (e.target.id === "logoutLink") {
            e.preventDefault();
            localStorage.removeItem("user");
            localStorage.removeItem("remember");
            localStorage.removeItem("savedEmail");
            localStorage.removeItem("savedPassword");
            updateAccountStatus();
            alert("Đăng xuất thành công!");
        }
    });


// Xử lý đăng xuất
document.addEventListener("click", (e) => {
    if (e.target.id === "logoutLink") {
        e.preventDefault();
        localStorage.removeItem("user");
        localStorage.removeItem("remember");
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
        updateAccountStatus();
        alert("Đăng xuất thành công!");
    }
});

// Khởi tạo trạng thái tài khoản khi tải trang
document.addEventListener("DOMContentLoaded", updateAccountStatus);