---
title: "Introducción"
description: "Introducción a Python para desarrolladores Java."
lead: "Introducción a Python para desarrolladores Java."
date: 2021-10-01T15:21:01+02:00
lastmod: 2021-10-01T15:21:01+02:00
draft: false
slug: intro
menu:
  python:
    parent: "python"
weight: 110
toc: true
---

Si quieres más referencias:

- [Python for the Busy Java Developer](https://www.apress.com/gp/book/9781484232330) -- Libro
- [Python Crash Course for Java Developers](https://blu3r4y.github.io/python-for-java-developers/)
- [Python Primer for Java Developers](https://lobster1234.github.io/2017/05/25/python-java-primer/)
- [Python for Java developers](http://python4java.necaise.org/)

Referencias solo de Python:
- [The Hitchhiker’s Guide to Python!](https://docs.python-guide.org/)

## Python

> Python is an open source, general-purpose programming language that is
> dynamic, strongly typed, object-oriented, functional, memory-managed,
> and fun to use.

- **Dinámico**: los tipos de las variables se comprueban en runtime.
- **Fuertemente tipado**: sólo puedes ejecutar operaciones que están soportadas por el tipo objetivo.
- **OOP (Object Oriented Programming)**: tiene clases, objetos... pero no usa interfaces, a diferencia de Java.
- **Funcional**: paradigma de programación alternativo a OOP.

En Java tenemos que declarar el tipo de una variable, que no es dinámico, que se comprueba en tiempo de compilación:
```java
MyType obj = new MyType() // Falla si los tipos no son compatibles
```

En Python las variables son dinámicas y asignables a cualquier tipo, pero al ejecutar un método es cuando se comprueba si es soportado por la clase del objeto.
```python
obj = MyType()     # La asignación nunca falla
obj.doSomething()  # Se comprueba que el método existe en ejecución
obj = OtherType()  # Tipado dinámico
```

## Instalación

En la mayor parte de las distribuciones Linux viene instalado por defecto. De no ser así acude a python.org.
Asegúrate de estar siempre utilizando la versión 3.

Para instalarlo en Debian/Ubuntu:
```
$ sudo apt install python3
```

Según la instalación de tu máquina puede que el comando para ejecutarlo sea `python` o `python3`, o puede que tengas ambas instaladas:
```
$ python --version
Python 2.7.17
$ python3 --version
Python 3.9.5
```

## REPL

REPL (read-eval-print loop) es la shell interactiva, habitual en lenguajes dinámicos:

```python
$ python3
Python 3.9.5 (default, May 11 2021, 08:20:37)
[GCC 10.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> x = 10
>>> x
10
```

Podemos usar la función interna `help()`:
```python
>>> help(x)
Help on int object:

class int(object)
 |  int([x]) -> integer
 |  int(x, base=10) -> integer
 |
 |  Convert a number or string to an integer...
[...]
```

Para ver los atributos de un objeto:
```python
>>> dir(x)
```

Para ver los objetos que hay _built-in_:
```python
>>> dir()
>>> dir(__builtins__)
```

## Hello world!

Python no requiere de la existencia de la función main. Guarda el siguiente contenido en `script.py`:
```python
#!/usr/bin/env python

print('Hello world!')
```

Ejecútalo con `$ python3 script.py`:
```
$ python3 script.py
Hello world!
```

También se puede reconocer el módulo `__main__`:
```python
#!/usr/bin/env python

def main():
    print('Hello world!')

if __name__ == "__main__":
    main()
```

