---
title: "Systemd"
description: "Systemd"
date: 2021-10-21T15:21:01+02:00
lastmod: 2021-10-21T15:21:01+02:00
draft: false
slug: servicios
menu:
  linux:
    parent: linux
weight: 130
toc: true
---


## Intro

Cuando el sistema arranca, el kernel se encarga de lanzar un único proceso: el gestor de servicios, que es el proceso con PID 1.

Esto lo puedes comprobarlo con el comando `pstree`:
<pre>
<code style="line-height: 1rem" class="language-text hljs language-plaintext">$ pstree
systemd─┬─ModemManager───2*[{ModemManager}]
        ├─NetworkManager───2*[{NetworkManager}]
        ├─gdm3─┬─gdm-session─┬─gdm-x-sess─┬─Xorg───2*[{Xorg}]
        │      │             │            ├─gnome-sess───2*[{gnome-sess}]
        │      │             │            └─2*[{gdm-x-session}]
        │      │             └─2*[{gdm-session-wor}]
        │      └─2*[{gdm3}]
        ├─named───25*[{named}]
        ├─systemd─┬─(sd-pam)
        │         ├─GeckoMain─┬─Privileged Cont───26*[{Privileged Cont}]
        │         │           └─Web Content───32*[{Web Content}]
        │         └─gnome-session-b─┬─evolution-alarm───5*[{evolution-alarm}]
        │                           ├─gsd-disk-utilit───2*[{gsd-disk-utilit}]
        │                           └─3*[{gnome-session-b}]
        └─systemd-resolve
</code>
</pre>

Algo de historia:
- **SysV init:** el gestor inicial de UNIX System V de 1983.
- **Upstart:** intento (fallido) de Canonical en 2006 para reemplazar a init en Ubuntu. Usa el comando `service`, que aún se encuentra en algunos tutoriales.
- **Systemd:** desarrollado por Red Hat en 2010. En la actualidad lo usan la mayoría de distribuciones Linux (incluido Ubuntu). Comando `systemctl`.


## Systemd

Systemd es el gestor de servicios que usan la mayoría de las distribuciones Linux.

Listar todos los servicios del sistema:
```bash
$ systemctl
```

Ver el estado de un servicio, por ejemplo el resolvedor DNS del sistema:
```bash
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

Puedes detener un servicio con `stop` y arrancarlo con `start`. Ejemplo con `systemd-resolved`, el resolver DNS integrado en Systemd:
```bash
$ systemctl stop systemd-resolved.service
```

Tras modificar los ficheros de configuración de un servicio, lo habitual es reiniciarlo para que los vuelva a leer. Ejemplo con `httpd`, el servicio de apache:
```bash
$ systemctl restart httpd.service
$ systemctl restart httpd      # Si no acabas en .service, se autocompleta
```

La ayuda nos dice los comandos que soporta una unidad:
```bash
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


## System units

Cada tipo de unidad de Systemd gestiona una funcionalidad diferente. Algunas de ellas:

| Tipo de unidad | Nombre del fichero | Descripción                          |
| -------------- | ------------------ | ------------------------------------ |
| Service unit   | `<name>.service`   | Un servicio del sistema.             |
| Target unit    | `<name>.target`    | Grupo de unidades de systemd.        |
| Path unit      | `<name>.path`      | Un directorio o fichero del sistema. |
| Timer unit     | `<name>.timer`     | Temporizador de systemd.             |

Puedes crear ficheros de unidades en cualquier ruta, pero hay algunas que Systemd lee por defecto al arrancar, ej:
- `/etc/systemd/system`: unidades de sistema.
- `~/.config/systemd/user`: unidades de usuario (si hay alguna).
- `/lib/systemd/system/`: unidades de paquetes de software (apt, rpm...)

Puedes ver las unidades y ficheros de unidad y sus estados:
```bash
$ systemctl list-units
$ systemctl list-unit-files
```

El comando `systemctl status <unit>` muestra la ruta donde está instalada la unidad.


## Arranque automático
Los siguientes comandos establecen el inicio (start) automático de unidades en el arranque del sistema:
```bash
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
```bash
$ systemctl enable --now httpd.service
```


## Targets

Los targets de Systemd son unidades `.target` que representan un grupo de unidades.
El propósito de los targets es poder crear una **cadena de dependencias** entre diferentes targets para poder ejecutar en paralelo aquellos que no dependen entre si y acelerar la carga del sistema. Por ejemplo, el target `graphical` puede implicar la ejecución del `gdm.service` (GNOME Desktop Manager), pero el `network.target` se podrá iniciar independientemente.

El sistema clásico de SysV init definía seis niveles de ejecución del sistema, que corresponde a diferentes estados en los que se puede encontrar el sistema.

| Runlevel | Target unit         | Descripción                            |
| -------- | ------------------- | -------------------------------------- |
| 0        | `poweroff.target`   | Cierra y apaga (power off) el sistema. |
| 1        | `rescue.target`     | Abre una shell de rescate.             |
| 2, 3, 4  | `multi-user.target` | Sistema multiusuario sin gráficos.     |
| 5        | `graphical.target`  | Sistema multiusuario con gráficos.     |
| 6        | `reboot.target`     | Cierra y reinicia el sistema.          |

Al arrancar el sistema, Systemd se encarga de arrancar el target por defecto, lo cual desencadena la carga de todas sus dependencias.

Puedes consultar el target por defecto (se puede cambiar con `set-default`, pero no es habitual):
```bash
$ systemctl get-default
graphical.target
```

Si listas los targets, verás que Systemd incluye bastantes más targets:
```bash
systemctl list-units --type target
```

En cualquier momento puedes llevar al sistema a un target diferente:
```bash
$ systemctl isolate <target>
```

{{< alert icon="👉" text="La forma final de apagar el sistema es llevar el sistema al target de poweroff. Comandos como <code>shutdown</code> y <code>reboot</code> sin simples alias para ello.<br>Prueba: <code>systemctl isolate reboot.target</code>" />}}

<br>

Puedes listar el árbol de dependencias de una unidad (ver [ejemplo más detallado](https://trstringer.com/Getting-systemd-Unit-Dependencies/)):
```bash
# Unidades de las que depende la que indicas
$ systemctl list-dependencies local-fs.target

# Unidades que dependen de la que indicas
$ systemctl list-dependencies --reverse local-fs.target
```




