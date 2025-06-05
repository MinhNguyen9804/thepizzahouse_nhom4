document.addEventListener('DOMContentLoaded', function () {
    fetch('json/Spaghetti.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Không thể tải file Spaghetti.json. Mã lỗi: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const menuGrid = document.getElementById('menuGrid');
            data.forEach(item => {
                const menuItem = document.createElement('div');
                // Thêm lớp 'menu-item' và 'hidden-product' nếu isHidden là true
                menuItem.className = `menu-item${item.isHidden ? ' hidden-product' : ''}`;
                // Thêm style display: none nếu isHidden là true
                if (item.isHidden) {
                    menuItem.style.display = 'none';
                }
                menuItem.setAttribute('onclick', `showProductDetail('${item.name}', '${item.image}', '${item.description}', '${item.currentPrice}', '${item.oldPrice}')`);

                // Tạo HTML cho tag (nếu có)
                let tagHtml = '';
                if (item.tag) {
                    if (item.tag === 'must-try') {
                        tagHtml = `<div class="must-try-tag">Must Try</div>`;
                    } else if (item.tag === 'new') {
                        tagHtml = `<div class="new-tag">Món mới</div>`;
                    } else if (item.tag === 'hot') {
                        tagHtml = `<div class="hot-tag"><i class="fas fa-fire"></i></div>`;
                    }
                }

                let priceHtml = `<div class="price">`;
                priceHtml += `<span class="current-price">${item.currentPrice}</span>`;
                if (item.oldPrice) {
                    priceHtml += `<span class="old-price">${item.oldPrice}</span>`;
                }
                priceHtml += `</div>`;

                menuItem.innerHTML = `
                    ${tagHtml} <!-- Thêm tag vào đây -->
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description.substring(0, 50)}...</p>
                    ${priceHtml}
                    <button onclick="addToCart('${item.name}')">Thêm vào giỏ</button>
                `;
                menuGrid.appendChild(menuItem);
            });
            reattachEventListeners();
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu:', error);
            alert('Có lỗi xảy ra khi tải thực đơn. Vui lòng kiểm tra console.');
        });
});