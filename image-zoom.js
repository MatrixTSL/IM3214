// Image Zoom Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create modal HTML
    const modalHTML = `
        <div id="imageZoomModal" class="image-zoom-modal">
            <div class="zoom-modal-content">
                <span class="zoom-modal-close">&times;</span>
                <img id="zoomModalImage" class="zoom-modal-image" src="" alt="">
                <div id="zoomModalCaption" class="zoom-modal-caption"></div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Get modal elements
    const modal = document.getElementById('imageZoomModal');
    const modalImg = document.getElementById('zoomModalImage');
    const modalCaption = document.getElementById('zoomModalCaption');
    const closeBtn = document.querySelector('.zoom-modal-close');
    
    // Function to open modal
    function openImageModal(imgSrc, imgAlt, caption = '') {
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
        modalCaption.textContent = caption || imgAlt;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Function to close modal
    function closeImageModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', closeImageModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeImageModal();
        }
    });
    
    // Add click handlers to all images
    function addImageClickHandlers() {
        // Introduction images
        const introImages = document.querySelectorAll('.introduction-image .system-diagram img');
        introImages.forEach(img => {
            img.addEventListener('click', function() {
                const imgSrc = this.src;
                const imgAlt = this.alt;
                openImageModal(imgSrc, imgAlt);
            });
        });
        
        // Worksheet-specific images
        const worksheetImages = document.querySelectorAll('.worksheet-image, .worksheet-image-container img');
        worksheetImages.forEach(img => {
            img.addEventListener('click', function() {
                const imgSrc = this.src;
                const imgAlt = this.alt;
                // Try to get caption from nearby elements
                let caption = '';
                const captionElement = this.parentElement.querySelector('.image-caption');
                if (captionElement) {
                    caption = captionElement.textContent;
                }
                openImageModal(imgSrc, imgAlt, caption);
            });
        });
    }
    
    // Initialize click handlers
    addImageClickHandlers();
    
    // Re-initialize if content is dynamically loaded
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if new images were added
                const newImages = document.querySelectorAll('.introduction-image .system-diagram img, .worksheet-image, .worksheet-image-container img');
                newImages.forEach(img => {
                    if (!img.hasAttribute('data-zoom-initialized')) {
                        img.setAttribute('data-zoom-initialized', 'true');
                        img.addEventListener('click', function() {
                            const imgSrc = this.src;
                            const imgAlt = this.alt;
                            let caption = '';
                            const captionElement = this.parentElement.querySelector('.image-caption');
                            if (captionElement) {
                                caption = captionElement.textContent;
                            }
                            openImageModal(imgSrc, imgAlt, caption);
                        });
                    }
                });
            }
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
