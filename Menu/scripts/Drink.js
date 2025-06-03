document.addEventListener('DOMContentLoaded', function () {
    fetch('json/Drink.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Không thể tải file Drink.json. Mã lỗi: ${response.status}`);
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
                let priceHtml = `<div class="price">`;
                priceHtml += `<span class="current-price">${item.currentPrice}</span>`;
                if (item.oldPrice) {
                    priceHtml += `<span class="old-price">${item.oldPrice}</span>`;
                }
                priceHtml += `</div>`;
                menuItem.innerHTML = `
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