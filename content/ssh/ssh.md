---
title: "SSH"
description: ""
date: 2021-10-26T00:47:04+02:00
lastmod: 2021-10-26T00:47:04+02:00
draft: true
menu:
  linux:
    parent: "linux"
images: []
---


## Crear claves

```txt
$ ssh-keygen -t ed25519
Generating public/private ed25591 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25591):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/user/.ssh/id_ed25591.
Your public key has been saved in /home/user/.ssh/id_ed25591.pub.
The key fingerprint is:
SHA256:Up6KjbnEV4Hgfo75YM393QdQsK3Z0aTNBz0DoirrW+c user@klar
The key's randomart image is:
+---[RSA 2048]----+
|    .      ..oo..|
|   . . .  . .o.X.|
|    . . o.  ..+ B|
|   .   o.o  .+ ..|
|    ..o.S   o..  |
|   . %o=      .  |
|    @.B...     . |
|   o.=. o. . .  .|
|    .oo  E. . .. |
+----[SHA256]-----+
```

## Conexión SSH

- ssh
- ssh -i

## Fichero de configuración

`~/.ssh/config`

## Copia de ficheros

- scp
- rsync

## Servidor SSH

## Túneles SSH

### Forward tunnel


### Reverse tunnel

