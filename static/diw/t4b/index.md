---
marp: true
theme: uncover
headingDivider: 2
---

# <!--fit-->CSS Layout
<h1 style="color: #d82d2d">Flexbox & Grid</h1>

Diseño de Interfaces Web

###### Santiago González [![Mi twitter](https://proxy.duckduckgo.com/ip3/twitter.com.ico)](https://twitter.com/santi_sgz) [![Mi GitHub](https://proxy.duckduckgo.com/ip3/gist.github.com.ico)](https://github.com/santigz)

## TOC

- **Tradicional**
- **Flexbox**
- **Grid**

## <!--fit-->Layout Tradicional
<!-- _class: invert -->

## History of CSS Layout

http://grid-layout.com/history.html

- <span style="color: gray">Creación de HTML (Tim Berners-Lee, 1990)</span>
- Tablas
- Frames
- <span style="color: gray">Creación CSS1 (1996)</span>
- Floats
- Flexbox
- Grid

## Tablas y Frames

**Jamás usar** para estructurar el layout de una página.

- No uses tablas salvo para mostrar contenido tabulado (datos...)
- No uses `frame`, pero usa `iframe` sólo para embeber recursos: vídeos, codepen, etc.<br> **Jamás para layout.**

## Margin auto y floats

No hay nada malo en usar ambos para pequeñas cosas cuando sea práctico.
