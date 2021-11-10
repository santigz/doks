---
marp: true
theme: uncover
headingDivider: 2
---

# <!--fit-->Planificación y Usabilidad

Diseño de Interfaces Web

###### Santiago González [![Mi twitter](https://proxy.duckduckgo.com/ip3/twitter.com.ico)](https://twitter.com/santi_sgz) [![Mi GitHub](https://proxy.duckduckgo.com/ip3/gist.github.com.ico)](https://github.com/santigz)

# <!--fit-->Percepción
<!-- _class: invert -->

## Fotoreceptores de la retina

- **Rods (bastones)**: perciben intensidad (escala de grises).
- **Cones (conos)**: perciben color. Hay 3 tipos de conos (rojo, verde, azul) con [distribución foveal](https://www.ncbi.nlm.nih.gov/books/NBK10848/).

<center>
<img width="500px" src="https://www.jagranjosh.com/imported/images/E/Articles/rods-cones-cells-of-eye.png">
</center>

---

<center>
<iframe width="1000" height="560" src="https://www.youtube-nocookie.com/embed/WcB6_lX3pS4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>

---

<center>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Everything we see is as manifestation of the level below. From organism, to organs, cells, macromolecules, molecules, atoms, to subatomic particles. This quick zoom in from our new Animated Textbook &#39;Life&#39; allows students to appreciate this concept. <a href="https://twitter.com/hashtag/biology?src=hash&amp;ref_src=twsrc%5Etfw">#biology</a> <a href="https://twitter.com/hashtag/animation?src=hash&amp;ref_src=twsrc%5Etfw">#animation</a> <a href="https://twitter.com/hashtag/education?src=hash&amp;ref_src=twsrc%5Etfw">#education</a> <a href="https://t.co/GiTrEthMK7">pic.twitter.com/GiTrEthMK7</a></p>&mdash; Smart Biology (@SmartBiology3D) <a href="https://twitter.com/SmartBiology3D/status/1178325615625277440?ref_src=twsrc%5Etfw">September 29, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>


## :eye:

[M. F. Deering (2005) A Photon Accurate Model of the Human Eye](http://michaelfrankdeering.org/Projects/EyeModel/eyeExpandedS.pdf) ← _Best paper ever!_

![Retina aumentada](http://michaelfrankdeering.org/Projects/EyeModel/retinaThumb.jpg)

Tenemos un [punto ciego](https://en.wikipedia.org/wiki/Blind_spot_(vision)?wprov=sfti1) para dejar espacio al nervio óptico!


## GESTALT

> El todo es diferente de la suma de las partes

[Gestalt en la Wikipedia](https://es.wikipedia.org/wiki/Psicolog%C3%ADa_de_la_Gestalt?wprov=sfti1)

![Perrete gestáltico](https://media.giphy.com/media/ybWHiao8xcht6/giphy.gif)

---

<center>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dk7cXdjX2Ys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/FryaH599ec0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>


# Colores

Un mismo color se puede representar en diferentes espacios de color:
<center>
<img width="500px" src="https://www.cs.cmu.edu/afs/cs/academic/class/15494-s18/labs/lab7/rgb-vs-hsv.jpg">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/AvgCkHrcj90" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>

---

<center>
<iframe width="1000" height="560" src="https://www.youtube-nocookie.com/embed/_2LLXnUdUIc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>

[Artículo del vídeo](https://edu.gcfglobal.org/en/beginning-graphic-design/color/1/)


# Elegir colores

- [How to pick more beautiful colors for your data visualizations](https://blog.datawrapper.de/beautifulcolors)
- colorizer.org
- paletton.com
- [Adobe color wheel](https://color.adobe.com/create/color-wheel)
- [Color calculator](https://www.sessions.edu/color-calculator)
- [w3schools color schemes](https://www.w3schools.com/colors/colors_monochromatic.asp)


# ¡Contraste!

Asegúrate de tener buen contraste en tus diseños. La agudeza visual no es uniforme!

- [Prueba tu capacidad de contraste](https://www.pantone.com/color-intelligence/color-education/color-iq-test)
- [contrastrebellion.com](https://contrastrebellion.com) :fist:



# <!--fit-->Planificación
<!-- _class: invert -->

## Information Architecture
<center>
<img width="600px" src="https://www.altexsoft.com/media/2018/12/information-architecture.jpeg">
</center>

---
<!-- _backgroundImage: url(https://www.altexsoft.com/media/2018/12/5-steps-of-information-architecture.png) -->

## Card sorting
<!-- _backgroundImage: linear-gradient(to bottom, rgba(255,255,255,0.4) 0%,rgba(255,255,255,0.4) 100%), url(https://humix.be/wp-content/uploads/2018/05/CardSortingSocial.png); -->

Es una técnica para categorizar conceptos. Escribimos un concepto que debe mostrar nuestra web en cada tarjeta y las agrupamos.

- **Card sorting abierto**: creamos nosotros las categorías
- **Card sorting cerrado**: si partimos de categorías predefinidas (ej: si rediseñamos una web)

[Card sorting: your complete guide](https://www.justinmind.com/blog/card-sorting/)

## Navegación

- **Jerárquica**: se muestran los conceptos clasificados en subcategorías.

<center>
<img width="800" src="https://www.altexsoft.com/media/2018/12/asos-navigation.gif">
</center>


## Navegación
- **Global**: está presente en todas las páginas y permite acceder a cada parte principal del sitio web.

<center>
<img width="1200" src="https://www.altexsoft.com/media/2018/12/left-sided-menu.png">
</center>


## Navegación
- **Local**: Muestra la navegación de un área específica del sitio.

<center>
<img width="600" src="https://www.altexsoft.com/media/2018/12/local-navigation-oxford.png">
</center>


## Mind map

Es otro tipo de visualización de contenidos categorizados.
<img width="800" src="https://www.octos.com.au/blog/wp-content/uploads/2016/03/sitemap-2-1-1024x577.png">


## Patrones de diseño jerárquicos

- **Single page model**: generalmente son aplicaciones web con un propósito específico con un modelo de información sencillo.

<center>
<img width="600px" src="https://cdn2.hubspot.net/hubfs/2773967/Blog%20Latam/in-list-url-google-sheets.png">
</center>

## Patrones de diseño jerárquicos

- **Estructura plana**: tiene jerarquía linear donde cada página es igual de importante. Es frecuente en sitios de agregación de contenidos.

![](https://www.altexsoft.com/media/2018/12/flat_ia_pattern.png)


## Patrones de diseño jerárquicos
- **Patrón de jerarquía estricta**: de la página principal se desprenden subpáginas de igual importancia en uno o varios niveles.

![](https://www.altexsoft.com/media/2018/12/strict_hierarchy.png)

## Patrones de diseño jerárquicos
- **Patrón mixto**: varios tipos de jerarquías cuyas páginas pueden llegar a solapar contenido de otras.

![](https://www.altexsoft.com/media/2018/12/coexisting_hierarchy.png)

## Site mapping

Es una forma de ilustrar la jerarquía de contenido y la navegación del sitio.

<center>
<img width="600px" src="https://www.altexsoft.com/media/2018/12/Portfolio-website-sitemap.png">
</center>

## Análisis de site maps

- Whatsapp - la aplicación
- spotify.com
- hypertextual.com
- xataka.com



## Prototipos de User Interface

- **Wireframe**: quita todo lo irrelevante: colores, imgs... ([vídeo de ejemplo](https://www.youtube.com/watch?v=kk6650gC4R0))

<center>
<img width="700px" src="https://s3.amazonaws.com/blog.invisionapp.com/uploads/2017/07/wireframing-3.jpg">
</center>

## Prototipos de User Interface
<!-- _backgroundImage: url(https://cdn.dribbble.com/users/758337/screenshots/5629572/wireframes_unifaf_dribble.png) -->
- **Storyboard**: muestra cómo los wireframes se navegan.


## Terminología

- **Layout**: el "plano" o disposición de los elementos en una página.
- **Landing page**: página principal.
- **CTA - Call to Action**: botones con los que se busca la atención especial del usuario ([ejemplos](https://blog.hubspot.com/marketing/call-to-action-examples)).
- **Conversion rate**: % visitantes que pasan a clientes.
- **Above the fold**: Lo primero que se ve antes de hacer scroll (antes de desdoblar el periódico).

[Ver más términos](https://blog.wishpond.com/post/82100795372/the-wishpond-landing-page-dictionary-30-terms-you)

## UI Components

El diseño web moderno se centra en el uso de componentes de interfaz reusables.

![](https://cdn.freebiesbug.com/wp-content/uploads/2013/03/flat-ui-kit-html-psd-580x420.jpg)

# <!--fit-->Usability
<!-- _class: invert -->

## ¿Qué es la usabilidad?
Es una medida cualitativa que agrupa, entre otros:
- **Aprendizaje:** es fácil es para los usuarios realizar tareas por primera vez?
- **Eficiencia:** una vez han aprendido, cómo de rápido se manejan?
- **Recuerdo:** tras un tiempo, es fácil para un usuario volver a manejarse?
- **Errores:** cuántos errores comete el usuario? Cómo de importantes? Puede deshacerlos?
- **Satisfacción:** es agradable el diseño?

## UX: User Experience
Es un "término paragüas" que agrupa diferentes disciplinas y roles profesionales. Da una visión global centrada en el usuario.

<center>
<img width="550px" src="http://www.nosolousabilidad.com/manual/img/fig12.gif">
</center>

## Diseño de usabilidad
Se guía por tres principios
- **Centrado en usuarios y tareas:** los desarrolladores deberían pensar primero en la forma en que los usuarios utilizan el sistema, y testearlo continuamente.
- **Mediciones empíricas:** usando métodos de <u>_evaluación de usabilidad_</u> con usuarios en pruebas controladas.
- **Diseño iterativo:** metodología cíclica de prototipado.

## <!---fit-->Evaluación de usabilidad
<!-- _class: invert -->
<!-- _backgroundImage: url(https://measuringu.com/wp-content/uploads/2018/06/moderating-example.jpg) -->

<div style="height:600px"></div>

## User test
Entrevista individual con un usuario al que se le pide realizar tareas (ej: _imagina que quieres comprar..._) Es bueno incitarles a que piensen en voz alta, para entender en qué se equivocan y por qué.

- Si la web no está aún creada, se puede hacer con prototipos.

---

<center>
<iframe width="1000" height="560" src="https://www.youtube-nocookie.com/embed/9wQkLthhHKA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>


## Card-sorting

En este caso consiste en pedir a un usuario que haga el _card sorting_ de tu web, y contrastar su esquema con el de los desarrolladores de la web.

- El mapa mental de desarrollo se debería ajustar a la forma de pensar de sus usuarios.
- Esta técnica requiere que los usuarios de la prueba tengan experiencia previa en webs similares, y que estén motivados para hacer la prueba.

## Evaluación heurística
Son expertos en usabilidad (no usuarios), quienes evalúan la web. Deben seguir las **heurísticas** o directrices establecidas en los requisitos del diseño.

- Se puede realizar en dos fases: <u>alto nivel</u> (tareas, objetivos, pasos...) y <u>bajo nivel</u> (en cada pantalla, los colores, textos, elementos...)
- Esta técnica puede reportar excesivos problemas menores y no detectar problemas de usuarios.

## Eye tracking
Permite evaluar el tiempo de una tarea, el recorrido visual y los elementos que más llaman la atención.

Aborda principalmente el aspecto más gráfico, por lo que no es adecuado con prototipos.

<center>
<img width="700px" src="http://www.nosolousabilidad.com/manual/img/fig37.jpg">
</center>

## Analítica web
Tanto desde logs del servidor como con JS en el cliente. Permite el análisis cuantitativo de acciones que realiza un usuario.
- Fortaleza: no se basa en usuarios de muestra, sino reales.

<center>
<img width="600px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-torquehhvm-wpengine.netdna-ssl.com%2Fuploads%2F2015%2F09%2FGoogle-Analytics-Audience-Overview.jpg&f=1&nofb=1">
</center>

## A/B testing
Compara dos versiones de una misma página para comparar los resultados. Se divide un porcentaje de los usuarios a la web A y otro a la B.

<center>
<img width="700px" src="https://asanzdiego.github.io/curso-interfaces-web-2017/01-usabilidad/slides/img/test-a-b.jpg">
</center>


# <!--fit-->Buenas/Malas prácticas
<!-- _class: invert -->

## Simplicidad
Un sistema debe ser lo suficientemente simple, pero no en exceso.

<center>
<img width="800px" src="https://asanzdiego.github.io/curso-interfaces-web-2017/01-usabilidad/slides/img/reduccion-2.png">
</center>

## Limitar características
Aumentar las características no siempre es la mejor opción para el usuario (fatiga, distracción...)
_Microsoft Word vs. Google Docs_

<center>
<img width="400px" src="http://www.nosolousabilidad.com/manual/img/fig16.jpg">
</center>

## Limitar posibilidades
...para reducir las opciones de error del usuario.

<center>
<img width="400px" src="https://asanzdiego.github.io/curso-interfaces-web-2017/01-usabilidad/slides/img/limitar.png">
</center>

## Orientar al usuario
Opciones de ayuda, asistencia, información...

<center>
<img width="400px" src="https://asanzdiego.github.io/curso-interfaces-web-2017/01-usabilidad/slides/img/orientar.png">
</center>

## Solicitar confirmación
Regla de oro: **las operaciones _destructivas_ requieren confirmación**

<center>
<img width="400px" src="https://watchdogreviews.com/wp-content/uploads/2018/02/11-min.png">
</center>

## Ejercicios de usabilidad

Slides de _Verónica Traynor_:

[8 little exercises about usability](https://www.slideshare.net/veronicatraynor/8-little-exercises-about-usability-vernica-traynor)


## ¡Más cosas!

- [How to pick more beautiful colors for your data visualizations](https://blog.datawrapper.de/beautifulcolors/)
- [material.io](https://material.io)
- [material.io > Material properties](https://material.io/archive/guidelines/material-design/material-properties.html)
- [7 basic rules for button design](https://uxplanet.org/7-basic-rules-for-button-design-63dcdf5676b4)
- [Google Design Resources](https://design.google/resources/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

<!-- https://www.altexsoft.com/blog/uxdesign/how-to-create-information-architecture-for-web-design/ -->

