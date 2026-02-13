/**
 * Lusitânia Medieval - Main JavaScript
 * Clean, minimal functionality
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    init();
});

/**
 * Initialize the application
 */
function init() {
    initSmoothScroll();
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Handle contact form submission
 */
function initFormHandler() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Build mailto link
        const subject = encodeURIComponent(`[Pedido de Proposta] ${data.tipo || 'Evento'} — ${data.nome}`);
        const body = encodeURIComponent(
`Nome: ${data.nome}
Email: ${data.email}
Tipo de Evento: ${data.tipo}
Participantes: ${data.participantes || 'Não especificado'}

Mensagem:
${data.mensagem || 'Sem mensagem adicional'}
`
        );
        
        const mailtoLink = `mailto:contacto@lusitaniamedieval.pt?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    });
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
