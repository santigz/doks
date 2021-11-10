---
title: "Colecciones"
description: "Colecciones de Python."
lead: "Colecciones de Python."
date: 2021-10-01T15:21:01+02:00
lastmod: 2021-10-01T15:21:01+02:00
draft: false
slug: colecciones
menu:
  python:
    parent: "python"
weight: 130
toc: true
---


## Listas

Las listas contienen tipos heterogéneos:
```python
mixed = [1, 2, "Hola", 3.141]
```

Edición de elementos:
```python
x.append(-5)      # Añade al final
x.insert(2, 100)  # Añade 100 en la posición 2
x.remove(7)       # Elimina el primer elemento con valor 7

del x[0]          # Elimina el elemento en posición 0
```

Otras operaciones:
```python
'Hola' in x       # Comprueba existencia
'Hola' not in x

merged = [1, 2, 3] + [4, 5, 6]  # Une elementos
len(merged)                     # Número de elementos
```

Para copiar una lista hay que ser explícito:
```python
y = x     # y es un puntero a la misma lista que x
y = x[:]  # y tiene una copia de x
```

### Slicing

El formato para obtener sub-listas es `lista[start:stop:step]`:

```python
x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
x[0]
x[3:5]      # Rango concreto
x[1:5:2]    # Del 1 al 5 de pasos de 2
x[::2]      # Cada dos elementos

x[-3]       # Últimos tres números
x[::-1]     # Invierte la lista
reversed(x) # Lo mismo
```

Con strings:
```python
name = "Hello World"
name[2]     # 'l'
name[::-1]  # 'dlroW olleH'
```


### Comprensión de listas

Permite recorrer, filtrar y operar sobre una lista.
Tiene cierta similitud con la programación funcional: `[x for x in list if condition]`.

Ejemplo para filtrar en una lista:
```python
fruits = ['apple', 'banana', 'cherry', 'kiwi', 'mango']
newlist = [x for x in fruits if 'a' in x]
# ['apple', 'banana', 'mango']
```

Realizar operaciones:
```python
numbers = range(10)
squared = [i**i for i in numbers]
# [1, 1, 4, 27, 256, 3125, 46656, 823543, 16777216, 387420489]

modified = [i if i > 2 else 'nada' for i in numbers if i < 5]
# ['nada', 'nada', 'nada', 3, 4]
#   Sólo se puede filtrar con un if después del for
#   Antes del for puede haber otro if, pero siempre con un else
```




## Tuplas

Una tupla es una lista inmutable. Se usa para empaquetar objetos juntos, ej. hacer un _return_ con varios valores.

```python
tupla = (1, 2, 3)
tupla[0] = 4       # ERROR!

lista = list(tupla)        # Lo convierte en lista
tupla = tuple(lista)
```

**¡Los paréntesis en una tupla son opcionales!**

La desestructuración en tuplas y listas permite obtener valores individuales.
```python
a, b = [1, 2]
print(a)
print(b)

(a, b) = (1, 2)  # Mismo resultado
```

La función `enumerate()` devuelve una tupla:
```python
names = ["Franz", "Susanne", "Hans", "Herbert", "Peter", "Max", "Lisa"]

for i, name in enumerate(names):
    print(i, name)

# 0 Franz
# 1 Susanne
# 2 Hans
# ...
```

## Diccionarios

```python
features = {
  'color': 'pink',
  'height': 1.28,
  'occurences': 4
}

# Leer y modificar
features['color']
features['height'] = 3.33

# Añadir valores al dict
features['status'] = 'active'
```

Obtener la lista de claves y valores:
```python
features.keys()
features.values()
```

Comprobar elementos:
```python
if 'stauts' in features:
    del features['status']
```

Bucles sobre diccionarios:
```python
for key in features:
    print(key, ' -> ', features[key])

for key, item in features.items():
    print(key, ' -> ', item)
```

### Switch con un diccionario

En ocasiones es útil implementar un switch usando un diccionario, por ejemplo:
```python
def func1():
    pass
def func2():
    pass
def func3():
    pass

switch = {'word1': func1, 'word2': func2, 'word3': func3}
switch[the_word]()  # Execute the function returned by the dictionary
```


## Sets

```python
a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

a | b  # union
a & b  # intersection
a - b  # difference
```

## Otras consideraciones

### Range

La función `range` se usa con frecuencia en bucles y no crea una lista, sino que es un iterador, por lo que no necesita cargar en memoria todo el rango.

```python
for i in range(3, 5):
    print(i)

# Esto es muy eficiente en memoria
result = 0
for i in range(5_000_000):
    result += i
print(result)

# Un cast recorre todo el rango y lo carga en memoria para crear la lista
all_nums = list(range(3000))
```


### Pass

Es usado para indicar una no-operación. Se usa, por ejemplo, cuando quieres indicar una función o bloque sin contenido, quizás porque aún está en desarrollo:
```python
def my_function():
    pass
    # Todo bloque debe contener al menos una operación, o da error
```


