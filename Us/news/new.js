// Hiệu ứng hover cho news-item
const newsItems = document.querySelectorAll('.news-item');
newsItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.05)';
        item.querySelector('h3').style.color = '#fbc02d';
    });
    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1)';
        item.querySelector('h3').style.color = '#fff';
    });
});
$(document).ready(function () {
    $.get("../../components/news_header.html", function (headerHtml) {
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
        console.error("Failed to load ../../components/Us_header.html");
    });
});