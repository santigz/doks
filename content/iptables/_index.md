---
title : "Iptables"
description: "Funcionamiento y comandos de iptables"
lead: ""
date: 2020-10-06T08:48:23+00:00
lastmod: 2020-10-06T08:48:23+00:00
draft: false
images: []
weight: 100
---
https://www.unix-ninja.com/p/An_iptables_cheat-sheet
https://gist.github.com/davydany/0ad377f6de3c70056d2bd0f1549e1017
https://www.andreafortuna.org/2019/05/08/iptables-a-simple-cheatsheet/



http://www.iana.org/assignments/protocol-numbers


# Configuración general
Mostrar el estado del firewall
    $ iptables -L
    $ iptables -L -n -v --line-numbers

Eliminar reglas de todas las cadenas o de una cadena concreta:
    $ iptables -F
    $ iptables -F INPUT

Establecer la política por defecto de una cadena con `-P` o `--policy`:
    $ iptables --policy INPUT DROP
    $ iptables --policy INPUT DROP
    $ iptables -P FORWARD ACCEPT

    $ iptables -t mangle -P PREROUTING DROP

Por lo tanto, para resetear completamente iptables hay que:
- Eliminar los contenidos de las cadenas con `-F` (flush).
- Establecer la política por defecto.


# Filtrado básico

Bloquear paquetes provenientes de una IP o un bloque:
    iptables -A INPUT -s 192.168.1.5 -j DROP
    iptables -A INPUT -s 192.168.0.0/16 -j DROP

Bloquear/Aceptar el tráfico TCP que sale de un proceso local hacia un servidor con nombre:
    iptables -A OUTPUT -p tcp -d example.com -j DROP
    iptables -A OUTPUT -p tcp -d mydomain.com -j ACCEPT

El origen `-s` (source) y el destino `-d` (destination) se pueden indicar como:
- Una IP concreta, ej. `10.0.0.1`
- Un bloque de IPs, ej. `10.0.0.0/8`
- Un nombre de dominio, ej. `example.com`. En este caso, iptables hace una consulta DNS para conocer las IPs asociadas al nombre, y creará una regla por cada una de las IPs. Si las IP del nombre cambian sería un problema.

Permitir
    iptables -A OUTPUT -p udp -o eth0 --dport 53 -j ACCEPT
    iptables -A INPUT -p udp -i eth0 --sport 53 -j ACCEPT

# REJECT OUTBOUND Connections for an IP on a Specific Port (SSH)
iptables -A OUTPUT -p tcp --dport ssh -s 10.10.10.10 -j REJECT

# DNAT
iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 80 -j DNAT --to-destination 192.168.1.3:8080

# Proxying
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8888

# Port forwarding
iptables -t nat -A PREROUTING -p tcp -d 1.2.3.4 --dport 422 -j DNAT --to 192.168.0.100:22

# SNAT
iptables -t nat -A POSTROUTING -o eth1 -j SNAT
iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE

# Allow HTTP web traffic
sudo iptables -A INPUT -p tcp --dport 80 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT
sudo iptables -A OUTPUT -p tcp --sport 80 -m conntrack --ctstate ESTABLISHED -j ACCEPT

