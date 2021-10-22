---
title: "OOP y clases"
description: "OOP y clases en Python."
lead: "OOP y clases en Python."
date: 2021-10-01T15:21:01+02:00
lastmod: 2021-10-01T15:21:01+02:00
draft: false
images: []
menu:
  python:
    parent: "python"
weight: 130
toc: true
---

## Orientaición a objetos

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
    aatr2 = 'hola'

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

Aún así, Python tiene un simulacro de método privado si el nombre comienza por doble underscore `__`, pero al final siempbre se puede llegar a invocar.
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

¡Python no tiene itnterfaces!

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

¿Por qué es esto posible? Porque los tipos no se determinan en tiempo de compilaicón sino en tiempo de ejecución. Por el **duck typing**.


## Protocolos

Son una convención de que en ciertos momentos se van a invocar ciertos métodos sobre un objeto.

Por ejemplo, para obtener la longitur de algo (lista, etc.), se usa la función `len()`, que internamente llama a la función `__len__` del objeto:
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
