document.getElementById('moreButton').addEventListener('click', function() {
    var moreImages = document.querySelector('.more-images');
    if (moreImages.classList.contains('show')) {
        moreImages.classList.remove('show');
        this.textContent = 'More Projects';
    } else {
        moreImages.classList.add('show');
        this.textContent = 'Less Projects';
    }
});