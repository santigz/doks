---
title: "Nombre y hora"
description: "Nombre y hora"
date: 2021-10-21T15:21:01+02:00
lastmod: 2021-10-21T15:21:01+02:00
draft: false
images: []
menu:
  linux:
    parent: linux
weight: 110
toc: true
---

## Nombre del host
Comando clásico para ver el nombre:
```
$ hostname
mymachine
```

Los sistemas con Systemd tienen esta herramienta:
```
$ hostnamectl
   Static hostname: mymachine
         Icon name: computer-laptop
           Chassis: laptop
        Machine ID: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
           Boot ID: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  Operating System: Ubuntu 21.04
            Kernel: Linux 5.13.8-zen-care
      Architecture: x86-64
```

Para cambiar el nombre de la máquina:
```
$ hostnamectl set-hostname <new-name>
```

Mira la ayuda con `hostnamectl --help`.

## Zona horaria
Para visualizarla:
```
$ timadatectl
               Local time: vie 2021-10-22 20:51:34 CEST
           Universal time: vie 2021-10-22 18:51:34 UTC
                 RTC time: vie 2021-10-22 18:51:34
                Time zone: Europe/Madrid (CEST, +0200)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no
```

Si quieres cambiar la zona horaria, puedes ver la lista de todas las que hay con:
```
$ timedatectl list-timezones
Africa/Abidjan
Africa/Accra
Africa/Addis_Ababa
[...]
```

Para cambiar la zona horaria del sistema, por ejemplo:
```
$ timedatectl set-timezone Europe/Madrid
```

Mira la ayuda con `timedatectl --help`.

