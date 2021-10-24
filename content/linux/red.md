---
title: "Configuración de red"
description: "Configuración de red"
date: 2021-10-21T15:21:01+02:00
lastmod: 2021-10-21T15:21:01+02:00
draft: false
images: []
menu:
  linux:
    parent: linux
weight: 120
toc: true
---


## Configuración de red
Si miras manuales ten en cuenta que en Linux se solía usar el tradicional `ifconfig`, pero actualmente casi todas las distribuciones se han pasado al comando `ip`.

### Dirección IP
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

### DNS
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

