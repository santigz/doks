---
title: "Sintaxis"
description: "Sintaxis de Python."
lead: "Sintaxis de Python."
date: 2021-10-01T15:21:01+02:00
lastmod: 2021-10-01T15:21:01+02:00
draft: false
images: []
menu:
  python:
    parent: "python"
weight: 120
toc: true
---

## Ejemplo

Analiza el siguiente ejemplo:
```python
# Crea una lista y extrae los impares
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
odd_numbers = []
for num in numbers:
  if num % 2 != 0:
    odd_numbers.append(num)

print("Odd numbers: ", odd_numbers)
```

- No hay puntos y comas `;` 🎉🎉
- A diferencia de Java, Python tiene estructuras básicas integradas: listas, tuplas, dicts, sets...
- Comentarios con `#`.
- **La indentación es muy importante!!** Es la forma de anidar sentencias. No hay corchetes `{}`.
- Los bloques que anidan código incluyen dos puntos `:`.
- Adiós a `System.out.println`!

{{< alert icon="👉" text="Nunca mezcles indentación de espacios con tabuladores para evitar problemas. Te recomiendo espacios." />}}

## Input/Output

No más `System.out.println()`!

Para passwords tenemos el módulo `getpass`.

```python
import getpass

print('== Please, log into the system')
user = input('User: ')
passwd = getpass.getpass()
print('Welcome, ' + user)

# Don't print newline
print("Hello World", end='')
```

```plaintext
$ python3 script.py
== Please, log into the system
User: Demian
Password:
Welcome, Demian
```

## Strings

No hay diferencia entre comillas simples `'string'` y dobles `"string"`.

Existen diferentes tipos de strings:

| Type      | Example     |
| --------- | -----       |
| str       | `'manzana'` |
| unicode   | `u'😍😍😍'`   |
| str       | `r'C:\temp'`  |
{.table-striped}

Las _raw strings_ tratan todos los caracteres de forma literal, sin códigos de escape como `\n` o `\t`.

Para combinar strings podemos 1) **concatenar**, 2) **interpolar** y 3) **formatear**:
```python
# Con print puedo pasar varios parámetros
print('Hello ', 'world!')

# 1. Concatenación
msg = 'Hello ' + 'world!'

pi = 3.14
e = 2.71

# 2. Interpolación con el prefijo f''
msg = f'Pi = {pi} and e = {e}'

# 3. Formateo
msg = 'Pi = {} and e = {}'.format(pi, e)
```

Strings multilínea:
```python
multiline = """Esto soporta
varias líneas
fácilmente!"""
```



## Números

En Python sólo hay tres tipos numéricos: `int`, `float` y `complex` (ver [docs](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex)).

- Todos los flotantes [suelen implementarse](https://docs.python.org/3/library/sys.html#sys.float_info) como tipo `double`.
- No hay diferencia entre `short`, `int`, `long`, `float` y `double`.

```python
my_int = 5
my_float = 3.141
my_complex = 1 + 2j

# Ayudas para escribir números
scientific = 27.8e+12
hexadecimal = 0x3f
bitmask = 0b1011_1001

# Los guiones bajos no cambian el número pero ayudan
billion = 1_000_000_000
```

Las operaciones matemáticas son las habituales, con alguna ayuda:
```python
x + y
x - y
x / y     # División flotante
x // y    # División entera
x % y     # Módulo
x ** y    # Exponenciación
pow(x, y) # Exponenciación
```

Booleanos (internamente son un subtipo de los enteros):
```python
yeah = True
nope = False

# Operaciones booleanas
yeah & nope  # AND
yeah | nope  # OR
yeah ^ yeah  # XOR
```

## Casting

Pasar valores entre tipos básicos:

```python
name = "Name"
age = 42
completed = False
c = 'A'
f = 0.0034

int(value)
str(value)
float(value)
bool(value) # only false for empty string or int=0
```


## If y switch

En Python [por algún motivo](https://stackoverflow.com/questions/46701063/why-doesnt-python-have-switch-case#46701087) no hay _switch statement_ y hay que imlpementarlo con _if-else_.

```python
x = 0

if x == 0:
    print("The value is 0")
elif x == 1:
    print("The value is 1")
elif x == 2:
    print("The value is 2")
else:
    print("The value is something else")
```

## Bucles for


```python
names = ["Franz", "Susanne", "Hans", "Herbert", "Peter", "Max", "Lisa"]

for name in names:
    print(name)
```








## Funciones
Definición de una función simple:
```python
def suma(a, b):
  return a + b

suma(1, 1)
```

Algunas conclusiones:
- Las funciones se declaran con `def`.
- Python no tiene modificadores de acceso `public`, `default` ni `static`.
- No se especifican tipos en los parámetros (esto se conoce como _duck typing_)

Los parámetros con valor por defecto son opcionales:
```python
def operation(a, b, factor=1.2, name='Unknown'):
    result = (a + b) * factor
    print(f'Hi, {name}, the result is {result}')

operation(4, 2)
operation(4, 2, factor=2.5)
operation(4, 2, name='Arturo')
```




La llamada a una función se puede hacer siempre como **_Keyword Arguments_**:
```python
def my_function(p1, p2, p3):
    print(f'{p1}, {p2}, {p3}')

my_function(p1='a', p3='c', p2='b')
```

Los **_Arbitrary Arguments_** se leen como una lista con `*`:
```python
def my_function(*args):
    print('First parameter: ', args[0])

my_function(1, 2, 3)
```

También tenemos **_Arbitrary Keyword Arguments_** con `**`:
```python
def my_function(p1, p2, **kwargs):
    if 'p4' in kwargs:
        print(kwargs['p4'])

my_function(p1='a', p2='b', p3='c', p4='d')
```

Puede haber de los dos tipos (siempre los `kwargs` al final):
```python
def my_function(a, b, *args, **kwargs):
    # ...
```


### Función main
No existe una función _main_ como tal. Pero el equivalente es comprobar si el nombre del módulo es `__main__`.
```python
def main():
    # Mis cosas

if __name__ == '__main__':
    # Estoy en el main
    main()
```


### Documentación de funciones

El comando `help(function)` devuelve información sobre la función. La puedes crear añadiendo un string justo tras la definición de la misma:
```python
def my_function():
    """This is the documentation of this function.
       It does very important stuff.
    """
    pass

# help(my_function)
```

Los IDEs suelen leer esta string para mostrar la ayuda de tus funciones.


## Excepciones

La sintaxis es la esperada, con los bloques:
- `try`: bloque principal.
- `except`: bloques de excepción.
- `else`: bloque en caso de no haber ocurrido una excepción.
- `finally`: bloque final, ejecutado siempre.

Puedes consultar la lista de las [_built-in exceptions_](https://www.w3schools.com/python/python_ref_exceptions.asp).

```python
try:
    assert(1==2)
except AssertionError as e:
    print("Assertion Exception: ", e)
except (IOError, ValueError):
    print("An I/O error or a ValueError occurred")
except:
    print("Caught unknown exception")
else:
    print("No exceptions raised")
finally:
    print("Finished")
```

Ejemplo de lanzamiento de excepción:
```python
raise SyntaxError("Sorry, my fault!")
```
