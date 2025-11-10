document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });
    
    const deviceTypeSelect = document.getElementById('device-type');
    const monthsSlider = document.getElementById('months');
    const monthsValue = document.getElementById('months-value');
    const vehiclesInput = document.getElementById('vehicles');
    const totalPrice = document.getElementById('total-price');
    const resultDetails = document.getElementById('result-details');
    
    const devicePrices = {
        basic: 29.90,
        standard: 39.90,
        premium: 49.90
    };
    
    function updateCalculator() {
        const deviceType = deviceTypeSelect.value;
        const months = parseInt(monthsSlider.value);
        const vehicles = parseInt(vehiclesInput.value);
        
        monthsValue.textContent = months;
        
        const pricePerMonth = devicePrices[deviceType];
        const total = pricePerMonth * months * vehicles;
        
        totalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        
        let deviceName = '';
        switch(deviceType) {
            case 'basic':
                deviceName = 'Básico';
                break;
            case 'standard':
                deviceName = 'Padrão';
                break;
            case 'premium':
                deviceName = 'Premium';
                break;
        }
        
        resultDetails.textContent = `${months} ${months === 1 ? 'mês' : 'meses'} x R$ ${pricePerMonth.toFixed(2).replace('.', ',')} (${vehicles} ${vehicles === 1 ? 'veículo' : 'veículos'})`;
    }
    
    deviceTypeSelect.addEventListener('change', updateCalculator);
    monthsSlider.addEventListener('input', updateCalculator);
    vehiclesInput.addEventListener('input', updateCalculator);
    
    updateCalculator();
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.benefit-card, .step, .faq-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
});