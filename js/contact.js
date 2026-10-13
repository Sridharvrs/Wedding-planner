(function () {
  var f = document.getElementById("cf");
  f.onsubmit = function (e) {
    e.preventDefault();
    var ok = true;
    f.querySelectorAll("[required]").forEach(function (i) {
      if (!i.value.trim()) {
        i.classList.add("bad");
        ok = false;
      } else i.classList.remove("bad");
    });
    document.getElementById("fm").textContent = ok
      ? "Thank you! We will contact you within 24 hours."
      : "Please fill the highlighted fields.";
  };
})();
