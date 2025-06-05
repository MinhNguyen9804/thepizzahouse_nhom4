

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