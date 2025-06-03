

// Hiệu ứng fade-in khi cuộn
const policyItems = document.querySelectorAll('.policy-section h2, .policy-section p, .policy-section ul li');
function checkScroll() {
    policyItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight * 0.8) {
            item.classList.add('fade-in');
        }
    });
}
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);