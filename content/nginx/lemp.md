---
title: LEMP
description: Instalación del stack Linux, Nginx, MySQL, PHP.
date: 2021-10-21
lastmod: 2021-10-21
draft: false
menu:
  nginx:
    parent: nginx
weight: 150
toc: true
---

## Nextcloud en Amazon Linux

- **Red Hat:** La empresa de open source con la distribución RHEL y Fedora, y otros proyectos de cloud computing. Adquirida por IBM en 2019.
- **RHEL:** Red Hat Enterprise Linux, distribución open source con licencias para mantenimiento, muy usada en entorno empresarial.
- **CentOS:** Community Enterprise Linux Operating System, distro clon de RHEL completamente gratuita. Red Hat adquirió CentOS en 2014.



### Paquetes EPEL

Los paquetes EPEL (Extra Packages For Enterprise Linux) de distribuciones basadas en RHEL son necesarios para instalar paquetes fuera de los oficialmente mantenidos por Red Hat. Activar EPEL da acceso a la instalación de muchos más paquetes mantenidos por la comunidad.

Para activar EPEL en CentOS:
```
$ sudo yum install epel-release
```

En Amazon Linux:
```
$ sudo amazon-linux-extras install epel
```

{{< alert icon="👉" text="Sin este paso no podrás instalar Nginx en Amazon Linux." />}}


Tras instalar EPEL conviene actualizar el sistema:
```
$ sudo yum update
```


## Instalación

Paquetes básicos según las instrucciones:
```
$ sudo yum install yum-utils unzip curl wget bash-completion policycoreutils-python-utils mlocate bzip2
```

## MariaDB

Instalar y arrancar el servicio de MariaDB:
```
$ sudo yum install mariadb mariadb-server
$ sudo systemctl status mariadb.service
$ sudo systemctl enable --now mariadb.service
```

Securizar la DB:
```
$ sudo mysql_secure_installation
```

## PHP y PHP-FPM

Los dos paquetes más importantes son:
- `php`: permite ejecutar programas.
- `php-fpm`: servidor local de PHP en segundo plano con el que se comunica Nginx.

```
$ sudo amazon-linux-extras enable php8.0
$ sudo yum install php php-fpm php-pdo_mysql

$ sudo systemctl enable --now php-fpm.service
$ sudo systemctl status php-fpm.service
```

En la configuración de _php-fpm_ `/etc/php-fpm.d/www.conf` tienes que comprobar o ajustar:
- El **usuario y grupo** bajo el que se ejecuta php-fpm. Deberá tener acceso al código PHP de la aplicación. Aquí lo modificamos para que coincida con el de Nginx.
- El **socket** en el que está escuchando. Toma nota porque lo necesitarás después.
```
[www]
user = nginx
group = nginx

# El socket debe coincidir con la configuración de Nginx
listen = /run/php-fpm/www.sock
```



## Nginx

Nginx se distribuye como paquete EPEL. Tras activar estos paquetes, yum lo debería encontrar e instalarlo:
```
$ sudo yum install nginx
```

Debemos comprobar que Nginx está en ejecución, habilitarlo y arrancarlo si no lo está:
```
$ systemctl status nginx.service
$ systemctl enable --now nginx.service
```



## Nginx

A partir de aquí debes configurar Nginx como desees. Un ejemplo básico es:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name _;
    root /var/www/html;  # La ruta del código

    # Usa primero index.php y luego index.html (si hay)
    index index.php index.html;

    # Todos los ficheros con extensión PHP
    location ~ \.php$ {
      # La ruta php-fpm de tu sistema (vista antes)
      fastcgi_pass      unix:/run/php-fpm/www.sock;
      fastcgi_index     index.php;
      include           fastcgi.conf;
    }
}
```

Tras modificar la configuración de Nginx haz un test de la configuración para comprobar que no haya errores y reinicialo:
```
$ sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

$ sudo systemctl reload nginx   # Reload es más ligero que restart
```

Para comprobar que funciona, sitúa algo de código en el directorio del `root` del servidor:
```php
<?php
// Fichero en /var/www/html/index.php

echo 'Si ves esto es que PHP y Nginx funcionan!';
?>
```

Con esto ya deberías acceder a tu sitio PHP desde tu navegador o desde consola:
```bash
$ curl -v http://<server-IP>/
Si ves esto es que PHP y Nginx funcionan!
```

