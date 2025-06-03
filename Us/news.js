

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