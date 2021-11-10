---
title: "Nombre y hora"
description: "Nombre y hora"
date: 2021-10-21T15:21:01+02:00
lastmod: 2021-10-21T15:21:01+02:00
slug: configuracion-inicial
draft: false
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
$ timedatectl
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


## NTP

NTP (Network Time Protocol) es el protocolo creado para sincronizar la hora de un host con un servidor de hora NTP.

Los centros que tienen relojes atómicos (o sistemas alternativos) para obtener la hora con precisión cuentan con un servidor NTP de _stratum-0_ para ser una fuente horaria.

A partir del _stratum-0_ hay una jerarquía de servidores NTP de hasta 16 niveles. Los niveles más bajos añaden algunos milisegundos de imprecisión. Conectarse a un servidor de estrato más alto evita que no se saturen los de estrato alto.

[Jararquía de estratos NTP](https://www.galsys.co.uk/news/wp-content/uploads/Stratum-System.png)


En España, el Real Instituto y Observatorio de la Armada en San Fernando (ROA) ([artículo de 2020](https://www.larazon.es/espana/20200411/f6mkrbm2qzebjdid3w2qbhwf7e.html)) tiene un reloj atómico:
- Puedes [comprobar en su web el retraso de tu ordenador.](https://armada.defensa.gob.es/ArmadaPortal/page/Portal/ArmadaEspannola/cienciaobservatorio/prefLang-en/06Hora--01QueHoraEs)
- Tiene [dos servidores NTP](https://armada.defensa.gob.es/ArmadaPortal/page/Portal/ArmadaEspannola/cienciaobservatorio/prefLang-es/06Hora) _stratum-1_ que son sistemas oficiales de la hora del país: **hora.roa.es** y **minuto.roa.es**. Los puedes usar sin problema.

### Configurar NTP

Todas las distribuciones incluyen sincronización horaria por NTP, por lo que configurarlo es más por curiosidad que por necesidad.

Si tu sistema usa el NTP de Systemd, se configura en `/etc/systemd/timesyncd.conf`:
```ini
[Time]
NTP=hora.roa.es minuto.roa.es
```

Reinicia la sincronización de tiempo para que recargue la configuración:
```
$ systemctl restart systemd-timesyncd
```

Comprueba la configuración de hora y fíjate en el `NTPMessage`:
```ini
$ timedatectl show-timesync --all
LinkNTPServers=
SystemNTPServers=hora.roa.es minuto.roa.es
FallbackNTPServers=ntp.ubuntu.com
ServerName=hora.roa.es
ServerAddress=150.214.94.5
RootDistanceMaxUSec=5s
PollIntervalMinUSec=32s
PollIntervalMaxUSec=34min 8s
PollIntervalUSec=1min 4s
NTPMessage={
    Leap=0, Version=4, Mode=4, Stratum=1,   # Estrato 1
    Precision=-23, RootDelay=0,
    RootDispersion=1.068ms, Reference=ROA,
    OriginateTimestamp=Thu 2021-10-28 12:12:27 CEST,
    ReceiveTimestamp=Thu 2021-10-28 12:12:27 CEST,
    TransmitTimestamp=Thu 2021-10-28 12:12:27 CEST,
    DestinationTimestamp=Thu 2021-10-28 12:12:27 CEST,
    Ignored=no PacketCount=1, Jitter=0
}
Frequency=11460139
```
