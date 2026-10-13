(function () {
  var fb = document.querySelectorAll(".filters button");
  fb.forEach(function (b) {
    b.onclick = function () {
      fb.forEach(function (x) {
        x.classList.remove("on");
      });
      b.classList.add("on");
      document.querySelectorAll(".gi").forEach(function (g) {
        g.style.display =
          b.dataset.f == "all" || g.dataset.c == b.dataset.f ? "" : "none";
      });
    };
  });
  document.querySelectorAll(".gi img").forEach(function (i) {
    i.onclick = function () {
      var o = document.createElement("div");
      o.className = "lb";
      o.innerHTML = '<img src="' + i.src + '">';
      o.onclick = function () {
        o.remove();
      };
      document.body.appendChild(o);
    };
  });
})();
