---
title: SSH config
description: Fichero de configuración SSH
date: 2021-01-25
lastmod: 2021-01-25
draft: false
images: []
toc: false
---

Fichero de configuración SSH: `~/.ssh/config`

Puedes configurar hosts, ej:
```ssh
Host maquina1
    Hostname 1.2.3.4
    User usuario

Host maquina2
    Hostname example.com
    User user

    # Si el servidor usa un puerto diferente del 22
    Port 8889  

    # Si necesitas un fichero concreto de clave de acceso
    IdentityFile ~/.ssh/privkey.pem
```

Ahora puedes usar tu config de manera sencilla:
```shell
$ ssh maquina1   # Hace ssh usuario@1.2.3.4
$ ssh maquina2   # Hace ssh -i ~/.ssh/privkey.pem -p 8889 user@example.com
```


Una sesión SSH se cierra cuando pasa cierto tiempo sin uso. Puedes añadir lo siguiente al final de tu config ssh para que se envie un paquete de tipo *keep_alive* y aumentar el tiempo de sesión:
```
# El asteristo hace que afecte a todos los hosts
Host *
	ServerAliveInterval 60
	ServerAliveCountMax 60
```
