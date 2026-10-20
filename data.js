// ===== SUSCRIPCIÓN POR CORREO =====
// Pega aquí el "enlace prellenado" de tu Google Form (ver README, sección Suscripción).
// Mientras esté vacío, la opción de suscribirse no aparece en la app.
const SUBSCRIBE_FORM_LINK = '';

// Catálogo generado desde Index-septiembre. "local" = incluido en la app (funciona sin internet).
const EXERCISES = [
 {
  "id": "presente-vs-pasado-a1",
  "name": "Present Simple & Simple Past",
  "level": "A1",
  "cat": "Tenses",
  "url": "https://carlosalbertoramirez.github.io/presente-vs-pasado-a1/",
  "local": "ejercicios/presente-vs-pasado-a1/index.html"
 },
 {
  "id": "posesivos",
  "name": "Posesivos",
  "level": "A1",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/Posesivos/",
  "local": "ejercicios/Posesivos/index.html"
 },
 {
  "id": "reflexivos",
  "name": "Verbos Reflexivos — Me, te, se...",
  "level": "A1",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/reflexivos-/",
  "local": "ejercicios/reflexivos-/index.html"
 },
 {
  "id": "preposiciones-lugar",
  "name": "Preposiciones de Lugar",
  "level": "A1",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/preposiciones-lugar/",
  "local": "ejercicios/preposiciones-lugar/index.html"
 },
 {
  "id": "profesiones",
  "name": "Profesiones",
  "level": "A1",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/Profesiones/",
  "local": "ejercicios/Profesiones/index.html"
 },
 {
  "id": "vocab-casa",
  "name": "Vocabulario Casa",
  "level": "A1",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/vocab-casa-/",
  "local": "ejercicios/vocab-casa-/index.html"
 },
 {
  "id": "objetos-de-la-casa-a0-ni-os",
  "name": "Vocab Casa — Niños",
  "level": "A1",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/objetos-de-la-casa-A0-ni-os-/",
  "local": "ejercicios/objetos-de-la-casa-A0-ni-os-/index.html"
 },
 {
  "id": "vocabulario-casa-bien",
  "name": "Vocab Hogar",
  "level": "A1",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/Vocabulario-Casa-bien/",
  "local": "ejercicios/Vocabulario-Casa-bien/index.html"
 },
 {
  "id": "partes-del-cuerpo",
  "name": "Partes del Cuerpo",
  "level": "A1",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/Partes-del-cuerpo-/",
  "local": "ejercicios/Partes-del-cuerpo-/index.html"
 },
 {
  "id": "vocabulario-mexicano-bien",
  "name": "Vocabulario Mexicano 🇲🇽",
  "level": "A1",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/vocabulario-mexicano-bien/",
  "local": "ejercicios/vocabulario-mexicano-bien/index.html"
 },
 {
  "id": "alimentos-bebida",
  "name": "Alimentos y Bebidas — Lo básico",
  "level": "A1",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/Alimentos-bebida-/"
 },
 {
  "id": "espa-ol-b-sico-p",
  "name": "Español Básico — Primeras palabras",
  "level": "A1",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/Espa-ol-b-sico-p-/"
 },
 {
  "id": "saludos-b-sicos",
  "name": "Saludos y Presentaciones",
  "level": "A1",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/Saludos-b-sicos/",
  "local": "ejercicios/Saludos-b-sicos/index.html"
 },
 {
  "id": "situaciones-cotidianas-b-sicas",
  "name": "Situaciones Cotidianas — La vida real",
  "level": "A1",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/situaciones-cotidianas-b-sicas/",
  "local": "ejercicios/situaciones-cotidianas-b-sicas/index.html"
 },
 {
  "id": "vocabulario-mexicano-bien-culture",
  "name": "Vocabulario Mexicano — Cultura",
  "level": "A1",
  "cat": "Culture",
  "url": "https://carlosalbertoramirez.github.io/vocabulario-mexicano-bien/",
  "local": "ejercicios/vocabulario-mexicano-bien/index.html"
 },
 {
  "id": "test-general-a1",
  "name": "Test General A1 — ¿Cuánto sabes?",
  "level": "A1",
  "cat": "Test",
  "url": "https://carlosalbertoramirez.github.io/Test-general-A1/",
  "local": "ejercicios/Test-general-A1/index.html"
 },
 {
  "id": "irregular-verbs-practice",
  "name": "Verbos Irregulares — 3 tiempos",
  "level": "A2",
  "cat": "Tenses",
  "url": "https://carlosalbertoramirez.github.io/irregular-verbs-practice/?v=2",
  "local": "ejercicios/irregular-verbs-practice/index.html"
 },
 {
  "id": "irregulares-presente",
  "name": "Irregulares Presente",
  "level": "A2",
  "cat": "Tenses",
  "url": "https://carlosalbertoramirez.github.io/irregulares-presente-/",
  "local": "ejercicios/irregulares-presente-/index.html"
 },
 {
  "id": "irregulares-pasado",
  "name": "Irregulares Pasado",
  "level": "A2",
  "cat": "Tenses",
  "url": "https://carlosalbertoramirez.github.io/irregulares-pasado/",
  "local": "ejercicios/irregulares-pasado/index.html"
 },
 {
  "id": "review-tenses-a2",
  "name": "Review de Tiempos Verbales",
  "level": "A2",
  "cat": "Tenses",
  "url": "https://carlosalbertoramirez.github.io/review-tenses-a2/",
  "local": "ejercicios/review-tenses-a2/index.html"
 },
 {
  "id": "preterito-vs-imperfecto-2.0",
  "name": "Pretérito vs Imperfecto — Round 2",
  "level": "A2",
  "cat": "Tenses",
  "url": "https://carlosalbertoramirez.github.io/preterito-vs-imperfecto-2.0/",
  "local": "ejercicios/preterito-vs-imperfecto-2.0/index.html"
 },
 {
  "id": "futuros-vs-condicionales",
  "name": "Futuro vs Condicional — ¿Cuál usar?",
  "level": "A2",
  "cat": "Tenses",
  "url": "https://carlosalbertoramirez.github.io/Futuros-vs-Condicionales-/",
  "local": "ejercicios/Futuros-vs-Condicionales-/index.html"
 },
 {
  "id": "g-nero-y-n-mero-y-art-culos",
  "name": "Género y Artículos",
  "level": "A2",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/G-nero-y-N-mero-y-art-culos/",
  "local": "ejercicios/G-nero-y-N-mero-y-art-culos/index.html"
 },
 {
  "id": "demostrativos",
  "name": "Demostrativos",
  "level": "A2",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/Demostrativos/",
  "local": "ejercicios/Demostrativos/index.html"
 },
 {
  "id": "comparativos-y-superlativos-bien",
  "name": "Comparativos y Superlativos",
  "level": "A2",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/comparativos-y-superlativos-bien-/",
  "local": "ejercicios/comparativos-y-superlativos-bien-/index.html"
 },
 {
  "id": "por-vs-para",
  "name": "Por vs Para",
  "level": "A2",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/por-vs-para-/",
  "local": "ejercicios/por-vs-para-/index.html"
 },
 {
  "id": "verbos-afectivos",
  "name": "Verbos Afectivos (Gustar y similares)",
  "level": "A2",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/Verbos-afectivos/",
  "local": "ejercicios/Verbos-afectivos/index.html"
 },
 {
  "id": "ser-vs-estar-multiple-task",
  "name": "Ser vs Estar — Práctica Extra",
  "level": "A2",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/Ser-vs-estar-multiple-task/",
  "local": "ejercicios/Ser-vs-estar-multiple-task/index.html"
 },
 {
  "id": "subjuntivo-a2-b1",
  "name": "Subjuntivo Básico",
  "level": "A2",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/subjuntivo-a2-b1/",
  "local": "ejercicios/subjuntivo-a2-b1/index.html"
 },
 {
  "id": "od-oi",
  "name": "Objetos Directo e Indirecto",
  "level": "A2",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/OD-OI-/",
  "local": "ejercicios/OD-OI-/index.html"
 },
 {
  "id": "sinonimos-y-antonimos",
  "name": "Sinónimos y Antónimos",
  "level": "A2",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/Sinonimos-y-antonimos/",
  "local": "ejercicios/Sinonimos-y-antonimos/index.html"
 },
 {
  "id": "adjetivos-apariencia-personalidad",
  "name": "Adjetivos — Apariencia y Personalidad",
  "level": "A2",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/adjetivos-apariencia-personalidad/",
  "local": "ejercicios/adjetivos-apariencia-personalidad/index.html"
 },
 {
  "id": "adjetivos",
  "name": "Adjetivos",
  "level": "A2",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/Adjetivos/",
  "local": "ejercicios/Adjetivos/index.html"
 },
 {
  "id": "clima",
  "name": "El Clima — Habla del tiempo",
  "level": "A2",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/Clima/",
  "local": "ejercicios/Clima/index.html"
 },
 {
  "id": "vocab-casa-intermedio",
  "name": "Vocabulario del Hogar — Intermedio",
  "level": "A2",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/vocab-casa-intermedio-/",
  "local": "ejercicios/vocab-casa-intermedio-/index.html"
 },
 {
  "id": "lectura-a1-a2",
  "name": "Lectura — Comprensión A1–A2",
  "level": "A2",
  "cat": "Reading",
  "url": "https://carlosalbertoramirez.github.io/Lectura-A1-A2/",
  "local": "ejercicios/Lectura-A1-A2/index.html"
 },
 {
  "id": "cultura-mexicana",
  "name": "Cultura Mexicana — Vocab y Tradiciones",
  "level": "A2",
  "cat": "Culture",
  "url": "https://carlosalbertoramirez.github.io/Cultura-mexicana/",
  "local": "ejercicios/Cultura-mexicana/index.html"
 },
 {
  "id": "test-a2-general",
  "name": "Test General A2 — Ponlo a prueba",
  "level": "A2",
  "cat": "Test",
  "url": "https://carlosalbertoramirez.github.io/Test-A2-General/",
  "local": "ejercicios/Test-A2-General/index.html"
 },
 {
  "id": "conectores",
  "name": "Conectores del Discurso",
  "level": "B1",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/Conectores/",
  "local": "ejercicios/Conectores/index.html"
 },
 {
  "id": "ser-vs-estar",
  "name": "Ser vs Estar",
  "level": "B1",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/ser-vs-estar/",
  "local": "ejercicios/ser-vs-estar/index.html"
 },
 {
  "id": "ser-vs-estar-preterito-vs-imperfecto",
  "name": "Ser/Estar · Pretérito vs Imperfecto",
  "level": "B1",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/Ser-vs-estar-preterito-vs-imperfecto-/",
  "local": "ejercicios/Ser-vs-estar-preterito-vs-imperfecto-/index.html"
 },
 {
  "id": "ser-vs-estar-avanzado",
  "name": "Ser vs Estar — Avanzado",
  "level": "B1",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/Ser-vs-estar-avanzado/",
  "local": "ejercicios/Ser-vs-estar-avanzado/index.html"
 },
 {
  "id": "subjuntivo-vs-infinitivo-fill-in-blanks",
  "name": "Subjuntivo vs Indicativo vs Infinitivo",
  "level": "B1",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/Subjuntivo-vs-infinitivo-fill-in-blanks/",
  "local": "ejercicios/Subjuntivo-vs-infinitivo-fill-in-blanks/index.html"
 },
 {
  "id": "tener-vs-hacer",
  "name": "Tener vs Hacer — Expresiones clave",
  "level": "B1",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/Tener-vs-Hacer/",
  "local": "ejercicios/Tener-vs-Hacer/index.html"
 },
 {
  "id": "pronombres-bien",
  "name": "Pronombres OD/OI — Nivel Completo",
  "level": "B1",
  "cat": "Pronouns",
  "url": "https://carlosalbertoramirez.github.io/PRONOMBRES-BIEN-/",
  "local": "ejercicios/PRONOMBRES-BIEN-/index.html"
 },
 {
  "id": "pronombre-avanzados",
  "name": "Pronombres Avanzados",
  "level": "B1",
  "cat": "Pronouns",
  "url": "https://carlosalbertoramirez.github.io/pronombre-avanzados/",
  "local": "ejercicios/pronombre-avanzados/index.html"
 },
 {
  "id": "objetos-directo-e-indirecto-multiple-task",
  "name": "OD/OI — Multiple Task",
  "level": "B1",
  "cat": "Pronouns",
  "url": "https://carlosalbertoramirez.github.io/objetos-directo-e-indirecto-multiple-task/",
  "local": "ejercicios/objetos-directo-e-indirecto-multiple-task/index.html"
 },
 {
  "id": "imperativos",
  "name": "Imperativo",
  "level": "B1",
  "cat": "Tenses",
  "url": "https://carlosalbertoramirez.github.io/imperativos/",
  "local": "ejercicios/imperativos/index.html"
 },
 {
  "id": "reto-pasados",
  "name": "Reto: Tiempos del Pasado",
  "level": "B1",
  "cat": "Tenses",
  "url": "https://carlosalbertoramirez.github.io/Reto-pasados/",
  "local": "ejercicios/Reto-pasados/index.html"
 },
 {
  "id": "direcciones-muy-completo",
  "name": "Direcciones Avanzadas",
  "level": "B1",
  "cat": "Vocabulary",
  "url": "https://carlosalbertoramirez.github.io/Direcciones-muy-completo/",
  "local": "ejercicios/Direcciones-muy-completo/index.html"
 },
 {
  "id": "lectura-b1",
  "name": "Lectura B1 — Textos reales",
  "level": "B1",
  "cat": "Reading",
  "url": "https://carlosalbertoramirez.github.io/lectura-b1/",
  "local": "ejercicios/lectura-b1/index.html"
 },
 {
  "id": "lectura-comprension-b1",
  "name": "Comprensión de Lectura B1",
  "level": "B1",
  "cat": "Reading",
  "url": "https://carlosalbertoramirez.github.io/lectura-comprension-b1/",
  "local": "ejercicios/lectura-comprension-b1/index.html"
 },
 {
  "id": "m-xican-slang",
  "name": "Mexican Slang 🌮 — Habla como chilango",
  "level": "B1",
  "cat": "Culture",
  "url": "https://carlosalbertoramirez.github.io/M-xican-slang-/",
  "local": "ejercicios/M-xican-slang-/index.html"
 },
 {
  "id": "test-general-b1",
  "name": "Test General B1 — ¿Listo para el examen?",
  "level": "B1",
  "cat": "Test",
  "url": "https://carlosalbertoramirez.github.io/Test-General-B1/",
  "local": "ejercicios/Test-General-B1/index.html"
 },
 {
  "id": "subjuntivo-avanzado-bien",
  "name": "Subjuntivo Avanzado",
  "level": "B2",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/subjuntivo-avanzado-bien/",
  "local": "ejercicios/subjuntivo-avanzado-bien/index.html"
 },
 {
  "id": "subjuntivo-blanks-b2",
  "name": "Subjuntivo — Repaso (Blanks)",
  "level": "B2",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/subjuntivo-blanks-b2/",
  "local": "ejercicios/subjuntivo-blanks-b2/index.html"
 },
 {
  "id": "todos-subjuntivos",
  "name": "Subjuntivo — Repaso Completo",
  "level": "B2",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/Todos-subjuntivos/",
  "local": "ejercicios/Todos-subjuntivos/index.html"
 },
 {
  "id": "los-tipos-de-condicionales",
  "name": "Los Tipos de Condicionales",
  "level": "B2",
  "cat": "Grammar",
  "url": "https://carlosalbertoramirez.github.io/Los-tipos-de-condicionales-/",
  "local": "ejercicios/Los-tipos-de-condicionales-/index.html"
 },
 {
  "id": "acentos",
  "name": "Acentos y Tildes — Escríbelo bien",
  "level": "B2",
  "cat": "Tenses",
  "url": "https://carlosalbertoramirez.github.io/Acentos-/",
  "local": "ejercicios/Acentos-/index.html"
 }
];
const TOOLS = [
 {
  "id": "conjugador",
  "name": "Conjugador de Verbos",
  "desc": "Escribe cualquier verbo y ve todas sus conjugaciones.",
  "url": "https://carlosalbertoramirez.github.io/Conjudaror-/",
  "icon": "⚡"
 },
 {
  "id": "verbos-esenciales",
  "name": "Verbos Esenciales",
  "desc": "Los 100 verbos más importantes, con tarjetas y quiz.",
  "url": "https://carlosalbertoramirez.github.io/Verbos-escenciales-/",
  "icon": "🗂️"
 }
];
