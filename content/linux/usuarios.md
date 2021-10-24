---
title: "Usuarios en Linux"
description: "Usuarios en Linux"
date: 2021-10-21T15:21:01+02:00
lastmod: 2021-10-21T15:21:01+02:00
draft: false
images: []
menu:
  linux:
    parent: linux
weight: 130
toc: true
---


## Configuración del usuario

Ver los permisos que tengo:
```
$ id           # ID del usuario actual admin
uid=1000(admin) gid=1000(admin) groups=1000(admin),4(adm),27(sudo),119(lpadmin)
```

Para consultar estos datos de un usuario cualquiera: `id <user>`.

En realidad este comando accede a los datos de los ficheros `/etc/passwd` y `/etc/group`, que también se pueden consultar a mano.


## Gestión de servicios

Cuando el sistema arranca, el kernel se encarga de lanzar un único proceso: el gestor de servicios, que es el proceso con PID 1.

Esto lo puedes comprobarlo con el comando `pstree`.

Algo de historia:
- **SysV init:** el gestor inicial de UNIX System V de 1983.
- **Upstart:** intento (fallido) de Canonical en 2006 para reemplazar a init en Ubuntu. Usa el comando `service`, que aún se encuentra en algunos tutoriales.
- **Systemd:** desarrollado por Red Hat en 2010. En la actualidad lo usan la mayoría de distribuciones Linux (incluido Ubuntu). Comando `systemctl`.

Listar todos los servicios del sistema:
```
$ systemctl
```

Ver el estado de un servicio, por ejemplo el resolvedor DNS del sistema:
```
	$ systemctl status systemd-resolved.service
	● systemd-resolved.service - Network Name Resolution
     Loaded: loaded (/lib/systemd/system/systemd-resolved.service; enabled; vendor preset: enab>
     Active: active (running) since Thu 2021-10-21 14:13:08 CEST; 1 day 7h ago
       Docs: man:systemd-resolved.service(8)
             man:org.freedesktop.resolve1(5)
             https://www.freedesktop.org/wiki/Software/systemd/writing-network-configuration-ma>
             https://www.freedesktop.org/wiki/Software/systemd/writing-resolver-clients
   Main PID: 886 (systemd-resolve)
     Status: "Processing requests..."
      Tasks: 1 (limit: 28589)
     Memory: 9.3M
     CGroup: /system.slice/systemd-resolved.service
             └─886 /lib/systemd/systemd-resolved
```

Detener el servicio con `stop` y arrancar con `start`:
```
$ systemctl stop systemd-resolved.service
```

Es frecuente reiniciar servicios:
```
$ systemctl restart eystemd-resolved.service
```

### Unidades en Systemd


Tipos de unidades de Systemd:

| Tipo de unidad | Nombre del fichero | Descripción                          |
| -------------- | ------------------ | ------------------------------------ |
| Service unit   | `<name>.service`   | Un servicio del sistema.             |
| Target unit    | `<name>.target`    | Grupo de unidades de systemd.        |
| Path unit      | `<name>.path`      | Un directorio o fichero del sistema. |
| Timer unit     | `<name>.timer`     | Temporizador de systemd.             |

Ubicaciones de ficheros de unidades:
- `/etc/systemd/system` mantenidas por el administrador. **Instala aquí las tuyas.**
- `/usr/lib/systemd/system` instaladas con la distribución.
- `/run/systemd/system` no persistentes, en tiempo de ejecución.

Puedes ver las unidades y ficheros de unidad y sus estados:
```
$ systemctl list-units
$ systemctl list-unit-files
```

## Arrancar o detener servicios
La ayuda nos dice los comandos que soporta una unidad:
```
$ systemctl --help
[...]
  start UNIT...                       Start (activate) one or more units
  stop UNIT...                        Stop (deactivate) one or more units
  reload UNIT...                      Reload one or more units
  restart UNIT...                     Start or restart one or more units
  try-restart UNIT...                 Restart one or more units if active
  reload-or-restart UNIT...           Reload one or more units if possible,
                                      otherwise start or restart
[...]
```


Por ejemplo (`httpd` es el servicio de Apache):
```
$ systemctl restart httpd.service
```


## Configurar arranque automático
Los siguientes comandos establecen el inicio (start) automático de unidades en el arranque del sistema:
```
$ systemctl --help
[...]
Unit File Commands:
  list-unit-files [PATTERN...]        List installed unit files
  enable [UNIT...|PATH...]            Enable one or more unit files
  disable UNIT...                     Disable one or more unit files
  reenable UNIT...                    Reenable one or more unit files
  is-enabled UNIT...                  Check whether unit files are enabled
[...]
```

Si hacemos `start` en un servicio, lo arranca en el momento, pero no será persistente si reiniciamos el sistema. Para conseguir esto, tendremos que habilitar la unidad con `enable`. Es frecuente hacer estas dos acciones a la vez:
```
$ systemctl enable --now httpd.service
```


## Otras operaciones




