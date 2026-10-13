(function () {
  document.querySelectorAll(".card").forEach(function (c) {
    c.addEventListener("mousemove", function (e) {
      var r = c.getBoundingClientRect();
      c.style.transform =
        "perspective(600px) rotateY(" +
        ((e.clientX - r.left) / r.width - 0.5) * 10 +
        "deg) rotateX(" +
        -((e.clientY - r.top) / r.height - 0.5) * 10 +
        "deg)";
    });
    c.addEventListener("mouseleave", function () {
      c.style.transform = "";
    });
  });
})();
