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

// Xử lý form
function submitForm(event) {
    event.preventDefault();
    alert('Cảm ơn bạn! Thông tin đã được gửi thành công.');
    document.getElementById('contactForm').reset();
}