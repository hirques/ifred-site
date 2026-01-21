// ===== Controle de rolagem e comportamento da página =====

// Garante que o navegador não restaure posição ao voltar no histórico
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

// Força a página a começar do topo SEM quebrar âncoras
window.addEventListener("pageshow", () => {
    // Somente se não houver hash intencional
    if (!window.location.hash) {
        setTimeout(() => window.scrollTo(0, 0), 0);
    }
});

document.addEventListener("DOMContentLoaded", () => {

    // Se o site abrir com um hash antigo, remove antes de rolar
    if (window.location.hash) {
        const hash = window.location.hash;
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
                const header = document.querySelector("header");
                const offset = header ? header.offsetHeight + 10 : 10;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: "smooth" });
            }
        }, 120);
    }

    // Rolagem suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const header = document.querySelector("header");
                const offset = header ? header.offsetHeight + 10 : 10;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: "smooth" });
                history.replaceState(null, document.title, href);
            }
        });
    });

    // Botões com classe .scroll-btn (caso não sejam <a>)
    document.querySelectorAll(".scroll-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            const href = this.getAttribute("href") || this.dataset.target;
            if (!href) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const header = document.querySelector("header");
                const offset = header ? header.offsetHeight + 10 : 10;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: "smooth" });
                history.replaceState(null, document.title, href);
            }
        });
    });

    // Mantém o efeito de sombra no header ao rolar
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 2px 12px rgba(0,0,0,0.12)";
        } else {
            header.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
        }
    });

    // Evita que se algum input ganhe foco automático ele cause scroll
    setTimeout(() => {
        if (document.activeElement && ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
            document.activeElement.blur();
        }
    }, 50);
});
