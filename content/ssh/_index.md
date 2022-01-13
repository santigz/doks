---
title : "SSH"
description: "Confoguración de SSH como cliente"
date: 2020-10-06T08:48:23+00:00
lastmod: 2020-10-06T08:48:23+00:00
draft: false
images: []
toc: true
mermaid: true
---

## Intro

SSH es un protocolo seguro de transmisión de datos. Permite conexión remota a un servidor y creación de túneles cifrados.

- Más info en [www.ssh.com/academy/ssh](https://www.ssh.com/academy/ssh)

| Resumen de los contenidos:       |                                        |
| ---------                        | ----                                   |
| `ssh-keygen -t ed25519`          | Crea una clave.                        |
| `ssh-copy-id -i key user@server` | Copia una clave pública a un servidor. |
| `ssh user@server`                | Entra en el servidor.                  |
| `ssh -i key user@host`           | Entra con una clave concreta.          |


SSH tiene un componente de transporte seguro y también permite autenticación y tunelado seguro:

<span class="hljs-keyword" style="display:block; unicode-bidi:embed; font-family:monospace; white-space:pre; line-height:normal; text-align:center; font-size: 1rem; font-weight:bold;">
┌────────────────────────┬────────────────────────┐
│                        │                        │
│   SSH AUTHENTICATION   │     SSH CONNECTION     │
│        PROTOCOL        │        PROTOCOL        │
│                        │    (secure tunnels)    │
│                        │                        │
├────────────────────────┴────────────────────────┤
│                                                 │
│          SSH TRANSPORT LAYER PROTOCOL           │
│               - Autenticación                   │
│               - Confidencialidad                │
│               - Integridad                      │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│               TCP: entrega fiable               │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│             IP: entrega entre redes             │
│                                                 │
└─────────────────────────────────────────────────┘
</span>


## Claves publica/privada

SSH funciona por sistema de claves asimétricas con una clave pública y otra privada.

### Creación de claves

Las claves se crean siempre con un algoritmo de cifrado concreto:
- Cliente y servidor deben soportar el algoritmo usado (versiones antiguas...)
- `ed25519` es el algoritmo más seguro actualmente.
- `rsa` el más compatible.

Mostrando la ayuda o el manual puedes ver los algoritmos de claves:
```bash
$ ssh-keygen --help
usage: ssh-keygen ...
          [-t dsa | ecdsa | ecdsa-sk | ed25519 | ed25519-sk | rsa]
          ...
```

En el siguiente ejemplo vemos que:
- La clave por defecto se llama `/home/user/.ssh/id_ed25519`
- Podemos cambiar el nombre por defecto.
- Podemos añadir un _passphrase_ a la clave (o dejarlo en blanco).
- Si añadimos _passphrase_ nos lo pedirá para "desbloquear" la clave.
```txt
$ ssk-keygen -t ed25519
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in id_ed25519
Your public key has been saved in id_ed25519.pub
The key fingerprint is:
SHA256:B6QX4yO0KtU2Zs97U7tGFseux3AXzlR3UqmvZ/HrHEo user@myhost
The key's randomart image is:
+--[ED25519 256]--+
|      . +      ++|
|     o * o    ..B|
|    . X =     .o*|
|   . + * o   . +o|
|  . .   S . . =.o|
|   .     o ..oo*o|
|        . o .Eo=o|
|         . .. ++o|
|             .o+o|
+----[SHA256]-----+
```

Puedes comprobar que se ha creado una clave pública `id_ed25519.pub` y otra privada `id_ed25519.pub`.
```bash
$ ls ~/.ssh
id_ed25519  id_ed25519.pub
```


Los ficheros de las claves están codificados en ASCII y se pueden leer fácilmente. La clave pública tiene el siguiente formato:
```bash
$ cat ~/.ssh/id_ed25519
-----BEGIN OPENSSH PRIVATE KEY-----
[contenidos en ASCII...]
-----END OPENSSH PRIVATE KEY-----
```

La clave pública es más pequeña y tiene una única línea de texto con el siguiente formato:
```bash
$ cat ~/.ssh/id_ed25519.pub
ssh-ed25519 [contenidos de clave pública...] user@local-host
```

La clave privada es la más importante, ya que permite rehacer la clave pública. El siguiente comando imprime la clave pública a partir de la privada, lo cual permite guardar esa salida en la clave pública si la perdieses.
```bash
$ ssh-keygen -y -f ~/.ssh/id_ed25519
ssh-ed25519 [contenidos de clave pública...] user@local-host
```

### Copiar la clave pública

Con este comando puedes copiar la clave pública (¡no la privada!) al servidor. Necesitarás un sistema alternativo de autenticación (password, otra clave ya instalada...):
```txt
$ ssh-copy-id ~/.ssh/id_ed25519.pub user@host
```

Con esto ya deberías poder acceder al servidor.

Lo único que hace es **copiar la clave pública** al fichero del servidor `~/.ssh/authorized_keys`. Mira sus contenidos.

Este paso lo puedes realizar manualmente, ya que es simplemente copiar una línea de texto.



## Conectarse

Si tienes la clave privada en la ruta estándar, ej. `~/.ssh/id_ed25519`:
```bash
$ ssh user@remote-host
```

Si tu clave privada está en otra ruta, usa la opción `-i` para indicar el fichero de identidad:
```bash
$ ssh -i /ruta/a/la/clave-privada user@host
```
- Es habitual dar la extensión `.pem` a las claves privadas.

Para ver más información sobre la comunicación cliente/servidor usa la opción verbosa:
```bash
$ ssh user@remote-host -v
[...]
debug1: SSH2_MSG_SERVICE_ACCEPT received
debug1: Authentications that can continue: publickey
debug1: Next authentication method: publickey
debug1: Offering public key: /home/user/.ssh/id_ed25519 ED25519 SHA256:IyuOh75FHUDAo86sa0sJhYU9GJKAt8HSDL8yrIldfa8 explicit agent
debug1: Server accepts key: /home/user/.ssh/id_ed25519 ED25519 SHA256:IyuOh75FHUDAo86sa0sJhYU9GJKAt8HSDL8yrIldfa8 explicit agent
debug1: Authentication succeeded (publickey).
Authenticated to example.com ([3.14.156.9]:22).
[...]
user@remote-host $
```


## Permisos de las claves

Para tener buenos hábitos de seguridad, SSH lanza un error al usar una clave que tiene demasiados permisos.
```bash
$ chmod 400 /ruta/a/la/clave-privada
```


## Copia de ficheros
Con secure copy es muy fácil copiar ficheros entre máquinas locales y remotas en cualquier dirección:
```bash
$ scp <ruta_1> <ruta_2>       # Copia fichero
$ scp -r <ruta_1> <ruta_2>    # Copia recursiva (directorios)
```

Cada una de las rutas puede ser un fichero local o una ruta remota con el formato:
```bash
user@host:path
```

Sobre la ruta (path):
- Debes escribir **siempre** los dos puntos `:`
- Si la ruta comienza por barra, será una ruta absoluta: `user@host:/home/user/file`
- Si la ruta no comienza por barra, es relativa al home del usuario: `user@host:file`

Para copiar un fichero al home del remoto:
```bash
$ # Copia hacia el remoto
$ scp ./fichero user@host:

$ # Copia del remoto al directorio actual .
$ scp user@host:fichero .

$ # Indicando un nombre de destino diferente
$ scp fichero user@host:dir/nombre

$ # Copia dentro de un directorio (termina en barra)
$ scp fichero user@host:dir1/dir2/

$ # Copia recursiva con ruta absoluta
$ scp -r user@host:/etc .
```


## Ejecutar comandos remotos

Puedes entrar a la máquina remota y escribir comandos, o puedes:
```bash
$ ssh user@host 'ls -al'
```
Esto ejecuta el código en la máquina remota, muestra la salida y finaliza, volviendo a tu máquina local en un solo paso.

