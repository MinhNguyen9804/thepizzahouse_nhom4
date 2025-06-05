function addToCart(itemName) {
    alert(`${itemName} đã được thêm vào giỏ hàng!`);
}

function goToHomePage() {
    window.location.href = 'all.html';
}
function goToKhaiviPage() {
    window.location.href = 'Menu_Khaivi.html';
}
function goToPizzaPage() {
    window.location.href = 'Menu_pizza.html';
}
function goToSpaghettiPage() {
    window.location.href = 'Menu_Spaghetti.html';
}
function goToDrinkPage() {
    window.location.href = 'Menu_Drink.html';
}
function handleSearch(event) {
            if (event.key === 'Enter') {
                const query = document.getElementById('searchInput').value.toLowerCase();
                const products = document.querySelectorAll('.menu-item');

                let found = false;

                products.forEach(product => {
                    const title = product.querySelector('h3').textContent.toLowerCase();
                    if (title.includes(query)) {
                        product.style.display = 'block'; // Hiện món ăn đúng
                        found = true;
                    } else {
                        product.style.display = 'none';  // Ẩn món ăn không đúng
                    }
                });

                if (!found) {
                    alert('Không tìm thấy món ăn bạn cần!');
                }

                // Ẩn nút "Xem thêm" luôn nếu có
                const viewMoreBtn = document.querySelector('.view-more');
                if (viewMoreBtn) {
                    viewMoreBtn.style.display = 'none';
                }
            }
        }
let currentIndex = 0; // Biến lưu vị trí đang hiển thị
function showMore() {
    const hiddenProducts = document.querySelectorAll('.hidden-product');
    const productsPerClick = 6; // Số sản phẩm muốn hiển thị mỗi lần bấm

    for (let i = currentIndex; i < currentIndex + productsPerClick && i < hiddenProducts.length; i++) {
        hiddenProducts[i].style.display = 'block'; // Hiện sản phẩm
    }

    currentIndex += productsPerClick; // Cập nhật vị trí đã hiện

    // Nếu đã hiện hết thì ẩn nút "Xem thêm"
    if (currentIndex >= hiddenProducts.length) {
        document.querySelector('.view-more').style.display = 'none';
    }
}



// Hiển thị chi tiết sản phẩm trong modal
function showProductDetail(name, image, description, price) {
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const unitPriceElement = document.getElementById('unitPrice');
    const quantityDisplay = document.getElementById('quantity');
    const totalPriceDisplay = document.getElementById('totalPrice');
    const addToCartButton = document.getElementById('addToCartButton');

    // Lấy giá trị đơn giá từ price
    const unitPrice = parseInt(price.replace(/[^\d]/g, ''), 10);

    // Cập nhật nội dung modal
    modalImage.style.backgroundImage = `url('${image}')`;
    modalTitle.textContent = name;
    modalDescription.textContent = description;
    modalPrice.textContent = `Giá: ${price}`;
    unitPriceElement.textContent = unitPrice;
    quantityDisplay.textContent = 1;
    totalPriceDisplay.textContent = unitPrice.toLocaleString("vi-VN") + " VND";

    // Thêm sự kiện cho nút "Thêm vào giỏ"
    addToCartButton.onclick = () => addToCart(name);

    // Thiết lập số lượng ban đầu
    let quantity = 1;

    // Xử lý tăng/giảm số lượng
    document.getElementById("increase-btn").onclick = () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        updateTotal(unitPrice, quantity);
    };

    document.getElementById("decrease-btn").onclick = () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            updateTotal(unitPrice, quantity);
        }
    };

    // Hiển thị modal
    modal.style.display = 'flex';
}

// Hàm cập nhật tổng giá
function updateTotal(unitPrice, quantity) {
    const totalPriceDisplay = document.getElementById('totalPrice');
    const total = unitPrice * quantity;
    totalPriceDisplay.textContent = total.toLocaleString("vi-VN") + " VND";
}

// Đóng modal
function closeProductDetail() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
}

// Đóng modal khi nhấn ra ngoài
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Tab functionality
const tabs = document.querySelectorAll('.menu-tabs button');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});
function reattachEventListeners() {
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) modalClose.onclick = closeProductDetail;

    const decreaseBtn = document.getElementById('decrease-btn');
    if (decreaseBtn) {
        decreaseBtn.onclick = function() {
            const quantityDisplay = document.getElementById('quantity');
            let quantity = parseInt(quantityDisplay.textContent);
            const unitPrice = parseInt(document.getElementById('unitPrice').textContent);
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
                updateTotal(unitPrice, quantity);
            }
        };
    }

    const increaseBtn = document.getElementById('increase-btn');
    if (increaseBtn) {
        increaseBtn.onclick = function() {
            const quantityDisplay = document.getElementById('quantity');
            let quantity = parseInt(quantityDisplay.textContent);
            const unitPrice = parseInt(document.getElementById('unitPrice').textContent);
            quantity++;
            quantityDisplay.textContent = quantity;
            updateTotal(unitPrice, quantity);
        };
    }

    const addToCartBtn = document.getElementById('addToCartButton');
    if (addToCartBtn) addToCartBtn.onclick = () => addToCart(document.getElementById('modalTitle').textContent);
}
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
