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