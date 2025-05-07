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
function showMore() {
    const hiddenProducts = document.querySelectorAll('.hidden-product');
    hiddenProducts.forEach(product => {
        product.style.display = 'block'; // Hiện sản phẩm ẩn
    });
    // Ẩn nút 'Xem thêm' sau khi hiện hết
    document.querySelector('.view-more').style.display = 'none';
}

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

        const viewMoreBtn = document.querySelector('.view-more');
        if (viewMoreBtn) {
            viewMoreBtn.style.display = 'none';
        }
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
