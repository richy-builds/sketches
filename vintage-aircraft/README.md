# A Field Guide to Vintage Aircraft

Five aircraft, 1903 to 1943, presented as engineering drawing plates. Every illustration on the page is hand-authored inline SVG: side profiles in livery, three-view line drawings to scale, and one detail diagram per aircraft.

Built to show what Claude Fable 5.1 produces when asked to draw. No image models, no drawing libraries, no build step.

## The plates

1. Wright Flyer, 1903. Detail: wing warping.
2. Sopwith F.1 Camel, 1916. Detail: the Clerget rotary engine.
3. Douglas DC-3, 1935. Detail: retractable undercarriage.
4. Supermarine Spitfire Mk I, 1936. Detail: the elliptical wing.
5. Lockheed L-049 Constellation, 1943. Detail: the triple tail.

A cover lineup shows all five in side view at one scale, and a closing spread overlays their plan views and charts maximum speed against first flight.

## View it

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Layout

```
index.html        all markup and inline SVG
css/styles.css    tokens, Paper and Blueprint themes, plate frame, motion
js/main.js        theme toggle, draw-on-scroll, shape counter
```

## Themes

Paper is a diazo whiteprint: vellum ground, indigo line, red-pencil accent. Blueprint is a cyanotype: Prussian blue ground, white line, amber accent. The page follows the system setting and the toggle in the top bar overrides it.
