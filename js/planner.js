
// Get the logged-in user
const currentUser = JSON.parse(
  localStorage.getItem("eternalVowsCurrentUser") ||
  sessionStorage.getItem("eternalVowsCurrentUser") ||
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
  var mo = [
    ["May", 22],
    ["Jun", 18],
    ["Jul", 30],
    ["Aug", 26],
    ["Sep", 38],
    ["Oct", 42],
  ];
  $("#rev").innerHTML = mo
    .map(function (m) {
      return (
        '<div data-grow="' +
        (m[1] / 42) * 100 +
        '%"><b>' +
        m[1] +
        "</b><small>" +
        m[0] +
        "</small></div>"
      );
    })
    .join("");
  li("today", [
    ["9:00 AM · Venue walk-through, Palace", "Priya"],
    ["11:30 AM · Florist call, Petal & Bloom", "Divya"],
    ["2:00 PM · Menu tasting, Meera & Rohan", "Arjun"],
    ["5:30 PM · Sangeet rehearsal", "Sanjay"],
  ]);
  $("#pipe").innerHTML = [
    ["New enquiries", 11],
    ["Consultations", 8],
    ["Proposals sent", 6],
    ["Contracts signed", 16],
  ]
    .map(function (p) {
      return (
        '<div class="seat"><b style="font-size:30px">' +
        p[1] +
        "</b><br>" +
        p[0] +
        "</div>"
      );
    })
    .join("");
  li("alerts", [
    ["🔴 Invoice INV-1042 is 9 days overdue", tg("Overdue", "bad")],
    ["🟠 Caterer contract awaiting signature", tg("Pending", "wt")],
    ["🟢 Meera & Rohan finalised décor", tg("Done", "ok")],
    ["🔵 3 new enquiries from website", tg("New", "inf")],
  ]);
  var cl = [
    ["Aarthi & Karthik", "14 Feb 2027", "₹18L", "Planning"],
    ["Meera & Rohan", "28 Nov 2026", "₹12L", "Booked"],
    ["Sofia & James", "5 Jan 2027", "₹25L", "Booked"],
    ["Divya & Naveen", "20 Mar 2027", "₹9L", "Lead"],
    ["Fatima & Imran", "11 Dec 2026", "₹15L", "Planning"],
  ];
  function rcl() {
    var q = $("#cs").value.toLowerCase(),
      f = $("#cf").value;
    fill(
      "ct",
      cl
        .filter(function (c) {
          return (
            c[0].toLowerCase().indexOf(q) > -1 && (f == "All" || c[3] == f)
          );
        })
        .map(function (c) {
          return c
            .slice(0, 3)
            .concat([
              tg(c[3], c[3] == "Lead" ? "inf" : c[3] == "Booked" ? "ok" : "wt"),
              '<button class="btn sm" data-toast="Opening ' +
                c[0] +
                '">View</button>',
            ]);
        }),
    );
    $$("#ct [data-toast]").forEach(function (b) {
      b.onclick = function () {
        toast(b.dataset.toast);
      };
    });
  }
  $("#cs").oninput = rcl;
  $("#cf").onchange = rcl;
  rcl();
  $("#lf2").onsubmit = function (e) {
    e.preventDefault();
    cl.unshift([
      $("#ln").value,
      "To be set",
      "₹" + $("#lb").value + "L",
      "Lead",
    ]);
    e.target.reset();
    rcl();
    toast("Lead added");
  };
  var evd = {
      2: ["Site visit", "wt"],
      9: ["Tasting", "inf"],
      14: ["Site visit", "wt"],
      19: ["Wedding", "ok"],
      24: ["Tasting", "inf"],
      28: ["Wedding", "ok"],
    },
    c = $("#cal"),
    h = "";
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(function (d) {
    h += "<b>" + d + "</b>";
  });
  var st = new Date(2026, 9, 1).getDay();
  for (var i = 0; i < st; i++) h += '<div style="background:none"></div>';
  for (var d = 1; d <= 31; d++)
    h +=
      '<div class="' +
      (evd[d] ? "ev" : "") +
      (d == 12 ? " td" : "") +
      '">' +
      d +
      (evd[d] ? "<em>" + evd[d][0] + "</em>" : "") +
      "</div>";
  c.innerHTML = h;
  li("evs", [
    ["💒 Oct 19 · Sofia & James pre-wedding", "Palace"],
    ["🍽️ Oct 24 · Fatima & Imran tasting", "Studio"],
    ["💒 Oct 28 · Meera & Rohan reception", "Hall A"],
    ["🏰 Nov 2 · Aarthi & Karthik site visit", "Palace"],
  ]);
  $("#vav").innerHTML = [
    ["The Grand Palace", 70],
    ["Seaside Resort", 40],
    ["Garden Lawn", 85],
    ["Heritage Hall", 55],
  ]
    .map(function (v) {
      return (
        '<div class="wk"><span><b>' +
        v[0] +
        '</b><em style="font-style:normal">' +
        v[1] +
        '% booked</em></span><div class="bar"><i style="width:' +
        v[1] +
        '%"></i></div></div>'
      );
    })
    .join("");
  var vs = [
    ["Petal & Bloom", "Floral", "4.8", "Active"],
    ["Spice Route", "Catering", "4.7", "Active"],
    ["Candid Frames", "Photography", "4.9", "Active"],
    ["Raga Beats", "Music", "4.5", "Pending"],
    ["Glow Studio", "Makeup", "4.6", "Active"],
    ["Royal Rides", "Transport", "4.2", "Review"],
  ];
  fill(
    "vt",
    vs.map(function (v) {
      return [
        v[0],
        v[1],
        "⭐ " + v[2],
        tg(v[3], v[3] == "Active" ? "ok" : "wt"),
      ];
    }),
  );
  li("top", [
    ["🥇 Candid Frames", "4.9"],
    ["🥈 Petal & Bloom", "4.8"],
    ["🥉 Spice Route", "4.7"],
  ]);
  var iv = [
    ["INV-1040", "Meera & Rohan", "₹3,00,000", 1],
    ["INV-1041", "Sofia & James", "₹5,50,000", 1],
    ["INV-1042", "Aarthi & Karthik", "₹2,00,000", 0],
    ["INV-1043", "Fatima & Imran", "₹1,80,000", 0],
  ];
  function ri() {
    fill(
      "it",
      iv.map(function (v, i) {
        return [
          v[0],
          v[1],
          v[2],
          tg(v[3] ? "Paid" : "Pending", v[3] ? "ok" : "wt"),
          v[3]
            ? "—"
            : '<button class="btn sm" data-i="' + i + '">Mark paid</button>',
        ];
      }),
    );
  }
  ri();
  $("#it").onclick = function (e) {
    var i = e.target.dataset.i;
    if (i == null) return;
    iv[i][3] = 1;
    ri();
    toast("Invoice marked as paid");
  };
  var kn = {
      "To do": ["Confirm menu for Meera & Rohan", "Update venue contract"],
      "In progress": ["Design mandap for Aarthi", "Create seating charts"],
      Done: ["Send welcome kit", "Book photographer"],
    },
    ks = Object.keys(kn);
  function rk() {
    $("#kan").innerHTML = ks
      .map(function (k, ci) {
        return (
          '<div class="col"><h3>' +
          k +
          " (" +
          kn[k].length +
          ")</h3>" +
          kn[k]
            .map(function (t, i) {
              return (
                '<div class="tk">' +
                t +
                (ci < 2
                  ? '<br><button data-c="' +
                    ci +
                    '" data-i="' +
                    i +
                    '">Move forward</button>'
                  : "") +
                "</div>"
              );
            })
            .join("") +
          "</div>"
        );
      })
      .join("");
  }
  rk();
  $("#kan").onclick = function (e) {
    var c = e.target.dataset.c;
    if (c == null) return;
    kn[ks[+c + 1]].push(kn[ks[c]].splice(e.target.dataset.i, 1)[0]);
    rk();
    toast("Task moved");
  };
  $("#kf").onsubmit = function (e) {
    e.preventDefault();
    kn["To do"].unshift($("#kn").value);
    e.target.reset();
    rk();
  };
  $("#work").innerHTML = [
    ["Priya Nair", 85],
    ["Arjun Das", 60],
    ["Divya Raj", 72],
    ["Sanjay Kumar", 45],
  ]
    .map(function (w) {
      return (
        '<div class="wk"><span><b>' +
        w[0] +
        '</b><em style="font-style:normal">' +
        w[1] +
        '%</em></span><div class="bar"><i style="width:' +
        w[1] +
        '%"></i></div></div>'
      );
    })
    .join("");
  window.onMod = function (id) {
    if (id == "p-inv") ring(79);
  };
})();
