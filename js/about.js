(function () {
  document.querySelectorAll(".card").forEach(function (c, i) {
    c.style.setProperty("--r", (i % 2 ? 1 : -1) * 2 + "deg");
  });
})();
