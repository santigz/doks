---
title: Rsync
description: Despliegue con scp y rsync
date: 2021-01-25
lastmod: 2021-01-25
draft: false
images: []
toc: true
---


Vamos a ver primero scp como un comando básico para transferir ficheros a un servidor, antes de ver rsync, que es más completo.

## scp

En el formato de scp, tanto el origen como el destino pueden ser locales (no hay `host:`) o remotos:
```shell
$ scp HOST_ORIG:DIR_ORIG HOST_DEST:DIR_DEST
```

{{< alert icon="👉" >}}
El host puede estar indicado de diversas formas:
- IP: `scp dir user@1.2.3.4:`
- Nombre: `scp dir user@domain.tld`
- Configuración ssh: `scp dir machine:`
{{< /alert >}}

Subir ficheros/directorios de una máquina local a una remota (`-r` es recursivo para directorios):

```shell
(local)$ scp -r proyecto despliegue:
(remoto)$ sudo mv proyecto /var/www/ejemplo-php
```

Para hacerlo directamente en el destino (solo si el usuario configurado en `despliegue` tiene permisos de escritura en el destino):
```shell
(local)$ scp -r proyecto/* despliegue:/var/www/ejemplo-php
```

## rsync
```shell
(local)$ rsync proyecto despliegue:/var/www/ejemplo-php
```

SCP vs. RSYNC:
- scp es muy básico (y efectivo). Rsync tiene un montón de opciones y usos elaborados.
- scp copia siempre todos los ficheros indicados.
- rsync compara los ficheros y sólo copia los que tienen alguna modificación que subir.
- rsync ejecuta en la máquina de destino el proceso rsync como servidor.
- rsync puede retomar ficheros que quedaron parcialmente copiados de una copia cortada anterior (muy útil para ficheros pesados).
- rsync es usado como sistema de backup completo.


Opciones importantes en rsync:

- El slash final en un directorio es importante: ej. `dir` significa "el directorio dir", y `dir/` significa "todos los contenidos de ese directorio":
  - `rsync dir remoto:/var/www` -> se creará el directorio `/var/www/dir`
  - `rsync dir/ remoto:/var/www` -> se copiarán los ficheros directamente en `/var/www` en vez de `/var/www/dir`

- `-a, --archive` (archive): equivale a las opciones `-rlptgoD` (ver en el manual). Hace copia recursiva, preserva links simbólicos, tiempos de modificación de ficheros, usuario, grupo, permisos...
  - Es muy habitual usar `rsynv -av orig dest` (archive, verbose)
- `-n, --dry-run` muestra la lista de los ficheros que va a copiar, pero no realiza la copia realmente.
- `-P` (equivale a `--partial --progress`): recupera la subida de un fichero que quedó a medias sin comenzar de nuevo, y muestra el progreso.
- `--chown USER:GROUP` permite establecer propietario y grupo de los ficheros en el destino.



Enlaces:
- <https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories>


