---
title: "OOP y clases"
description: "OOP y clases en Python."
lead: "OOP y clases en Python."
date: 2021-10-01T15:21:01+02:00
lastmod: 2021-10-01T15:21:01+02:00
draft: false
slug: oop
menu:
  python:
    parent: "python"
weight: 130
toc: true
---

## Orientación a objetos

OOP (Object-Oriented Programming) es uno de los paradigmas de programación incluidos en Python, demás de ser un lenguaje funcional.

Python tiene un enfoque particular de OOP. Analiza el siguiente ejemplo:

```python
class Duck:
    def __init__(self, sound, color):
        self.sound = sound
        self.color = color

    def describe(self):
        print(f"I'm a duck: {self.sound} {self.color}")

    def cuack():
        print("I'm a duck!")

    @staticmethod
    def static_cuack():
        print("I'm a static duck!")

duck = Duck("duck-and-cover", "White")
print(duck.color)

duck.describe()      # Pasa el objeto como primer parámetro implícitamente
Duck.describe(duck)  # Mismo resultado

# duck.cuack()  # Error: la función no admite argumentos
Duck.cuack()    # Correcto

duck.static_cuack()  # @staticmethod evita que se pase el objeto como argumento
Duck.static_cuack()  # Mismo resultado

# Prueba esto:
help(duck)
```

Vemos que:
- Python sólo tiene un constructor llamado `__init__`.
- No existe la sobrecarga (_overloading_) de métodos.
- La creación de objetos no necesita `new`.
- No hay modificadores de acceso `public`, `default` ni `final`.
- No definimos explícitamente los atributos o propiedades de la clase. Se crean dinámicamente.
- Las funciones que van a trabajar con los atributos del objeto incluyen `self` como primer argumento. Son métodos de instancia.
- Si no incluye `self`, es un método de clase y no se puede invocar en un objeto.

Los atributos también se pueden crear de la manera tradicional sin `__init__`:
```python
class Clase:
    attr1 = 4
    attr2 = 'hola'

    def method(self):
        print(f'Values: {self.attr1}, {self.attr2}')

obj = Clase()
obj.method()
```



## No hay métodos privados

¡Python no tiene métodos privados!

Si piensas que es una aberración de la naturaleza y que la vida es mejor con OOP y ves el mundo de cubitos encapsulados que encajan,
deberías saber que hay no poca gente que piensa que [los métodos privados no van a salvar el mundo](https://carlosschults.net/en/are-private-methods-a-code-smell/),
que [OOP es malo](https://thenewstack.io/why-are-so-many-developers-hating-on-object-oriented-programming/),
y que [mucha gente está en contra de OOP](https://www.yegor256.com/2016/08/15/what-is-wrong-object-oriented-programming.html).

Aún así, Python tiene un simulacro de método privado si el nombre comienza por doble underscore `__`, pero al final siempre se puede llegar a invocar.
```python
class Clase:
    def __fun(self):
        print('My private party')
    def notfun(self):
        self.__fun()
        print('Meh.')

obj = Clase()
obj.notfun()
obj.__fun()    # AttributeError: 'Clase' object has no attribute '__fun'

# Python realmente altera el nombre final del método, simplemente
obj._Clase__fun()
```


## Duck typing

¡Python no tiene interfaces!

En vez del paradigma de interfaces, usa el de [duck typing](https://en.wikipedia.org/wiki/Duck_typing):

> If it walks like a duck and it quacks like a duck, then it must be a duck.

Analiza este ejemplo:
```python
class Duck:
    def swim(self):
        print("Duck swimming")

    def fly(self):
        print("Duck flying")

class Whale:
    def swim(self):
        print("Whale swimming")

for animal in [Duck(), Whale()]:
    animal.swim()
    animal.fly()

### Output:
# Duck swimming
# Duck flying
# Whale swimming
# AttributeError: 'Whale' object has no attribute 'fly'
```

Los lenguajes con tipado estático hacen chequeos en tiempo de compilación según la estructura fija de un tipo.
Pero con duck typing la comprobación de acceso se realiza en tiempo de ejecución.


## Lenguaje dinámico

Se pueden hacer pirulas como modificar dinámicamente atributos y métodos:
```python
class Clase:
    attr = 'The boss'
    def method_a(self):
        print('Method a')

obj = Clase()
obj.method_a()      # Method a

del Clase.method_a
obj.method_a()      # Error!


# Función fuera de una clase que accede a self? y a un atributo??
def b(self):
    print(f'Muahaha: {self.attr}')

# Añadimos un nuevo método a una clase
Clase.method_b = b
obj.method_b()       # Muahaha: The boss
```

¿Por qué es esto posible? Porque los tipos no se determinan en tiempo de compilación sino en tiempo de ejecución. Por el **duck typing**.


## Protocolos

Son una convención de que en ciertos momentos se van a invocar ciertos métodos sobre un objeto.

Por ejemplo, para obtener la longitud de algo (lista, etc.), se usa la función `len()`, que internamente llama a la función `__len__` del objeto:
```python
class Team:
    def __init__(self, members):
        self.__members = members

    def __len__(self):
        return len(self.__members)

liga = Team(["batman", "wonder woman", "flash"])
size = len(liga)
```

Algunos de los protocolos:
| Protocol         | Métodos                              | Sintaxis                        |
|------------------|--------------------------------------|---------------------------------|
| Sized            | `__len__`...                         | `len(object)`                   |
| Sequences        | `__getitem__`...                     | `seq[1:3]`                      |
| Iteradores       | `__iter__`, `next`                   | `for x in collection`           |
| Comparison       | `__eq__`, `__gt__`, `__lt__`, ...    | `x == y`, `x > y`, `x < y`, ... |
| Numeric          | `__add__`, `__sub__`, `__and__`, ... | `x + y`, `x - y`, `x & y`, ...  |
| String like      | `__str__`, `__unicode__`, `__repr__` | `print(x)`                      |
| Attribute access | `__getattr__`, `__setattr__`         | `obj.attr`                      |
| Context Managers | `__enter__`, `__exit__`              | `with open('out.txt') as f:`    |


Python no tiene declaración explícita de protocolos. Con que un objeto implemente los métodos de un protocolo es suficiente. Puedes consultar la lista de protocolos predefinidos:
- [Protocols and structural subtyping](https://mypy.readthedocs.io/en/stable/protocols.html)

Para listar los métodos que soporta un objeto (recuerda que se pueden añadir y eliminar dinámicamente):
```python
obj = 'hello' # string
dir(obj)
```


### With

Es un sistema que facilita la gestión de recursos haciendo implícita la fase de finalización de los mismos.

La palabra reservada `with` invoca sobre el objeto los métodos `__enter__()` y `__exit__()` al inicio y al final del bloque. El objeto no necesita implementar ninguna interfaz, como se haría en Java, sino simplemente implementar los métodos que se van a invocar.

```python
with expression as target_var:
    # target_var.__enter__()
    do_something(target_var)
    # target_var.__exit__()
```

Es muy utilizado para trabajar con ficheros:
```python
with open('hello.txt', mode='w') as f1, open('world.txt', mode='w') as f2:
    f1.write('Helloooo')
    f2.write('World!')
```

Al finalizar el bloque `with` los dos ficheros ya estarán cerrados.


### Iterator Protocol

Un objeto que implemente el protocolo iterable:
- Implementa `__iter__()` para obtener un iterator.
- Implementa `__next__()` para obtener el siguiente elemento.

Se puede explorar un iterador paso a paso:
```python
>>> items = [1, 4, 5]
>>> it = iter(items)  # Internamente invoca items.__iter__()
>>> next(it)          # Internamente invoca it.__next__()
1
>>> next(it)
4
>>> next(it)
5
>>> next(it)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
>>>
```

{{< alert icon="👉" text="<strong>Ojo con Python2,</strong> que usaba <code>it.next()</code>, y Python 3 usa <code>next(it)</code>" />}}

Un bucle sobre una iteración:
```python
for x in obj:
    # statements
```

Es equivalente al siguiente modelo:
```python
_iter = iter(obj)          # Get iterator object
while 1:
    try:
         x = next(_iter)   # Get next item
    except StopIteration:  # No more items
         break
    # statements
```

Cualquier objeto que soporte `iter()` y `next()` se dice que es iterable.

Muchas funciones de Python consumen iterables:
- Reducciones: `sum()`, `min()`, `max()`
- Constructores: `list()`, `tuple()`, `set()`, `dict()`
- Pertenencia: `<item> in <collection>`


### Yield (generator)

La keyword `yield` actúa de forma similar a un `return`, pero al volver a invocar al método la ejecución sigue desde el último `yield`. Python internamente almacena el estado interno de la función y prosigue cuando se vuelve a invocar `next()`.

Si una función usa `yield`, Python construye un objeto de tipo **generator** que envuelve a la función.

Ejemplo básico:
```python
def my_generator():
  yield 'one'
  yield 'two'
  yield 'three'

for x in my_generator():
  print(x)
```

Al invocar la función, no se ejecuta inmediatamente sino que devuelve un generador. Cuando se invoca `next()` sí que se ejecuta la función:
```python
>>> type(my_generator)  # Tipo de la función
<class 'function'>
>>> g = my_generator()  # No ejecuta la función
>>> type(g)             # Python construye un generator
<class 'generator'>

>>> dir(g)
['__class__', '__del__', '__delattr__', '__dir__', '__doc__', '__eq__',
'__init__', '__init_subclass__', '__iter__', '__le__', '__lt__',
'__name__', '__ne__', '__new__', '__next__' # ...

>>> next(g) # Esto sí que ejecuta la función
'one'
>>> next(g)
'two'
>>> next(g)
'three'
>>> next(g)   # El final se detecta capturando la excepción
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

Un ejemplo algo más elaborado:

```python
def is_prime(a):
    return all(a % i for i in range(2, a))

def generator_primes(n_max):
    "Returns the primes within the first n_max integers"
    for i in range(n_max):
        if is_prime(i):
            yield i

for p in generator_primes(50):
    print('Prime:', p)
```

Algunas ventajas de usar `yield`:
- Simplifica la programación en iteraciones complejas.
- Evita almacenar en memoria todos los resultados antes de iterar sobre ellos.
- Evita la ejecución temprana de items (muchas veces innecesario).


Retomando la _list comprehension_:
```python
>>> b = (2*x for x in range(5))
>>> b
<generator object <genexpr> at 0x7f115e483b30>   # !!!
```

## Getters y setters

Getters, y setters... fundamental en OOP, pero ¡qué rollo de escribir!

Vamos a pensar... Tener get/set sirve para que el acceso y modificación de un atributo **se pueda encapsular**, ej:
- Quizás hoy el atributo es un `int`, pero mañana sea necesario hacer una consulta a una DB.
- Quizás mañana quiero guardar en un log cada vez que se accede a un atributo.
- Puede que quiera devolver un error si se intenta modificar un atributo con un valor no permitido.

En Java (_oh, siempre es Java..._) es necesario crear métodos get/set para tener esta encapsulación, pero ¡Python > Java!

La siguiente clase no tiene getters ni setters:
```python
class MyClass():
  prompt = "Hello there"
```

Para acceder a los atributos lo hago con normalidad:
```python
# Using the class attributes
c = MyClass()
print(c.prompt)
c.prompt = "other thing"
del c.prompt
```

¿Y si quiero modificar el comportamiento de get/set de los atributos? <br>
En Python se hace con decoradores:
```python
class MyClass():
  __prompt = "Hello there"    # Atributo pseudo-privado

  # Obligatorio definirlo como property
  @property
  def prompt(self):
      print('Accessing prompt')
      return self.__prompt

  # Este setter añade comprobaciones complejas de valores
  @prompt.setter
  def prompt(self, new_val):
      if 'Hello' not in new_val:
          raise ValueError('Prompt must contain Hello')
      self.__prompt = new_val

  # También tenemos un deleter
  @prompt.deleter
  def prompt(self):
      print('Deleting prompt')
      del self.__prompt

# Nada del uso cambia
c = MyClass()
print(c.prompt)
c.prompt = "other thing"      # Error
c.prompt = "Hello from Earth"  # OK
del c.prompt
```

Con esto el acceso y modificación de atributos funciona igual que antes y no es necesario modificar nada del código que usa estos atributos. Por lo tanto:
- No implementes métodos get/set por defecto.
- Solo cuando necesites un comportamiento complejo, usa `@property`, `@<attr>.setter` y `@<attr>.deleter`.





## Referencias

- [Generator Tricks for Systems Programmers - Version 2.0](http://www.dabeaz.com/generators-uk/)
