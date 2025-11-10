window.dataLayer = window.dataLayer || [];

/* // analytics
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
*/

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('span:last-child');
        
        document.querySelectorAll('.faq-answer').forEach(a => {
            if (a !== answer) {
                a.classList.remove('active');
                a.previousElementSibling.querySelector('span:last-child').textContent = '+';
            }
        });
        
        answer.classList.toggle('active');
        icon.textContent = answer.classList.contains('active') ? '−' : '+';
    });
});