  function handleSearch(event) {
        if (event.key === 'Enter') {
            const query = document.getElementById('searchInput').value.toLowerCase();
            alert('Chuyển hướng đến trang thực đơn để tìm kiếm ' );
            window.location.href = '../Menu/all.html?search=' + query;
        }
    }
    function showTestimonials() {
        const cards = document.querySelectorAll('.testimonial-card');
        cards.forEach((card, index) => {
          card.style.display = (index === currentIndex || index === currentIndex + 1) ? 'block' : 'none';
        });
      }
      
      function changeTestimonial(direction) {
        const cards = document.querySelectorAll('.testimonial-card');
        const total = cards.length;
      
        currentIndex += direction * 2;
      
        if (currentIndex < 0) currentIndex = total - 2;
        if (currentIndex >= total) currentIndex = 0;
      
        showTestimonials();
      }