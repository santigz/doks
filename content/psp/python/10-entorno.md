---
title: "Entorno"
description: "Entorno"
date: 2021-10-01T15:21:01+02:00
lastmod: 2021-10-01T15:21:01+02:00
draft: false
slug: entorno
menu:
  python:
    parent: "python"
weight: 220
toc: true
---

## Pip

**Pip (_Package Installer for Python_)** es el principal gestor de paquetes en Python.

**PyPI (_Python Package Index_)** es el principal repositorio de software para Python: https://pypi.org/

Debes instalar pip para trabajar con él:
```bash
$ sudo apt install python3-pip    # En Ubuntu
```

Se pueden instalar paquetes a diferentes niveles (ejemplos con [httpie](https://github.com/httpie/httpie)):
- `/usr/lib/python3.9/dist-packages`: paquetes instalados desde el gestor del OS, ej: `sudo apt install httpie`
- `/usr/local/lib/python3.9/dist-packages`: paquetes instalados por Pip a nivel de sistema, ej: `sudo pip install httpie`
- `~/.local/lib/python3.9/dist-packages`: paquetes instalados por Pip a nivel de usuario, ej: `pip install httpie`

Instalación en usuario y consulta de la ruta:
```bash
$ pip install httpie
$ pip show httpie
Name: httpie
Version: 2.6.0
Summary: HTTPie: command-line HTTP client for the API era.
Home-page: https://httpie.org/
Author: Jakub Roztocil
Author-email: jakub@roztocil.co
License: BSD
Location: /home/user/.local/lib/python3.9/site-packages
Requires: defusedxml, requests-toolbelt, charset-normalizer, Pygments, requests, setuptools
Required-by:
```

En el caso concreto de `httpie`, es una herramienta para hacer consultas HTTP e instala una herramienta ejecutable `http` y `https`:
```bash
$ ~/.local/bin/https wttr.in
$ python3 -m httpie wttr.in   # Invocar el módulo httpie es equivalente
```

Para desinstalar con Pip:
```bash
$ pip uninstall httpie
Found existing installation: httpie 2.6.0
Uninstalling httpie-2.6.0:
  Would remove:
    /home/user/.local/bin/http
    /home/user/.local/bin/https
    /home/user/.local/lib/python3.9/site-packages/httpie-2.6.0.dist-info/*
    /home/user/.local/lib/python3.9/site-packages/httpie/*
Proceed (y/n)? y
  Successfully uninstalled httpie-2.6.0
```


## Entornos virtuales


## Módulos

Aparte de importar los módulos _builtin_ o los descargados con Pip, usar módulos en tu código es muy natural.

**¡Todos tus ficheros `.py` son módulos importables!**

Ejemplo de fichero `mimodulo.py`:
```python
the_list = [1, 2, 3]

def some_func():
  print("I'm here!")
```

Podemos cargarlo desde otro fichero o desde la REPL:
```python
import mimodulo
mimodulo.some_func()      #"I'm here!"
print(mimodulo.the_list)  # [1, 2, 3]
```

Para importar sólo un nombre interno:
- `import ...`
- `from ... import ...`
```python
import mimodulo.some_func
mimodulo.some_func()       # "I'm here!"

from mimodulo import some_func
some_func()                # Pasa al scope (ámbito) general

from mimodulo import some_func, the_list # Importa varios nombres
```

Podemos renombrar nombres importados:
```python
import mimodulo as mm
mm.some_func()

from mimodulo import some_func as myfun
myfun()
```

Se pueden importar todos los nombres, **¡pero es una mala práctica!:**
```python
# ESTO ES UNA MALA PRÁCTICA!!!!!!
from mimodulo import *
some_func()  # ¿cómo sé de donde viene esto?
the_list     # Y esto??
```

### Variables de módulo

Al importar un módulo podemos ver los nombres que se importan, y podemos encontrar variables especiales (ejemplo con el módulo interno `os` -- [ver docs](https://docs.python.org/3/library/os.html)):
```python
>>> import os
>>> dir(os)
# Muestra los nombres accesibles con os.***
>>> os.__file__
'/usr/lib/python3.9/os.py'
>>> os.__name__
'os'
```

Esta variable `__name__` es la que se usa para construir [la función main](/psp/python/sintaxis/#función-main).


## Paquetes

Un paquete es una extensión del sistema de módulos. Cualquier directorio con un fichero `__init__.py` es considerado un paquete de Python.

Al importar el nombre del directorio se ejecuta el `__init__.py`:
```python
import pack
# Busca y ejecuta pack/__init__.py
```

Si queremos importar un módulo (fichero) concreto dentro de un paquete:
```python
import pack.modu
# 1. Busca y ejecuta pack/__init__.py
# 2. Busca y ejecuta pack/modu.py
```

Si tienes varios directorios anidados, por ejemplo `very/deep/module/__init__.py`:
```python
# Puede ser conveniente renombrarlo a algo más corto
import very.deep.module as mod
```

### Organización de código

Para dividir tu código en ficheros y directorios piensa en cada fichero `.py` como un módulo.

Por ejemplo, con estos ficheros:

<pre>
<code style="line-height: 1rem" class="language-text hljs language-plaintext">myproject
├── principal.py
├── secondary.py
└── things
    ├── __init__.py
    ├── internal.py
    └── important_things.py
</code>
</pre>

Desde el fichero `principal.py` podemos importar:
```python
# Fichero principal.py

# Asumiendo que someFunc y someClass están definidas en secondary.py
from secondary import someFunc, someClass

# Importa todo lo que haya en things/__init__.py
import things
```

El fichero `__init__.py` es especial y hay que añadirlo en cada directorio que queramos importar. Generalmente contendrá otras importaciones que se van a pasar a quien lo importe.
```python
# Fichero things/__import__.py

# Obligatorio usar from-import
# El punto indica que está en el directorio actual, .. para el padre
from .important_things import *

# Suponiendo que internal.py no lo queremos exponer fuera de este módulo
```

Aquí debemos usar `from ... import` y no solo `import` porque no funcionan exactamente igual. Puedes leer más [aquí](https://stackoverflow.com/questions/9439480/from-import-vs-import).

Y podríamos tener inclusiones dentro de ficheros del directorio:
```python
# Fichero things/important_things.py

# Obligatorio usar from-import
from .internal import *
```


## \_\_main__.py

Cuando un directorio incluye un fichero `__main__.py` éste será el que se ejecute cuando se invoque desde la terminal. No es necesario que exista este fichero, pero ayuda suele incluirse en el directorio principal del código.

Si vemos el fichero `__main__.py` de algún proyecto como [httpie](https://github.com/httpie/httpie):
```python
def main():
    # Ejecución principal...
    return exit_status

if __name__ == '__main__':
    import sys
    sys.exit(main())
```

Así lo podemos invocar con:
```bash
$ ls
myproject
$ ls myproject
__main__.py  principal.py  secondary.py  things
$
$ python3 -m myproject    # Busca myproject/__main__.py
```

Por ejemplo, un módulo muy conocido es el de lanzamiento de un servidor web en el directorio actual:
```bash
$ python3 -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```



## Crear paquete instalable

El fichero `setup.py` con el módulo `setuptools` es la forma estándar de crear paquetes de Python.



Este fichero es bastante sencillo, por ejemplo:
```python
from setuptools import setup, find_packages

setup(
    name='myproject',
    version='0.1.0',
    packages=find_packages(include=['myproject', 'myproject.*']),
)
```

La función `find_packages` se encarga de encontrar paquetes de Python (directorios con fichero `__init__.py` --no los ejecuta):
- El parámetro `include=['myproject', 'myproject.*']` no es necesario, pero indica que sólo busque ese paquete y subpaquetes, evitando devolver paquetes que no conviene entregar en el producto final, como los de test.

Este fichero se suele situar en la raíz del proyecto, y un directorio con el mismo nombre del proyecto con todo el código. Ejemplo de proyecto:

<pre>
<code style="line-height: 1rem" class="language-text hljs language-plaintext">myproject
├── myproject
│   ├── __init__.py
│   ├── __main__.py
│   ├── principal.py
│   ├── secondary.py
│   └── things
│       ├── __init__.py
│       ├── internal.py
│       └── stuff.py
├── tests
│   ├── __init__.py
│   ├── test_principal.py
│   └── test_secondary.py
├── README.md
├── LICENSE
└── setup.py
</code>
</pre>

{{< alert icon="💡" text="Añade un fichero <code>__init__.py</code> en todos tus (sub)directorios de código, aunque sea un fichero vacío, para que <code>find_packages()</code> los incluya." />}}


Para instalar tu paquete:
```bash
$ pip install .
```

Consigues el mismo resultado con el comando `python`, que incluye más opciones:
```bash
$ python setup.py install -v   # Instala el paquete
$ python setup.py check        # Solo comprueba errores de configuración
$ python setup.py sdist        # Crea un comprimido para entregar
```

El paquete con el código se instalará en alguna de las rutas:
- `/usr/local/lib/pythonX.X` si se ejecuta como root.
- `~/.local/lib/pythonX.X` si se ejecuta como usuario normal.
- En el entorno virtual si se usa uno.

Si tu proyecto tiene dependencias, las tienes que incluir de esta manera para que se instalen automáticamente con tu proyecto:
```python
setup(
    # ...
    install_requires=[
        'PyYAML',
        'numpy>=1.14.5',
        'matplotlib>=2.2.0'
    ]
)
```

### Crear un ejecutable

Para que tu proyecto incluya un ejecutable o comando instalable, añade algo como esto:
```python
setup(
    # ...,
    entry_points={
        'console_scripts': ['my-command=myproject.__main__:main']
    }
)
```

Esto va a crear un ejecutable llamado `my-command`, que al lanzarse invocará el método `main()` del módulo `myproject.__main__`. Todos estos parámetros los puedes modificar.

El ejecutable `my-command` lo crea `setuptools` y lo instalará en una de las rutas por defecto de manera análoga al código del paquete:
- `/usr/local/bin`
- `~/.local/bin`
- En el `bin` del entorno virtual.

Localiza ese fichero ejecutable y ábrelo con un editor. Verás que es un sencillo programa de Python que pasa todos los argumentos a la función principal que has indicado en el setup.

Podrás lanzar tu proyecto de dos maneras:
```bash
$ python -m myproject
$ my-command
```
Si te da error de _command not found_ es porque no has incluido la ruta de binarios en tu `$PATH`. Para solucionarlo (si usas Bash), añade lo siguiente en tu `~/.bashrc` y vuelve a abrir tu terminal:
```bash
export PATH="$HOME/.local/bin:/usr/local/bin:$PATH"
```

En este repositorio [pypa/sampleproject](https://github.com/pypa/sampleproject/blob/main/setup.py) puedes ver más opciones del `setup.py`.



## Verificación de código

Es importante seguir buenas prácticas y usar herramientas de comprobación automática:
- `pycodestyle` (antes se llamaba `pep8`): comrpueba el estilo (espacios, indentaciones...)
- `pyflakes` no verifica estilo sino errores logísticos (variable sin usar, import irrelevante...)
- `flake8` es un wrapper de pycodestyle y pyflakes.

Usa Flake8 en todos tus proyectos.

```
$ pip install flake8
$ flake8 code.py
$ flake8 *.py
mycode.py:69:11: E401 multiple imports on one line
mycode.py:77:1: E302 expected 2 blank lines, found 1
mycode.py:88:5: E301 expected 1 blank line, found 0
mycode.py:222:34: W602 deprecated form of raising exception
mycode.py:347:31: E211 whitespace before '('
mycode.py:357:17: E201 whitespace after '{'
mycode.py:472:29: E221 multiple spaces before operator
mycode.py:544:21: W601 .has_key() is deprecated, use 'in'
```

### PEP8

Los errores de `pycodestyle` y `flake8` vienen en referencia a PEP8.

[PEP 8 — Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/) es una guía de buenas prácticas de Python en cuanto al estilo. Ej:
- Mejor indenta siempre con espacios en vez de tabuladores.
- Deja dos líneas en blanco entre función y función.
- Deja una línea en blanco entre métodos de una clase.

En la [web de pycodestyle](https://pycodestyle.pycqa.org/en/latest/intro.html) tienes el significado de cada código de error.

Clasificación general de errores:

- Error and warning
- Starting with E … errors
- Starting with W … warnings
- 100 type … indentation
- 200 type … whitespace
- 300 type … blank lines
- 400 type … imports
- 500 type … line length
- 600 type … deprecation
- 700 type … statements
- 900 type … syntax errors

### Pylint

[Pylint](https://pylint.org/) es otro verificador muy popular para Python. Úsalo junto a flake8.

```bash
$ pip install pylint
$ pylint code.py
```



