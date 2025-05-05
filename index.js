function addToCart(itemName) {
    alert(`${itemName} đã được thêm vào giỏ hàng!`);
}

function addToCart(itemName) {
    alert(`${itemName} đã được thêm vào giỏ hàng!`);
}

// Banner slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("banner-slide");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        dots[i].classList.remove("active");
    }

    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");

    setTimeout(showSlides, 3000); // Chuyển slide sau 15 giây
}

function currentSlide(n) {
    slideIndex = n;
    let slides = document.getElementsByClassName("banner-slide");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        dots[i].classList.remove("active");
    }

    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");
}
//đánh giá khách hànghàng
function scrollReviews(direction) {
const container = document.getElementById("reviewsContainer");
const scrollAmount = container.offsetWidth * 0.5; // cuộn nửa chiều rộng (2 card)
container.scrollBy({
left: direction * scrollAmount,
behavior: 'smooth'
});
}  
 // Search function
       function handleSearch(event) {
        if (event.key === 'Enter') {
            const query = document.getElementById('searchInput').value.toLowerCase();
            alert('Chuyển hướng đến trang tìm kiếm với từ khóa: ' + query);
            window.location.href = 'Menu/all.html?search=' + query;
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
      
      document.addEventListener("DOMContentLoaded", showTestimonials);
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