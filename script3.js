// Load wishes from a JSON file
document.addEventListener("DOMContentLoaded", function() {
    let currentSlide = 0;
    
    // Load wishes from the JSON file
    fetch('wishes.json')
        .then(response => response.json())
        .then(data => {
            const slideshow = document.getElementById('slideshow');
            
            data.forEach((wish, index) => {
                const slideDiv = document.createElement('div');
                slideDiv.classList.add('slide');
                
                // Add image and wish text
                slideDiv.innerHTML = `
                    <img src="${wish.image}" alt="Wish Image">
                    <p><strong>${wish.name}</strong>: ${wish.message}</p>
                `;
                
                // Only set the first slide as active
                if (index === 0) {
                    slideDiv.classList.add('active');
                }
                
                slideshow.appendChild(slideDiv);
            });

            // Start the slideshow
            startSlideshow();
        })
        .catch(error => console.error('Error loading wishes:', error));

    // Function to start the slideshow
    function startSlideshow() {
        const slides = document.querySelectorAll('.slide');
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000); // Change slide every 3 seconds
    }

    // Music control
    const music = document.getElementById('background-music');
    const toggleMusicButton = document.getElementById('toggle-music');
    
    toggleMusicButton.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            toggleMusicButton.textContent = 'Pause Music';
        } else {
            music.pause();
            toggleMusicButton.textContent = 'Play Music';
        }
    });
});
