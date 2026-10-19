# YMF Spanish — App (PWA)

App instalable de los ejercicios de Your Mexican Friend. Funciona en Android y iPhone desde el navegador, sin tiendas.

## Qué incluye
- **Inicio** con progreso general, botón "Continue" y los 4 niveles (A1–B2)
- **Explore** con buscador y filtros por nivel y categoría (los 59 ejercicios del índice)
- **Progress** con avance por nivel, favoritos y links de YMF
- Visor de ejercicio con botón **Mark done** y **★ favorito**
- **Modo offline**: los ejercicios marcados "● Offline" funcionan sin internet. Los demás se abren desde GitHub Pages ("○ Online")

## Estructura
```
index.html            → la app (pantallas y estilos)
app.js                → navegación, progreso, favoritos, instalación
data.js               → catálogo de ejercicios (nivel, categoría, link)
sw.js                 → service worker (modo offline)
manifest.webmanifest  → nombre, colores e íconos de la app
icons/                → íconos
ejercicios/<repo>/index.html → ejercicios copiados dentro de la app
```

## Publicar en GitHub Pages
1. En GitHub crea un repo nuevo, por ejemplo `ymf-app` (público).
2. **Add file → Upload files** y arrastra TODO el contenido de esta carpeta (no la carpeta, su contenido).
3. **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
4. En 1–2 minutos queda en `https://carlosalbertoramirez.github.io/ymf-app/`.

## Instalar en el cel
- **Android (Chrome):** abre el link → aparece "Install the app" → Install.
- **iPhone (Safari):** abre el link → Compartir → **Agregar a pantalla de inicio**.

## Agregar un ejercicio para que funcione offline
1. Copia su HTML a `ejercicios/<nombre-del-repo>/index.html`.
2. En `data.js`, busca ese ejercicio y agrégale:
   `"local": "ejercicios/<nombre-del-repo>/index.html"`
3. En `sw.js` sube la versión: `const VERSION = 'ymf-v3';` (v4, v5… cada vez que cambies algo).
4. Sube los cambios a GitHub.

## Agregar un ejercicio nuevo al catálogo
En `data.js` agrega un bloque dentro de `EXERCISES`:
```js
{
 "id": "mi-ejercicio",
 "name": "Nombre del ejercicio",
 "level": "A2",
 "cat": "Grammar",
 "url": "https://carlosalbertoramirez.github.io/mi-ejercicio/"
},
```
Categorías válidas: Grammar, Tenses, Vocabulary, Pronouns, Reading, Culture, Test.
