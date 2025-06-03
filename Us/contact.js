

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