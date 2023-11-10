---
title: Configuración general
description: Ficheros de configuración de Apache
date: 2023-10-16
lastmod: 2023-10-16
draft: false
menu:
  apache:
    parent: apache
weight: 100
toc: true
---

En este documento aprenderás aspectos de configuración de apache:
- Configuración principal
- Comprobación de la sintaxis
- Servidores virtuales
- Otras configuraciones
- Módulos
- Puertos de escucha


## Fichero principal

El fichero principal de configuración es `/etc/apache2/apache2.conf`.

{{< alert icon="👉" >}}
Estamos suponiendo una distribución Ubuntu. En otras distribuciones es posible que en vez de `apache2` se llame `httpd`.
{{< /alert >}}

Es habitual que los servidores virtuales se separen en ficheros diferentes, para lo que se usa la siguiente directiva:
```apache
# /etc/apache2/apache2.conf

# Include the virtual host configurations:
IncludeOptional sites-enabled/*.conf
```

Esto hace que Apache lea todos los ficheros de configuración dentro del directorio `/etc/apache2/sites-enabled`.

## Comprobar configuración
Siempre que modifiques cualqueir fichero de configuración de Apache pasa este comando para comprobar los errores:
```bash
$ sudo apache2ctl configtest
Syntax OK
```
Esto lee el fichero principal y todos los incluidos.

Si la sintaxis es correcta ya puedes reiniciar Apache:

```bash
$ sudo systemctl restart apache2
```




## Configuración de sitios

Apache trabaja con dos directorios de servidores virtuales:
- `sites-available/`: Los ficheros de este directorio no los lee Apache. Sirve para que el administrador pueda tener diferentes configuraciones que puede (des)habilitar. **Crea siempre tus ficheros en este directorio.**
- `sites-enabled/`: estos son los ficheros que Apache va a leer de verdad.

### a2ensite
Apache incluye comandos para habilitar servidores virtuales:
```bash
$ touch /etc/apache2/sites-available/misitio.conf
$ # Editas el fichero con tu configuración...
$
$ sudo a2ensite misitio
$ ls -al /etc/apache2/sites-enabled/
total 8
drwxr-xr-x 2 root root 4096 Oct 11 07:32 .
drwxr-xr-x 8 root root 4096 Oct 10 07:10 ..
lrwxrwxrwx 1 root root   33 Oct 11 07:32 misitio.conf -> ../sites-available/misitio.conf
```
Ahora Apache sí que leerá tu fichero de configuración.

Lo que hace el comanto `a2ensite` es simplemente crear un enlace suave desde el directorio `sites-enabled` hacia `sites-available`. Esto se puede hacer con el mismo resultado de forma manual:
```bash
$ cd /etc/apache2/sites-enabled
$ sudo ln -s ../sites-available/misitio.conf
```

### a2dissite
Para deshabilitar el fichero:
```bash
$ sudo a2dissite misitio
$ ls /etc/apache2/sites-enabled/misitio.conf
ls: cannot access '/etc/apache2/sites-enabled/misitio.conf': No such file or directory
$ ls /etc/apache2/sites-available/misitio.conf
/etc/apache2/sites-available/misitio.conf
```
Vemos que se borra de los sitios habilitados pero se mantiene en los disponibles.

Conseguimos el mismo efecto si simplemente eliminamos el enlace a mano:
```bash
$ sudo rm /etc/apache2/sites-enabled/misitio.conf
```



## Otros ficheros de configuración

De forma análoga a los sitios habilitados hay otros ficheros de configuración que se pueden (des)habilitar.

```apache
# /etc/apache2/apache2.conf

# Include generic snippets of statements
IncludeOptional conf-enabled/*.conf
```

Existen los directorios `conf-available` y `conf-enabled` que funcionan con comandos similares a los sitios:
```bash
$ sudo a2disconf security
$ sudo a2enconf security
```


## Módulos de Apache

Apache separa funcionalidades en módulos que se pueden (des)habilitar de manera similar a los sitios.

Los módulos no son ficheros de configuración, sino paquetes que puedes instalar con APT para añadir funcionalidades:
```bash
$ apt search libapache2-mod
...
libapache2-mod-php/jammy,now 2:8.1+92ubuntu1 all [installed]
  server-side, HTML-embedded scripting language (Apache 2 module) (default)

$ sudo apt install libapache2-mod-php
```

Para listar los módulos activos:
```bash
$ apachectl -M
```

Para listar módulos disponibles y habilitados:
```bash
$ ls /etc/apache2/mods-available
$ ls /etc/apache2/mods-enabled
```

Para habilitar y deshabilitar un módulo:
```bash
$ sudo a2enmod info
$ sudo a2dismod info
```


## Puertos de escucha

En el fichero principal tiene:
```apache
# /etc/apache2/apache2.conf

# Include list of ports to listen on
Include ports.conf
```

En `ports.conf` tienes la lista de puertos en los que va a escuchar Apache cuando arranque:
```apache
# /etc/apache2/ports.conf
Listen 80

<IfModule ssl_module>
	Listen 443
</IfModule>

<IfModule mod_gnutls.c>
	Listen 443
</IfModule>
```

En este caso escucha siempre en el puerto 80 y en el 443 sólo cuando el módulo `ssl` esté activado.

Si quieres hacer que Apache lea en más puertos hay que añadir más directivas Listen, ej:
```apache
Listen 80
Listen 8080
```

En Apache, además de establecer el puerto aquí de manera general debes establecer el puerto concreto de cada servidor virtual en su fichero correspondiente.
