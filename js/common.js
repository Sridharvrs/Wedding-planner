
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTS
    ========================================= */

    var $ = function (selector, parent) {
      return (parent || document).querySelector(selector);
    };

    var $$ = function (selector, parent) {
      return Array.from(
        (parent || document).querySelectorAll(selector)
      );
    };

    var burger = $(".burger");
    var menu = $(".menu");
    var shade = $(".shade");

    var loginModal = $("#lm");
    var signupModal = $("#sm");

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */


function toggleMenu(force) {
  if (!menu || !burger || !shade) return;

  var shouldOpen =
    typeof force === "boolean"
      ? force
      : !menu.classList.contains("open");

  menu.classList.toggle("open", shouldOpen);
  burger.classList.toggle("open", shouldOpen);
  shade.classList.toggle("open", shouldOpen);

  burger.setAttribute("aria-expanded", String(shouldOpen));

  // Lock background scrolling while the mobile menu is open
  if (window.innerWidth <= 768) {
    document.body.classList.toggle("menu-open", shouldOpen);
  } else {
    document.body.classList.remove("menu-open");
  }
}


    burger?.addEventListener("click", function () {
      toggleMenu();
    });

    shade?.addEventListener("click", function () {
      toggleMenu(false);
    });

    /* =========================================
       MODAL MANAGEMENT
    ========================================= */

    function openModal(modal) {
      if (!modal) return;

      closeAllModals();
      toggleMenu(false);

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");

      document.body.classList.add("modal-open");

      var firstInput = modal.querySelector(
        'input:not([type="checkbox"]):not([type="hidden"])'
      );

      if (firstInput) {
        setTimeout(function () {
          firstInput.focus();
        }, 50);
      }
    }

    function closeModal(modal) {
      if (!modal) return;

      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");

      if (
        !loginModal?.classList.contains("open") &&
        !signupModal?.classList.contains("open")
      ) {
        document.body.classList.remove("modal-open");
      }
    }

    function closeAllModals() {
      closeModal(loginModal);
      closeModal(signupModal);
    }

    /* =========================================
       OPEN LOGIN MODAL
    ========================================= */

    $$("[data-login]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        openModal(loginModal);
      });
    });

    /* =========================================
       OPEN SIGNUP MODAL
    ========================================= */

    $$("[data-open-signup]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        openModal(signupModal);
      });
    });

    /* =========================================
       SWITCH SIGNUP -> LOGIN
    ========================================= */

    $$("[data-open-login]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        openModal(loginModal);
      });
    });

    /* =========================================
       CLOSE MODALS
    ========================================= */

    document.addEventListener("click", function (event) {
      var closeButton = event.target.closest(
        "[data-close], #signupClose"
      );

      if (closeButton) {
        var modal = closeButton.closest(".modal");

        if (modal) {
          event.preventDefault();
          closeModal(modal);
        }

        return;
      }

      /* Close when clicking outside the modal box */

      if (event.target === loginModal) {
        closeModal(loginModal);
      }

      if (event.target === signupModal) {
        closeModal(signupModal);
      }
    });

    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeAllModals();
        toggleMenu(false);
      }
    });

    /* =========================================
       BACKGROUND SCROLL CONTROL
    ========================================= */

    var modalStyle = document.createElement("style");

    modalStyle.textContent = `
      body.modal-open {
        overflow: hidden;
      }
    `;

    document.head.appendChild(modalStyle);

    /* =========================================
       REVEAL ANIMATIONS + COUNTERS
    ========================================= */

    function animateCount(element) {
      if (element.dataset.counted === "true") return;

      element.dataset.counted = "true";

      var target = Number(element.dataset.count);

      if (!Number.isFinite(target)) return;

      var duration = 1400;
      var startTime = null;

      function updateCount(timestamp) {
        if (startTime === null) startTime = timestamp;

        var progress = Math.min(
          (timestamp - startTime) / duration,
          1
        );

        /* Smooth ease-out animation */

        var eased = 1 - Math.pow(1 - progress, 3);

        element.textContent = Math.round(
          target * eased
        ).toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          element.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(updateCount);
    }

    var revealElements = $$(".reveal");

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            var element = entry.target;

            element.classList.add("in");

            var counter = element.matches("[data-count]")
              ? element
              : $("[data-count]", element);

            if (counter) {
              animateCount(counter);
            }

            observer.unobserve(element);
          });
        },
        { threshold: 0.15 }
      );

      revealElements.forEach(function (element, index) {
        element.style.transitionDelay =
          (index % 4) * 0.08 + "s";

        observer.observe(element);
      });
    } else {
      revealElements.forEach(function (element) {
        element.classList.add("in");

        if (element.matches("[data-count]")) {
          animateCount(element);
        }

        $$("[data-count]", element).forEach(animateCount);
      });
    }

    /* =========================================
       FLOATING PETALS
    ========================================= */

    var reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {
      var colors = [
        "#f4a6b8",
        "#fbd3dc",
        "#e3b95b",
        "#fff3dc",
        "#ffffff",
        "#f08aa5"
      ];

      for (var i = 0; i < 26; i++) {
        var petal = document.createElement("span");
        var size = 10 + Math.random() * 14;

        petal.className = "petal";

        petal.style.cssText =
          "left:" + Math.random() * 100 + "vw;" +
          "width:" + size + "px;" +
          "height:" + size * 1.3 + "px;" +
          "background:" + colors[i % colors.length] + ";" +
          "animation-duration:" +
          (9 + Math.random() * 10) + "s;" +
          "animation-delay:-" +
          Math.random() * 15 + "s;";

        document.body.appendChild(petal);
      }
    }

  });
})();


document.getElementById("footer-year").textContent =
    new Date().getFullYear();