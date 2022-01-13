---
title: "Configuración de red"
description: "Configuración de red"
date: 2021-10-21T15:21:01+02:00
lastmod: 2021-10-21T15:21:01+02:00
slug: red
draft: false
menu:
  linux:
    parent: linux
weight: 120
toc: true
---


Si miras manuales ten en cuenta que en Linux se solía usar el tradicional `ifconfig` del paquete [net-tools](https://www.linux.co.cr/ldp/lfs/appendixa/net-tools.html), pero actualmente casi todas las distribuciones se han pasado al comando `ip` del paquete [iproute2](https://en.wikipedia.org/wiki/Iproute2).

## Dirección IP
- Ver dirección IP:
  ```bash
  $ ip address show  # Comando completo
  $ ip a             # Abreviado
  $ ip -c a          # Con colores
  ```

- Ver tabla de enrutamiento y router por defecto:
  ```bash
  $ ip route show    # Comando completo
  $ ip r             # Abreviado
  $ ip -c r          # Con colores
  default via 192.168.1.1 dev eth0 proto dhcp metric 600
  169.254.0.0/16 dev eth0 scope link metric 1000
  192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.137 metric 600
  ```

## DNS
- Al arrancar el sistema se lee la configuración DNS del fichero `/etc/resolv.conf`:
  ```bash
  $ cat /etc/resolv.conf
  # Ejemplo de fichero con un servidor DNS
  nameserver 1.1.1.1
  ```
- La configuración DNS puede cambiar en ejecución. Para consultar la que tienes aplicada actualmente usa:
  ```bash
  $ resolvectl
    Global
        Protocols: -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
    resolv.conf mode: stub

    Link 2 (wlp0s20f3)
      Current Scopes: DNS
        Protocols: +DefaultRoute +LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
      Current DNS Server: 1.1.1.1
        DNS Servers: 1.1.1.1 192.168.1.1
  ```

## Puertos abiertos

Para ver los puertos abiertos que hay en una máquina usa:
- `ss` es el comando para investigar sockets.
- `-t` filtra por puertos TCP (no muestra UDP).
- `-n` muestra los puertos con número en vez de nombre.
- `-l` listen: puertos en modo escucha de aplicaciones que hacen de servidor.
- `-p` muestra procesos que hay detrás de cada puerto (requiere privilegios).
```bash
$ sudo ss -tnlp
```

