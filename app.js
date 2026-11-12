// Zielony Koszyk, one-page site: hero crossfade, showcase tabs, reveals, coupon mailto, scenes.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // hero crossfade: the room's light shifts between three photographs
  var slides = Array.prototype.slice.call(document.querySelectorAll('.xfade'));
  if (slides.length > 1 && !reduced) {
    var cur = 0, timer = null;
    var step = function () {
      slides[cur].classList.remove('is-on');
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add('is-on');
    };
    var start = function () { if (!timer) timer = setInterval(step, 5600); };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
    start();
  }

  // showcase tabs: each category swaps the plate photograph, title and note
  var DATA = {
    warzywa: {
      img: 'assets/onions-peppers-and-potatoes.jpg',
      alt: 'Cebula, papryka i ziemniaki',
      title: 'Warzywa z pola, nie z plastiku',
      desc: 'Ziemniaki, marchew, cebula i kapusta prosto od producentów. Stałe ceny tygodniowe i dostawa codziennie rano.'
    },
    owoce: {
      img: 'assets/apfelkiste.jpg',
      alt: 'Skrzynka jabłek prosto z sadu',
      title: 'Owoce, które dojrzały na słońcu',
      desc: 'Jabłka spod Grójca, gruszki i śliwki sezonowe. Zamawiasz skrzynkę, paletę albo całą ciężarówkę.'
    },
    ziola: {
      img: 'assets/freshly-picked-herbs-held-high-against-a.jpg',
      alt: 'Świeżo zerwane zioła na tle zielonego pola',
      title: 'Zioła cięte tego samego ranka',
      desc: 'Bazylia, pietruszka, koper i mięta w doniczkach oraz pęczkach. Pakowane nocą, na półce o świcie.'
    }
  };
  var img = document.getElementById('show-img');
  var title = document.getElementById('show-t');
  var desc = document.getElementById('show-desc');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      var d = DATA[tab.dataset.key];
      if (!d) return;
      img.src = d.img;
      img.alt = d.alt;
      title.textContent = d.title;
      desc.textContent = d.desc;
    });
  });

  // scroll reveals: each section's parts rise once as it enters
  if ('IntersectionObserver' in window && !reduced) {
    document.documentElement.classList.add('reveal-on');
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function (s) { io.observe(s); });
  }

  // coupon: compose the mailto order slip from the four fields
  var form = document.getElementById('coupon-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ''; };
      var firma = v('firma') || 'bez nazwy firmy';
      var body = 'Zapytanie o ofertę od: ' + (v('name') || '-') + '\n'
        + 'Firma: ' + firma + '\n'
        + 'Telefon: ' + (v('tel') || '-') + '\n'
        + 'E-mail: ' + (v('email') || '-') + '\n\n'
        + 'Prosimy o wycenę pierwszego tygodnia dostaw.';
      window.location.href = 'mailto:oferta@zielonykoszyk.pl?subject='
        + encodeURIComponent('Zapytanie o ofertę, ' + firma)
        + '&body=' + encodeURIComponent(body);
    });
  }

  // scroll scenes (GSAP stage); without the CDN they rest in their finished composition
  if (window.Stage) {
    Stage.smooth();
    Stage.init();
  }
})();
