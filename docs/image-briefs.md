# Image briefs

Five photos that would lift the site the most. None is generated here: produce them (photo shoot or image model), export as **WebP** at the size below, drop the file at the target path and run `npm run build`. The code already points to these names: `vite.config.ts` lists `public/img` at build time and `src/data.ts` (`pick`) uses each new file, with its own alt text and caption, only if it exists. Missing files keep the current photo, so nothing breaks and there are no 404s. The footer credit of a replaced photo disappears on its own.

**Shared direction** (put it in every prompt):

- Realistic documentary photography, natural light, 35 mm or 50 mm lens, slight film grain, no HDR look, no lens flare effects added in post.
- Brazilian city, today: São Paulo / Curitiba / Belo Horizonte neighbourhoods (Pinheiros, Batel, Savassi feel). Real sidewalks, portuguese stone pavement, trees, low-rise buildings.
- Palette that sits on the site's signal orange `#ff7a1f`, blue-black `#050f16` and off-white `#f1f2ee`: neutral greys and concrete, one warm orange note in the frame, deep shadows. No saturated blues or purples.
- When the bike shows: an **unbranded** minimal urban e-bike, matte graphite frame `#34444d`, battery integrated in a thick down tube, black carbon belt instead of a chain, rear hub motor, 700c wheels with black mudguards, black saddle and grips. No logos, no text, no brand marks anywhere (the brand is fictional).
- People are anonymous: cropped, from behind or in silhouette. No recognisable faces, no real shop signs.

| # | File (target) | Ratio / export | Where it goes | Replaces |
| --- | --- | --- | --- | --- |
| 1 | `public/img/leve-escada.webp` | 8:5, 2000 × 1250 | Chapter 1, "Nove quilos de bicicleta" | `escada-rampa.jpg` |
| 2 | `public/img/motor-rua.webp` | 8:5, 2000 × 1250 | Chapter 2, "Um motor que não se anuncia" | `faixa-amarela.jpg` |
| 3 | `public/img/bateria-cozinha.webp` | 8:5, 2000 × 1250 | Chapter 3, "Uma semana de trajeto numa carga" | `orla-ponte.jpg` |
| 4 | `public/img/correia-barra.webp` | 8:5, 2000 × 1250 | Chapter 4, "Sem corrente, sem graxa na calça" | `ciclovia.jpg` |
| 5 | `public/img/test-ride-entardecer.webp` | 3:2, 2400 × 1600 | Test-ride background (full bleed, text on the right half) | `ciclista-entardecer.jpg` |

Keep each file under ~250 KB (WebP quality 72–78). The chapter photos are shown at up to ~700 px wide on desktop; the test-ride one is full width, darkened to 60 % brightness with text over its right half, so keep the subject on the left third.

## 1. `leve-escada.webp`: carrying it upstairs

The point of the chapter: 9,4 kg, the third floor without a lift.

> Realistic documentary photograph, 8:5 landscape. A person climbs the narrow stairwell of an older residential building in São Paulo, carrying a minimal unbranded electric city bike on one shoulder with ease, seen from behind and slightly below, face not visible. Matte graphite frame with a thick down tube that hides the battery, black belt drive, black mudguards. Worn terrazzo steps, a painted handrail, afternoon light coming through a small window and falling in a warm orange patch on the wall. Neutral greys and concrete tones, deep soft shadows, 35 mm lens, natural grain. No logos, no text, no brand marks.

## 2. `motor-rua.webp`: a quiet street at seven in the morning

The motor that "doesn't announce itself": calm, silence, low sun.

> Realistic documentary photograph, 8:5 landscape. A lone cyclist rides away from the camera down an empty tree-lined residential street in Pinheiros, São Paulo, at seven in the morning. Low warm orange sun from the end of the street, long shadows across Portuguese stone sidewalks, parked cars out of focus, a thin layer of morning haze. The bike is a minimal unbranded matte graphite electric city bike with black mudguards. Rider in plain office clothes, no helmet logo, face not visible. Quiet, still mood, 50 mm lens, shallow depth of field, natural grain. No logos, no readable signs, no text.

## 3. `bateria-cozinha.webp`: charging on the kitchen counter

The battery leaves the frame and charges from an ordinary outlet.

> Realistic still-life photograph, 8:5 landscape. A removable electric-bike battery, a long slim matte graphite cylinder-like block with a small charge-level light glowing, lies on a light grey stone kitchen counter in a Brazilian apartment, plugged into a white wall outlet by a plain black charger. Beside it a coffee cup and a set of keys on an orange key ring. Soft morning window light from the left, white tiles, everything tidy and real. Neutral off-white and grey palette with the single orange accent of the key ring, 50 mm lens, natural grain. No logos, no text, no brand marks.

## 4. `correia-barra.webp`: clean trouser hem

Belt instead of chain: no grease on your trousers.

> Realistic close-up photograph, 8:5 landscape. Low angle at pedal height: the clean cuff of light beige chino trousers and a leather shoe resting on the pedal of a minimal unbranded matte graphite electric bike, right next to the black carbon drive belt and a large dark front sprocket. Everything spotless, no grease anywhere. Background is a softly blurred city bike lane with orange late-afternoon light. Shallow depth of field, focus on the belt and the trouser hem, natural grain. No logos, no text, no brand marks.

## 5. `test-ride-entardecer.webp`: the ride home at dusk

The site's last image, behind the test-ride form: it has to carry the feeling.

> Realistic documentary photograph, 3:2 landscape, wide. A cyclist on a minimal unbranded matte graphite electric city bike rides along a protected bike lane on a wide avenue in São Paulo at dusk, seen from the side, small in the left third of the frame, face not visible. The sky behind the low skyline glows deep orange fading to blue-black, the first street lights are on, light trails of traffic blurred in the background. The right two thirds are calm, darker sky and road with room for text. Cinematic but real, 35 mm lens, natural grain. No logos, no readable signs, no text.
