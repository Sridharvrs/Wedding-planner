var $ = function (s, c) {
    return (c || document).querySelector(s);
  },
  $$ = function (s, c) {
    return Array.prototype.slice.call((c || document).querySelectorAll(s));
  };
function toast(m) {
  var t = $("#toast");
  t.textContent = m;
  t.classList.add("on");
  clearTimeout(t._t);
  t._t = setTimeout(function () {
    t.classList.remove("on");
  }, 2400);
}
(function () {
  var side = $("#side"),
    sh = $("#shade");
  function sb(o) {
    side.classList.toggle("open", o);
    sh.classList.toggle("on", o);
  }
  $("#tg").onclick = function () {
    sb(!side.classList.contains("open"));
  };
  sh.onclick = function () {
    sb(false);
  };
  function show(id) {
    $$(".mod").forEach(function (m) {
      m.classList.toggle("on", m.id == id);
    });
    $$(".nl[data-m]").forEach(function (b) {
      b.classList.toggle("on", b.dataset.m == id);
    });
    $("#tt").textContent = $('.nl[data-m="' + id + '"]').textContent.trim();
    sb(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "#" + id);
    run(id);
  }
  $$(".nl[data-m]").forEach(function (b) {
    b.onclick = function () {
      show(b.dataset.m);
    };
  });
  function run(id) {
    var m = $("#" + id);
    $$("[data-count]", m).forEach(function (c) {
      var n = +c.dataset.count,
        i = 0,
        st = Math.max(1, n / 40);
      clearInterval(c._i);
      c._i = setInterval(function () {
        i += st;
        if (i >= n) {
          i = n;
          clearInterval(c._i);
        }
        c.textContent = Math.round(i);
      }, 30);
    });
    $$("[data-grow]", m).forEach(function (e) {
      e.style.height = "0";
      setTimeout(function () {
        e.style.height = e.dataset.grow;
      }, 60);
    });
    if (window.onMod) window.onMod(id);
  }
  var h = location.hash.slice(1);
  show($('.nl[data-m="' + h + '"]') ? h : $(".nl[data-m]").dataset.m);
  $$("[data-logout]").forEach(function (b) {
    b.onclick = function () {
      $("#dlg").classList.add("on");
    };
  });
  $("#no").onclick = function () {
    $("#dlg").classList.remove("on");
  };
  $("#yes").onclick = function () {
    try {
      sessionStorage.clear();
    } catch (e) {}
    location.href = "index.html";
  };
  $$("[data-toast]").forEach(function (b) {
    b.onclick = function () {
      toast(b.dataset.toast);
    };
  });
  $("#gs").oninput = function (e) {
    var q = e.target.value.toLowerCase();
    $$(".mod.on tbody tr,.mod.on .lst li,.mod.on .vc").forEach(function (r) {
      r.style.display =
        r.textContent.toLowerCase().indexOf(q) > -1 ? "" : "none";
    });
  };
  window.ring = function (p) {
    var r = $("#ring");
    if (!r) return;
    setTimeout(function () {
      r.style.strokeDashoffset = 327 - (327 * p) / 100;
    }, 80);
    var t = $("#rt"),
      i = 0;
    clearInterval(window._ri);
    window._ri = setInterval(function () {
      if (i >= p) return clearInterval(window._ri);
      t.textContent = ++i + "%";
    }, 25);
  };
  window.fill = function (id, rows) {
    var b = $("#" + id + " tbody");
    b.innerHTML = rows
      .map(function (r) {
        return (
          "<tr>" +
          r
            .map(function (c) {
              return "<td>" + c + "</td>";
            })
            .join("") +
          "</tr>"
        );
      })
      .join("");
  };
  window.li = function (id, rows) {
    $("#" + id).innerHTML = rows
      .map(function (r) {
        return "<li><span>" + r[0] + "</span><em>" + r[1] + "</em></li>";
      })
      .join("");
  };
  window.tg = function (t, c) {
    return '<em class="tg ' + c + '">' + t + "</em>";
  };
})();
