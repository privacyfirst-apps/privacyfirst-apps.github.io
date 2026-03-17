// ============================
// APP STORE FUNCTIONALITY
// ============================

document.addEventListener('DOMContentLoaded', function () {

    // ===== FILTER FUNCTIONALITY =====
    var filterButtons = document.querySelectorAll('.filter-btn');
    var appCards = document.querySelectorAll('.app-card');
    var emptyState = document.getElementById('emptyState');

    // Count apps per category
    function updateCounts() {
        var allCount = appCards.length;
        var freeCount = 0;
        var freemiumCount = 0;
        var paidCount = 0;

        appCards.forEach(function (card) {
            var category = card.getAttribute('data-category');
            if (category === 'free') freeCount++;
            if (category === 'freemium') freemiumCount++;
            if (category === 'paid') paidCount++;
        });

        var countAll = document.getElementById('count-all');
        var countFree = document.getElementById('count-free');
        var countFreemium = document.getElementById('count-freemium');
        var countPaid = document.getElementById('count-paid');

        if (countAll) countAll.textContent = allCount;
        if (countFree) countFree.textContent = freeCount;
        if (countFreemium) countFreemium.textContent = freemiumCount;
        if (countPaid) countPaid.textContent = paidCount;
    }

    updateCounts();

    // Filter click handler
    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');

            // Filter cards
            var visibleCount = 0;

            appCards.forEach(function (card) {
                var category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });

            // Show/hide empty state
            if (emptyState) {
                if (visibleCount === 0) {
                    emptyState.style.display = 'block';
                } else {
                    emptyState.style.display = 'none';
                }
            }
        });
    });

    // ===== MOBILE MENU FOR APP PAGES =====
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== SCROLL REVEAL FOR APP CARDS =====
    function revealAppCards() {
        var windowHeight = window.innerHeight;
        
        appCards.forEach(function (card) {
            var cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 80) {
                card.classList.add('visible');
            }
        });

        // Also reveal other elements
        var otherElements = document.querySelectorAll('.feature-card, .privacy-item, .requirements-card');
        otherElements.forEach(function (el) {
            var elTop = el.getBoundingClientRect().top;
            if (elTop < windowHeight - 80) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealAppCards);
    revealAppCards();
});
