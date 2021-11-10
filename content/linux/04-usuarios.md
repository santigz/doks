---
title: "Usuarios"
description: "Usuarios"
date: 2021-10-21T15:21:01+02:00
lastmod: 2021-10-21T15:21:01+02:00
draft: false
slug: usuarios
menu:
  linux:
    parent: linux
weight: 140
toc: true
---

## Usuarios y servicios

Es muy importante saber gestionar bien usuarios y permisos, ya que un mecanismo básico de seguridad es que **cada servicio se ejecute bajo su propio usuario.**

Debemos entender un usuario no como una persona que usa el sistema, sino como un mecanismo de seguridad para restringir el alcance de los procesos en ejecución.


## Configuración del usuario

Ver los permisos que tengo:
```
$ id           # ID del usuario actual admin
uid=1000(admin) gid=1000(admin) groups=1000(admin),4(adm),27(sudo),119(lpadmin)
```

Para consultar estos datos de un usuario cualquiera: `id <user>`.

Internamente toda esta información se almacena en:
- `/etc/passwd`: datos básicos del usuario (hace tiempo que ya no almacena los passwords).
- `/etc/groups`: grupos del sistema y pertenencia de usuarios a grupos.
- `/etc/shadow`: almacens hashes de los passwords.

Un usuario tiene siempre un grupo principal y una lista opcional de grupos secundarios.

Se utilizan los comandos proporcionados por la [Tool Suite Shadow](https://pkg-shadow.alioth.debian.org/features.php) en vez de modificar a mano los ficheros `passwd` y `groups` para evitar dejar inconsistencias que puedan evitar que el sistema reinicia con normalidad. Algunos de estos comandos son:

- `useradd` crea un usuario.
- `userdel` elimina un usuario.
- `groupadd` crea un grupo.
- `usermod` edita atributos de un usuario.
- `chsh` edita la shell por defecto de un usuario.
- `chage` (_change age_) edita las fechas de expiración de la contraseña de un usuario.
- `id` muestra los grupos de un usuario.


## Tipos de usuarios

A la hora de crear un usuario deberemos pensar su finalidad:

- **Usuario final (persona):** necesitará un directorio de inicio, un password, posibilidad de entrar en shell interactiva, datos del usuario, etc.
- **Usuario de servicio:** convendrá no darle nada de lo anterior, ni siquiera un password para evitar loguins indeseados. Pero sí que permitirá ejecutar un proceso con los permisos de ese usuario, por ejemplo para que únicamente pueda leer los ficheros de un directorio.

Por ejemplo, el servidor Nginx:
- Se ejecuta con el usuario llamado generalmente `nginx` (CentOS) o `www-data` (Ubuntu):
  ```yaml
  $ id nginx
  uid=995(nginx) gid=993(nginx) groups=993(nginx)
  ```
- Este usuario solo tiene permisos para leer (no escribir) la configuración de Nginx (solo la puede editar el administrador):
  ```yaml
  $ ls -al /etc/nginx/
  drwxr-xr-x   8 root root 4096 oct 24 11:27 .
  drwxr-xr-x 107 root root 4096 oct 26 00:24 ..
  drwxr-xr-x   2 root root 4096 abr 21  2020 conf.d
  -rw-r--r--   1 root root 1077 feb  4  2019 fastcgi.conf
  -rw-r--r--   1 root root 1007 feb  4  2019 fastcgi_params
  -rw-r--r--   1 root root 1490 feb  4  2019 nginx.conf
  ...
  ```
- De manera similar puede leer (no escribir) los ficheros servidos a los clientes web:
  ```yaml
  $ ls -al /var/www/html
  drwxr-xr-x  4 root root  33 nov  2 14:14 .
  drwxr-xr-x 20 root root 280 nov  2 14:14 ..
  -rw-r--r--  2 root root   6 oct  9 00:04 index.html
  ...
  ```
- De este modo, **si una vulneración compromete a Nginx**, el alcance de la brecha de seguridad se verá limitado y no podrá modificar estos ficheros porque los permisos de su usuario no se lo permite en ningún caso.

###


## Deshabilitar usuario

Hay varias posibilidades para deshabilitar un usuario:

- `passwd -l <user>`

  Deshabilita el uso del password del usuario, pero seguirá pudiendo autenticarse por clave SSH.

- `usermod -s /sbin/nologin <user>`

  Modifica la shell del usuario pasando de algo como `/etc/bash` a `/etc/nologin`. Esto hace que la sesión finalice inmediatamente al intentar entrar.
  De poco sirve en servidores: `ssh user@host /bin/bash` va a ejecutar bash sin intentar abrir antes la shell por defecto.

- `usermod --lock --expiredate 1970-01-02 <user>`

  Bloquea el password del usuario y marca al usuario como deshabilitado desde una fecha pasada. **Es la forma recomendada.**
