
// Get the logged-in user
const currentUser = JSON.parse(
  localStorage.getItem("stacklyCurrentUser") ||
  sessionStorage.getItem("stacklyCurrentUser") ||
  "null"
);

if (currentUser?.name) {
  // Display dynamic name
  document.querySelectorAll(".profileName").forEach((element) => {
    element.textContent = currentUser.name;
  });

  // Display first letter in avatar
  const firstLetter = currentUser.name.trim().charAt(0).toUpperCase();

  document.querySelectorAll(".avatar").forEach((element) => {
    element.textContent = firstLetter;
  });
}


// ========================================= code for pages ============================================


(function () {
  var wd = new Date("2027-02-14T09:15:00");
  function cd() {
    var ms = Math.max(0, wd - new Date());
    $("#cdn").innerHTML = [
      ["Days", ms / 864e5],
      ["Hrs", (ms / 36e5) % 24],
      ["Min", (ms / 6e4) % 60],
      ["Sec", (ms / 1e3) % 60],
    ]
      .map(function (x) {
        return (
          "<div><b>" +
          String(Math.floor(x[1])).padStart(2, "0") +
          "</b>" +
          x[0] +
          "</div>"
        );
      })
      .join("");
  }
  cd();
  setInterval(cd, 1000);
  li("appt", [
    ["🍰 Cake tasting · Mon 19 Oct", "10:30 AM"],
    ["👗 Bridal fitting · Sat 24 Oct", "2:00 PM"],
    ["🏰 Venue walk-through · Thu 29 Oct", "11:00 AM"],
    ["🎶 Music briefing · Mon 2 Nov", "6:00 PM"],
  ]);
  $("#actv").innerHTML = [
    "Catering menu approved",
    "Florist sent 3 mandap designs",
    "Invitation batch 2 delivered to 80 guests",
    "Photography advance paid",
  ]
    .map(function (a, i) {
      return (
        "<li><b>" +
        a +
        "</b><br><small>" +
        (i + 1) +
        " day" +
        (i ? "s" : "") +
        " ago</small></li>"
      );
    })
    .join("");
  var tasks = {
    "6 months out": [
      ["Book venue", 1],
      ["Hire photographer", 1],
      ["Finalise guest list", 1],
      ["Choose caterer", 1],
    ],
    "3 months out": [
      ["Send invitations", 1],
      ["Order wedding attire", 1],
      ["Book honeymoon", 0],
      ["Select mandap design", 0],
    ],
    "Final month": [
      ["Outfit trial", 0],
      ["Confirm seating chart", 0],
      ["Prepare return gifts", 0],
      ["Pack for the venue", 0],
    ],
  };
  function rt() {
    var h = "";
    Object.keys(tasks).forEach(function (k) {
      h +=
        '<section class="pn"><h3>' +
        k +
        "</h3>" +
        tasks[k]
          .map(function (t, i) {
            return (
              '<label class="tk2" style="display:block;padding:6px 0;cursor:pointer"><input type="checkbox" data-k="' +
              k +
              '" data-i="' +
              i +
              '" ' +
              (t[1] ? "checked" : "") +
              "> " +
              t[0] +
              "</label>"
            );
          })
          .join("") +
        "</section>";
    });
    $("#clist").innerHTML = h;
    var a = 0,
      b = 0;
    Object.keys(tasks).forEach(function (k) {
      tasks[k].forEach(function (t) {
        b++;
        a += t[1];
      });
    });
    var p = Math.round((a / b) * 100);
    $("#cbar").style.width = p + "%";
    $("#cpct").textContent = a + " of " + b + " tasks done (" + p + "%)";
  }
  $("#clist").onchange = function (e) {
    tasks[e.target.dataset.k][e.target.dataset.i][1] = e.target.checked ? 1 : 0;
    rt();
  };
  $("#tf").onsubmit = function (e) {
    e.preventDefault();
    tasks[$("#tp").value].push([$("#tn").value, 0]);
    $("#tn").value = "";
    rt();
    toast("Task added");
  };
  rt();
  var cats = [
    ["Venue", 380000, 420000],
    ["Catering", 320000, 360000],
    ["Décor", 210000, 280000],
    ["Photography", 150000, 180000],
    ["Attire", 166000, 200000],
  ];
  function rc() {
    $("#cats").innerHTML = cats
      .map(function (c) {
        var p = Math.min(100, Math.round((c[1] / c[2]) * 100));
        return (
          '<div class="wk"><span><b>' +
          c[0] +
          '</b><em style="font-style:normal">₹' +
          c[1].toLocaleString("en-IN") +
          " / ₹" +
          c[2].toLocaleString("en-IN") +
          '</em></span><div class="bar"><i style="width:' +
          p +
          '%"></i></div></div>'
        );
      })
      .join("");
  }
  rc();
  var ex = [
      ["Venue advance", "Venue", 200000, "ok", "Paid"],
      ["Catering deposit", "Catering", 150000, "ok", "Paid"],
      ["Floral advance", "Décor", 80000, "wt", "Pending"],
      ["Photographer", "Photography", 75000, "ok", "Paid"],
    ],
    added = 0;
  function re() {
    fill(
      "et",
      ex.map(function (r) {
        return [r[0], r[1], "₹" + r[2].toLocaleString("en-IN"), tg(r[4], r[3])];
      }),
    );
  }
  re();
  $("#ef").onsubmit = function (e) {
    e.preventDefault();
    var a = +$("#ea").value;
    ex.unshift([$("#en").value, $("#ec").value, a, "wt", "Pending"]);
    added += a;
    cats.forEach(function (c) {
      if (c[0] == $("#ec").value) c[1] += a;
    });
    $("#etot").textContent = "₹" + added.toLocaleString("en-IN");
    e.target.reset();
    re();
    rc();
    toast("Expense added");
  };
  li("due", [
    ["Décor balance · 20 Oct", "₹60,000"],
    ["Catering instalment · 1 Nov", "₹50,000"],
    ["Photography · 15 Nov", "₹30,000"],
  ]);
  var gs = [
      ["Ramesh Kumar", "Family", "Attending", "T1"],
      ["Lakshmi Devi", "Family", "Attending", "T1"],
      ["Vikram S", "Friends", "Pending", "T3"],
      ["Nisha Rao", "Colleagues", "Declined", "-"],
      ["Suresh B", "Family", "Attending", "T2"],
      ["Anita J", "Friends", "Attending", "T3"],
    ],
    gf = "All";
  function rg() {
    fill(
      "gt",
      gs
        .filter(function (g) {
          return gf == "All" || g[2] == gf;
        })
        .map(function (g) {
          return [
            g[0],
            g[1],
            tg(
              g[2],
              g[2] == "Attending" ? "ok" : g[2] == "Pending" ? "wt" : "bad",
            ),
            g[3],
          ];
        }),
    );
  }
  rg();
  $("#gch").onclick = function (e) {
    if (!e.target.dataset.f) return;
    gf = e.target.dataset.f;
    $$("#gch button").forEach(function (b) {
      b.classList.toggle("on", b == e.target);
    });
    rg();
  };
  $("#gf").onsubmit = function (e) {
    e.preventDefault();
    gs.unshift([$("#gn").value, $("#gr").value, "Pending", "-"]);
    e.target.reset();
    rg();
    toast("Guest added");
  };
  $("#seat").innerHTML = [
    ["Table 1", "Close family", "10/10"],
    ["Table 2", "Mother side relatives", "9/10"],
    ["Table 3", "College friends", "8/10"],
    ["Table 4", "Colleagues", "6/10"],
    ["Table 5", "Neighbours", "7/10"],
    ["Table 6", "Elders honour table", "8/8"],
  ]
    .map(function (t) {
      return (
        '<div class="seat"><b>' +
        t[0] +
        "</b><br>" +
        t[1] +
        "<br><small>Seats " +
        t[2] +
        "</small></div>"
      );
    })
    .join("");
  $("#vcards").innerHTML = [
    ["🏰", "The Grand Palace", "Venue", "Booked", "ok"],
    ["🍛", "Spice Route Caterers", "Catering", "Booked", "ok"],
    ["💐", "Petal & Bloom", "Floral", "Quote pending", "wt"],
    ["📸", "Candid Frames", "Photography", "Booked", "ok"],
    ["🎶", "Raga Beats", "Music", "Shortlisted", "wt"],
    ["💄", "Glow Studio", "Makeup", "Booked", "ok"],
  ]
    .map(function (v) {
      return (
        '<article class="vc"><div class="em">' +
        v[0] +
        "</div><div><h4>" +
        v[1] +
        "</h4><p>" +
        v[2] +
        '</p><em class="tg ' +
        v[4] +
        '">' +
        v[3] +
        "</em></div></article>"
      );
    })
    .join("");
  li("meets", [
    ["🍰 Cake tasting with Sweet Tiers", "19 Oct"],
    ["💐 Floral mock-up viewing", "26 Oct"],
    ["🎶 Playlist meeting", "2 Nov"],
  ]);
  $("#stars").innerHTML = [1, 2, 3, 4, 5]
    .map(function (i) {
      return '<span data-s="' + i + '">★</span>';
    })
    .join("");
  $("#stars").onclick = function (e) {
    var s = +e.target.dataset.s;
    if (!s) return;
    $$("#stars span").forEach(function (x) {
      x.classList.toggle("on", +x.dataset.s <= s);
    });
    $("#sm").textContent = "Thank you for rating us " + s + " out of 5!";
  };
  $("#tlx").innerHTML = [
    ["5:30 AM", "Bridal makeup and dressing"],
    ["7:30 AM", "Family breakfast and photos"],
    ["8:30 AM", "Baraat welcome"],
    ["9:15 AM", "Muhurtham ceremony"],
    ["12:30 PM", "Wedding lunch"],
    ["4:00 PM", "Couple portraits"],
    ["7:00 PM", "Reception and cake cutting"],
    ["10:00 PM", "Dinner and send-off"],
  ]
    .map(function (t) {
      return "<li><b>" + t[0] + "</b> · " + t[1] + "</li>";
    })
    .join("");
  $("#pack").innerHTML = [
    "Rings",
    "Marriage documents",
    "Emergency sewing kit",
    "Touch-up makeup",
    "Phone chargers",
    "Gift envelopes",
    "Water bottles",
    "Spare footwear",
  ]
    .map(function (p) {
      return (
        '<label class="seat" style="cursor:pointer"><input type="checkbox"> ' +
        p +
        "</label>"
      );
    })
    .join("");
  window.onMod = function (id) {
    if (id == "c-over") ring(68);
  };
  var cols = ["#f4a6b8", "#e3b95b", "#fbd3dc"];
  for (var i = 0; i < 10; i++) {
    var p = document.createElement("span"),
      z = 10 + Math.random() * 10;
    p.className = "petal";
    p.style.cssText =
      "left:" +
      Math.random() * 100 +
      "vw;width:" +
      z +
      "px;height:" +
      z * 1.3 +
      "px;background:" +
      cols[i % 3] +
      ";animation-duration:" +
      (12 + Math.random() * 10) +
      "s;animation-delay:-" +
      Math.random() * 12 +
      "s";
    document.body.appendChild(p);
  }
})();
