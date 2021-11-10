---
title: "Tests"
description: "Tests"
date: 2021-10-01T15:21:01+02:00
lastmod: 2021-10-01T15:21:01+02:00
draft: false
slug: tests
menu:
  python:
    parent: "python"
weight: 230
toc: true
---


## Unit tests


Hay muchos tipos de tests, algunos de ellos son:

- **Tests unitarios**: prueba componentes individuales de manera aislada.
- **Tests de integración**: prueba las interfaces (APIs) entre varias partes del sistema en conjunto.
- **Tests de sistema**: prueba el sistema final (ej. comandos de tu aplicación de terminal).
- **Tests de rendimiento**
- **Tests de usabilidad**
- ...

En los tests unitarios:
- La salida de cada test es binaria: ok o error.
- Cada test debe comprobar una funcionalidad muy específica y puntual. Ejemplos:
  - La función de suma funciona con números positivos.
  - La función de suma funciona con números negativos.
  - La función de división lanza una excepción al dividir entre cero.
- Cada función de test **es independiente del resto de tests**.
  - No debería haber ninguna dependencia entre tests unitarios.
  - Se podrían ejecutar todos en paralelo.



## Pytest

[https://docs.pytest.org/](https://docs.pytest.org/)

- Ver la sección de [Installation and Getting Started](https://docs.pytest.org/en/6.2.x/getting-started.html).


Instalación (generalmente dentro de un entorno virtual):
```pytest
$ pip install pytest
```

Pytest tiene una fase de **test discovery**:
- Busca recursivamente en todos los directorios (salvo [exclusiones](https://docs.pytest.org/en/6.2.x/example/pythoncollection.html))
- Ficheros `test_*.py` o `*_test.py`
- Clases con prefijo `Test` sin un método `__init__()`
- Funciones y métodos con prefijo `test_`

Generalmente se colocan todos los ficheros de test en un directorio:
<pre>
<code style="line-height: 1rem" class="language-text hljs language-plaintext">myproject
├── myproject
│   └── some_code.py
├── tests
│   ├── test_this.py
│   └── test_that.py
├── README.md
└── setup.py
</code>
</pre>

Dentro de un test usa el [statement assert](https://docs.pytest.org/en/6.2.x/assert.html#assert):
```python
from myproject import mydivision

def test_mydivision_simple():
    n1 = 40
    n2 = 2
    assert mydivision(n1, n2) == 20

def test_mydivision_negative():
    assert mydivision(20, -1) == -20
    assert mydivision(-20, -2) == 10
    assert mydivision(-50, 10) == -5
```

Para ejecutar los tests:
```txt
$ pytest
====================== test session starts ======================
platform linux -- Python 3.9.5, pytest-6.2.5, py-1.11.0, pluggy-1.0.0
rootdir: /path/to/project
plugins: cov-3.0.0
collected 2 items

tests/test_division.py ..                                 [100%]
```

### Testear excepciones

En ocasiones querrás comprobar que no se lanza una excepción:
```python
from myproject import mydivision
import pytest

def test_mydivision_noexception():
    try:
        mydivision(7, 2)
    except ValueError:
        pytest.fail("Unexpected ValueError")
```

Y en otras ocasiones querrás comprobar que se debería lanzar una excepción:
```python
from myproject import mydivision
import pytest

# El test solo pasa si se lanza la excepción ValueError dentro del bloque
def test_mydivision_zero():
    with pytest.raises(ValueError):
        mydivision(3, 0)

# El mismo comportamiento con pytest.madk.xfail
@pytest.mark.xfail(raises=ValueError)
def test_mydivision_zero_alt():
    mydivision(3, 0)
```

## Test coverage

Las herramientas de cubrimiento de tests indican qué porcentaje del código principal ha sido ejecutado por los tests.
- Que un conjunto de líneas se cubran por un test no asegura que sean correctas. Puede que tus tests no cubran todos los casos.
- Pero si hay código que ni siquiera se ejecuta, significa que ni siquiera se está comprobando.
- El cubrimiento es un simple indicador de calidad del software.
- Es muy difícil llegar al 100%, pero un buen testing debería llegar cerca.

Recursos:
- Paquete [pytest-cov](https://pypi.org/project/pytest-cov/)
- [Tutorial de pytest-cov](https://mamonu.github.io/testing_coverage/)

El uso de `pytest-cov` es muy sencillo:
```txt
$ pip install pytest-cov
$ pytest --cov=myproject
======================== test session starts ========================
platform linux -- Python 3.9.5, pytest-6.2.5, py-1.11.0, pluggy-1.0.0
rootdir: /path/to/project
plugins: cov-3.0.0
collected 0 items


---------- coverage: platform linux, python 3.9.5-final-0 -----------
Name                            Stmts   Miss  Cover
---------------------------------------------------
myproject/__init__.py               3      0   100%
myproject/__main__.py               7      7     0%
myproject/project.py              100     61    93%
myproject/somecode.py              23      2   100%
---------------------------------------------------
TOTAL                             123     70    73%

==================== no tests ran in 0.04s ==========================
```

Si quieres un report en html:
```bash
$ pytest --cov=myproject -cov-report html
$ ls htmlcov   # Se crea aquí
index.html ...
```

