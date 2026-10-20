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

## Suscripción por correo (opcional)
Los correos llegan a un Google Form y se guardan en una hoja de Google Sheets.

1. Entra a https://forms.google.com con tu cuenta de Gmail → **Formulario en blanco**.
2. Título: `YMF Spanish — Suscriptores`.
3. Agrega una pregunta de **Respuesta corta** llamada `Email`.
   En **Configuración → Respuestas**, deja **apagado** "Recopilar direcciones de correo" y "Limitar a 1 respuesta" (si no, Google pide iniciar sesión y el envío desde la app falla).
4. Arriba, pestaña **Respuestas** → **Vincular con Hojas de cálculo** (ahí verás los correos).
5. Menú **⋮** (tres puntos) → **Obtener enlace prellenado**.
6. En la pregunta Email escribe `test` → **Obtener enlace** → **Copiar enlace**.
7. En `data.js`, pega ese enlace entre las comillas de la primera línea:
   `const SUBSCRIBE_FORM_LINK = 'https://docs.google.com/forms/d/e/.../viewform?usp=pp_url&entry.123456=test';`
8. En `sw.js` sube la versión (`ymf-v7`, etc.) y sube los cambios.

Mientras `SUBSCRIBE_FORM_LINK` esté vacío, la opción de suscribirse no aparece en la app.
Para dar de baja a alguien, borra su fila en la hoja de cálculo.
