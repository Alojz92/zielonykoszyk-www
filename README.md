# Zielony Koszyk — strona hurtowni owocowo-warzywnej B2B

Jednostronicowa witryna fikcyjnej hurtowni spożywczo-owocowo-warzywnej, zbudowana jako
"strona jest przedmiotem": każda sekcja to kolejny drukowany kwit (karta z paskiem,
paragon z ząbkowanym brzegiem, kupion wycięty do wyrwania, lista jak z cennika).

## Uruchomienie lokalnie

Dowolny statyczny serwer, np. `npx serve .` albo `python3 -m http.server`, i otwórz
`http://localhost:8000`. Strona nie wymaga backendu; formularz kontaktowy składa
zapytanie przez `mailto:`.

## Deploy (Coolify na VPS)

Obraz buduje się z `Dockerfile` (nginx:stable-alpine, pliki kopiowane do
`/usr/share/nginx/html`). Aplikacja w Coolify: build pack `dockerfile`, port 80,
Fqdn ustawiony na `zielonykoszyk.<ip-vps>.sslip.io`.

## Struktura

- `index.html` — wszystkie sekcje strony
- `styles.css` — style, paleta burgund/bubblegum, typ Besley + Libre Franklin
- `app.js` — crossfade hero, zakładki asortymentu, reveal-on-scroll, mailto, sceny
- `assets/` — zdjęcia (licencje i autorzy w stopce strony oraz w `assets/credits.json`)
- `assets/scenes/` — silnik scen scroll (taste-skill stage.js + raster-cut + scroll-turned-drum)
- `docs/BENCHMARK.md` — benchmark konkurencji (Bukat, Transgourmet, MAKRO, Eurocash, Bidfood, Selgros, Sysco) i wnioski

Sceny scroll wymagają CDN (GSAP 3.15.0, Lenis 1.3.26, jsdelivr). Bez dostępu do sieci
strona pokazuje kompozycję końcową sekcji bez animacji scen.
