/* =====================================================================
   Descubra Matias Barbosa — JS vanilla (PortalFacil)
   Carregado via <NextScript src="{BASE_PATH}/js/script.js" defer>
   ===================================================================== */
(function () {
    'use strict';

    function init() {
        // Ano atual no rodapé
        var year = document.getElementById('displayYear');
        if (year) year.textContent = new Date().getFullYear();

        // Header sticky ao rolar
        var header = document.getElementById('header');
        if (header) {
            window.addEventListener('scroll', function () {
                header.classList.toggle('is-sticky', window.scrollY > 120);
            }, { passive: true });
        }

        // Botão "voltar ao topo"
        var scrollBtn = document.getElementById('scroll-area');
        if (scrollBtn) {
            scrollBtn.style.display = 'none';
            window.addEventListener('scroll', function () {
                scrollBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
            }, { passive: true });
            scrollBtn.addEventListener('click', function (e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Microinteração: revelar seções ao entrar na viewport.
        // Usa checagem por posição (robusta em qualquer ambiente); o conteúdo
        // NUNCA fica preso invisível — load/resize/timeout garantem exibição.
        var reveals = document.querySelectorAll('.reveal');
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reveals.length) {
            if (reduce) {
                reveals.forEach(function (el) { el.classList.add('is-visible'); });
            } else {
                var check = function () {
                    reveals.forEach(function (el) {
                        if (el.classList.contains('is-visible')) return;
                        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
                            el.classList.add('is-visible');
                        }
                    });
                };
                check();
                window.addEventListener('scroll', check, { passive: true });
                window.addEventListener('resize', check);
                window.addEventListener('load', check);
                setTimeout(check, 500);  // rede de segurança
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
