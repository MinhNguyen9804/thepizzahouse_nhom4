

// Khi DOM đã sẵn sàng
$(document).ready(function () {
    // Kiểm tra xem carousel đã được khởi tạo chưa trước khi khởi tạo lại
    if (!$('.achievements .owl-carousel').hasClass('owl-loaded')) {
        $('.achievements .owl-carousel').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>'
            ],
            dots: true,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: { items: 1 },
                768: { items: 3 },
                1000: { items: 3 }
            },
            center: true,
            onInitialized: function (event) {
                var current = this._current;
                if (current >= this.items().length) current = 0;
                this.$element.find('.owl-item').eq(current).addClass('center');
            },
            onTranslated: function (event) {
                this.$element.find('.owl-item').removeClass('center');
                var current = this._current;
                if (current >= this.items().length) current = 0;
                this.$element.find('.owl-item').eq(current).addClass('center');
            }
        });
    }

    // Fade-in and Pop-up Animation
    const fadeItems = document.querySelectorAll('.fade-in, .history-block');
    function checkFade() {
        fadeItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= 0 && rect.top <= windowHeight * 0.8) {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 200);
            }
        });
    }
    window.addEventListener('scroll', checkFade);
    window.addEventListener('load', checkFade);


    /*Scrollytelling*/
    document.addEventListener("DOMContentLoaded", () => {
        const blocks = document.querySelectorAll('.history-block');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target); // Fade 1 lần duy nhất
                }
            });
        }, {
            threshold: 0.3 // Tùy chỉnh tỉ lệ xuất hiện
        });

        blocks.forEach(block => {
            observer.observe(block);
        });
    });


    /* about us*/
    let lastScrollY = window.scrollY;
    let offset = 0;

    const aboutText = document.querySelector(".about-text");
    const pizzaText = document.querySelector(".pizza-text");

    window.addEventListener("scroll", () => {
        const currentY = window.scrollY;
        const direction = currentY > lastScrollY ? 1 : -1;

        offset += direction * 10; // tăng giá trị để chuyển động rõ ràng hơn

        aboutText.style.transform = `translate(calc(-50% + ${offset}px), -50%)`;
        pizzaText.style.transform = `translate(calc(-50% - ${offset}px), 50%)`;

        lastScrollY = currentY <= 0 ? 0 : currentY;
    });


    //Mision

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // chỉ chạy 1 lần
            }
        });
    }, {
        threshold: 0.2
    });

    // Lấy tất cả phần tử mission-row
    document.querySelectorAll('.mission-row').forEach(row => {
        observer.observe(row);
    });
}); // <-- đóng hàm $(document).ready
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