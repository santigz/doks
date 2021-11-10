---
title : "SSH cosa t"
description: "SSH cosa desc"
date: 2020-10-06T08:48:23+00:00
lastmod: 2020-10-06T08:48:23+00:00
draft: false
images: []
toc: true
---

## SSH

SSH es un protocolo seguro de transmisión de datos. Permite conexión remota a un servidor y creación de túneles cifrados.

Resumen de los contenidos:

|                                  |                                       |
| ---------                        | ----                                  |
| `ssh-keygen -t ed25519`          | Crea una clave.                       |
| `ssh-copy-id user@server`        | Copia la clave pública a un servidor. |
| `ssh user@server`                | Entra en el servidor.                 |
| `ssh -i fichero_clave user@host` | Indica una clave concreta.            |


Más info en: [www.ssh.com/academy/ssh](https://www.ssh.com/academy/ssh).


![](https://www.ssh.com/hubfs/Imported_Blog_Media/SSH_simplified_protocol_diagram-2.png)

## Claves publica/privada

SSH funciona por sistema de claves asimétricas con una clave pública y otra privada.

### Creación de claves

Para crear una clave se usa el comando `ssh-keygen`. Siempre se crea con un algoritmo de cifrado concreto:
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

→ Abre los ficheros con un editor de texto plano (o con `cat`) para ver su aspecto.


### Copiar la clave pública

Con este comando puedes copiar la clave pública (¡no la privada!) al servidor. Necesitarás un sistema alternativo de autenticación (password, clave alternativa ya instalada...):
```txt
$ ssh-copy-id ~/.ssh/id_ed25519.pub user@host
```

Con esto ya deberías poder acceder al servidor.

Lo único que hace es **copiar la clave pública** al fichero del servidor `~/.ssh/authorized_keys`. Mira sus contenidos.

Este paso lo puedes realizar manualmente, ya que es simplemente copiar una línea de texto.



```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

