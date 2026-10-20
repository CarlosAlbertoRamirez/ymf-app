# YMF Spanish → Google Play: pasos en orden

## 0. Antes de empezar
- [ ] **Enforce HTTPS** activado en GitHub → ymf-app → Settings → Pages
- [ ] Subir la versión nueva de la app (`ymf-app.zip`), que trae la política de privacidad y el archivo `.nojekyll`
- [ ] Revisar que abra: https://app.yourmexicanfriend.com/privacy.html

## 1. Cuenta de desarrollador (~25 USD, pago único)
- [ ] Entra a https://play.google.com/console y elige cuenta **Personal**
- [ ] Ten a la mano tu **INE** y una **tarjeta a tu nombre** (debes ser mayor de 18)
- [ ] Paga y espera la verificación de identidad (1–3 días)
- [ ] Instala la app **Play Console** en tu Android y verifica el dispositivo (Google lo pide en cuentas personales nuevas)

## 2. Generar el paquete Android (gratis)
- [ ] Entra a https://www.pwabuilder.com y pega `https://app.yourmexicanfriend.com`
- [ ] **Package for stores → Android → Generate package**
- [ ] Package ID: `com.yourmexicanfriend.app`
- [ ] App name: `YMF Spanish` · Launcher name: `YMF Spanish`
- [ ] Descarga el zip. Guarda en un lugar seguro (Drive + USB) el **.keystore** y el archivo con sus contraseñas. **Si se pierden, ya no podrás actualizar la app.**

## 3. Conectar la app con tu dominio
- [ ] En el zip de PWABuilder viene `assetlinks.json`
- [ ] En tu repo ymf-app: Add file → Create new file → nombre: `.well-known/assetlinks.json` → pega su contenido → Commit
- [ ] Revisa que abra: https://app.yourmexicanfriend.com/.well-known/assetlinks.json
- [ ] Después de subir la app a Play Console, ve a **Configuración → Integridad de la app → Firma de apps** y copia la huella **SHA-256** de Google. Agrégala también a `assetlinks.json` (PWABuilder lo explica en su guía). Sin esto, la app sale con barra de navegador arriba.

## 4. Crear la app en Play Console
- [ ] **Crear app** → Nombre: YMF Spanish · Idioma: English (US) · App · Gratis
- [ ] Ficha de Play Store → copia los textos de `ficha-google-play.md`
- [ ] Sube los gráficos de la carpeta `graficos/`
- [ ] Contenido de la app → responde los cuestionarios (respuestas en `ficha-google-play.md`)
- [ ] Política de privacidad: `https://app.yourmexicanfriend.com/privacy.html`

## 5. Prueba cerrada (14 días)
- [ ] Pruebas → **Prueba cerrada** → crea una versión → sube el archivo **.aab** de PWABuilder
- [ ] Testers → pega los correos (mínimo 12)
- [ ] Manda el link con el mensaje de `mensaje-testers.md`
- [ ] Espera 14 días seguidos con 12+ testers activos

## 6. Publicar
- [ ] Panel → **Solicitar acceso a Producción** (Google hace unas preguntas sobre la prueba)
- [ ] Cuando lo aprueben: Producción → crea versión con el mismo .aab → enviar a revisión
- [ ] Revisión: de horas a unos días. ¡Y queda en Google Play! 🎉

## Para actualizar después
Los cambios a ejercicios **no requieren** subir otra versión a Google Play: la app carga desde tu dominio. Solo subes los cambios a GitHub como siempre (y cambias `VERSION` en `sw.js`).
Solo hay que generar un .aab nuevo si cambias el nombre, el ícono o el package.
