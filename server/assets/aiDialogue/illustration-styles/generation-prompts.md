# Точные промпты генерации

Инструмент: встроенный image_gen. Дата: 2026-10-26.
Во всех вызовах transparent_background=false.
Первый вызов без референсов; второй и третий используют realism.png как edit target.
PNG-исходники теперь находятся в originals/. Файлы для R2 — WebP, полученные из них
через sharp с quality=90, effort=6, без изменения размеров и композиции.

## realism

```text
Use case: photorealistic-natural.
Asset type: square style reference and style-selector thumbnail for an adult language-practice dialogue app.
Primary request: Create ONE square 1:1 photorealistic editorial photograph, ideally 1024x1024. Two adults in a friendly natural face-to-face conversation across a small wooden hotel reception counter. A female traveler with dark curly shoulder-length hair wearing a rust-orange knit sweater and a small dark backpack stands on the left. A female receptionist with light brown hair neatly tied back wearing a muted blue blouse stands behind the counter on the right. They are about 30 years old. Both faces in clear three-quarter profile, looking at each other, with natural restrained friendly expressions. Waist-up medium framing. Their hands rest naturally on their own side of the counter. A small potted plant and a closed plain notebook on the counter. Background: an inviting understated reception lobby with a window providing soft daylight, a bookshelf, and indoor greenery, balanced neutral warmth. Rich but natural colors; blue and rust clothing easily readable at thumbnail size.
Style/medium: convincingly real candid professional lifestyle photography, natural skin pores, subtle facial variation, authentic curls and loose hair strands, fabric weave, wood grain, physically believable diffuse lighting, realistic anatomy, moderate depth of field and lens perspective around 50mm. The scene must look like a real photograph, not a painting, CGI, illustration, or glossy fashion ad.
Composition/framing: square edge-to-edge composition, both complete heads visible with headroom, both people equally important and occupying most of the square, keep their faces large enough for small previews, counter in the lower third, eye-level side view.
Constraints: only these two adults, contemporary ordinary setting, no romance, no speech bubbles, no labels, no legible writing, no logos, no signage, no UI, no frame, no watermark. Produce a single standalone image, not a collage. This is the baseline composition to be rendered later in two other media.
```

## drawing

```text
Use case: style-transfer.
Asset type: square illustration style reference and style-selector thumbnail for an adult language-practice dialogue app.
Input Image 1: edit target, a photorealistic square hotel reception scene. Preserve its composition, character identities, clothing colors, pose, facial expressions, gaze, framing, counter, notebook, plant, window, background furniture and lighting direction. Render exactly this same scene in a distinctly hand-drawn editorial illustration style.
Style/medium: polished modern editorial drawing with a subtle graphic-novel influence. Visible clean expressive ink outlines, simplified but anatomically realistic adult faces and shapes, gently shaded cel-like shadow planes, restrained colored-pencil grain on color fills, clear edges, calm warm balanced colors. Rust-orange sweater on the dark curly-haired traveler on the left and muted blue blouse on the receptionist on the right. Keep the faces large, recognizable and expressive at thumbnail size. Draw the whole scene, including the background, in this consistent medium. Visibly drawn linework and designed flat color areas must clearly distinguish this from a photograph and from watercolor.
Constraints: preserve the same two adults and scene geometry; complete heads with headroom; square 1:1 edge-to-edge artwork, ideally 1024x1024. This is an illustration for adults, with natural proportions. No photorealistic textures, no photographic blur, no oil painting, no watercolor bleeding or paper-white vignette, no anime, no caricature, no 3D. No text, labels, logo, signage, UI, frame, speech bubbles or watermark. Produce ONE standalone image.
```

## watercolor

```text
Use case: style-transfer.
Asset type: square watercolor style reference and style-selector thumbnail for an adult language-practice dialogue app.
Input Image 1: edit target, the photorealistic square hotel reception scene. Change the artistic medium only. Preserve its overall composition, same two adult character identities, their natural face-to-face gaze, poses and expressions, clothing colors, counter, closed notebook, plant, window, furniture and light direction.
Style/medium: unmistakably traditional transparent watercolor painting on fine textured cold-pressed paper. Fluid translucent washes, soft wet-on-wet pigment blooms, delicate granulation, layered warm and cool washes, a few crisp brush accents for readable eyes and smiles, organically softened and lost edges in the background, subtle paper grain visible through the painting. Natural adult proportions. Minimal faint pencil underdrawing only; no bold ink contours. Rust-orange sweater on the dark curly-haired traveler on the left; muted blue blouse on the receptionist on the right. Warm wood, daylight and greenery. Keep faces readable and recognizable at thumbnail size, while simplifying clothing and environment into painterly washes. The whole picture must look physically painted with water and pigment; avoid photograph-like microdetail. Watercolor must be visibly distinct from both photography and ink editorial drawing.
Composition/framing: same square 1:1 scene and viewpoint as the reference, ideally 1024x1024. Both complete heads visible with headroom. Paint edge-to-edge across the entire square; no paper border or white vignette.
Constraints: exactly two adults; do not add people or objects. No photographic skin or blur, no oil or acrylic impasto, no cel shading, no heavy black outlines, no comic or anime, no 3D. No text, labels, logo, signage, UI, frame, speech bubbles or watermark. ONE standalone image.
```

