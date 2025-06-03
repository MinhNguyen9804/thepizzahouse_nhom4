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