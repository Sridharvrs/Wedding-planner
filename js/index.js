(function () {
  var d = document.getElementById("wd");
  if (d) {
    var t = new Date();
    t.setMonth(t.getMonth() + 6);
    d.valueAsDate = t;
    var b = document.querySelectorAll("#cd b");
    function u() {
      var ms = new Date(d.value) - new Date();
      if (ms < 0) ms = 0;
      var v = [ms / 864e5, (ms / 36e5) % 24, (ms / 6e4) % 60, (ms / 1e3) % 60];
      b.forEach(function (e, i) {
        e.textContent = String(Math.floor(v[i])).padStart(2, "0");
      });
    }
    d.onchange = u;
    setInterval(u, 1000);
    u();
  }
})();
