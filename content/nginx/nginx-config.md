---
title: Nginx configuration
description: Configuración de servidores Nginx
date: 2021-10-21
lastmod: 2021-10-21
draft: false
menu:
  nginx:
    parent: nginx
weight: 100
toc: true
---


Ejemplo de lo que acabarás entendiendo en esta página:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name mysite.com www.mysite.com;
    root /var/www/html;
    access_log /var/log/nginx/mysite_access.log;
    error_log /var/log/nginx/mysite_error.log;

    index index.php index.html;
    try_files /mantenimiento.html $uri $uri/ =404;

    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;

    location /img/ {
        alias /var/www/images;
    }

    location /prohibido/ {
        deny all;
    }

    location /privado/ {
        auth_basic "Sección privada";
        auth_basic_user_file /etc/nginx/passwd;
    }
}
```

---


## Configuración Nginx

El fichero principal de configuración de Nginx es `/etc/nginx/nginx.conf`.

Los servidores virtuales de nginx se deben especificar dentro de un contexto `http`:
```nginx
user nginx;  # Nombre del usuario con el que se ejecuta Nginx

http {
    server { }
    server { }
    server { }
}
```

Es habitual que los servidores se separen en ficheros diferentes, para lo que se usa la directiva `include`:
```nginx
# /etc/nginx/nginx.conf
user nginx;

http {
    # Para cargar otros ficheros
    include /etc/nginx/conf.d/*.conf;
}
```

Y en un fichero incluido, por ejemplo: `/etc/nginx/conf.d/miserver.conf`:
```nginx
# /etc/nginx/conf.d/miserver.conf
server {
    # ... la config. del server
}
```

{{< alert icon="👉" >}}
Reinicia Nginx cada vez que modifiques su configuración:

`$ sudo systemctl restart nginx`
{{< /alert >}}


## Servidores virtuales
Configuración más básica:
- `listen`: para que escuche a uno o varios clientes.
  - La IPv4 **0.0.0.0** se usa para que escucha a todo el mundo.
  - La IPv6 **::** es el equivalente (todo ceros) en IPv6.
- `server_name`: si nuestro servidor tiene nombre DNS.
- `root`: el directorio del que se sirven ficheros para este servidor.
```nginx
server {
    # listen 0.0.0.0:80;  # Escucha a todos los clientes en IPv4
    listen 80;            # Igual que la línea anterior
    listen [::]:80;       # Escucha en IPv6
    server_name _;        # Si no tenemos DNS se usa _
    root /var/www/html;   # Directorio habitual
}
```

Sitúa tu código HTML en el `root` del servidor, ej: `/var/www/html/index.html`:
```html
<!DOCTYPE html>
<html>
<body>
  <p>Estoy en mi servidor</p>
</body>
</html>
```

### Probar un servidor

Puedes probar un servidor virtual a bajo nivel desde la terminal con **Netcat** (comando `nc`).
- Netcat simplemente abre un puerto TCP al puerto indicado.
- Puedes escribir la cabecera HTTP a mano.

```http
$ nc <server-IP> 80
GET /index.html HTTP/1.0
Host: minombre.com

HTTP/1.1 200 OK
Server: nginx/1.18.0 (Ubuntu)
Content-Type: text/html
Content-Length: 178
Connection: close

<!DOCTYPE html>
<html>
<body>
  <p>Estoy en mi servidor</p>
</body>
</html>
```

### Múltiples servidores virtuales

Se pueden crear varios servidores siempre que cada uno de ellos:
- Responda a un nombre diferente, o bien
- Escuche en un puerto diferente

<span class="hljs-keyword" style="display:block; unicode-bidi:embed; font-family:monospace; white-space:pre; line-height:normal; text-align:center; font-size: 1rem; font-weight:bold; margin: 2em;">
┌───────────────────────────────────────────┐
│  ┌─────────┐   ┌─────────┐   ┌─────────┐  │
│  │ Virtual │   │ Virtual │   │ Virtual │  │
│  │ Server  │   │ Server  │   │ Server  │  │
│  └────▲────┘   └────▲────┘   └────▲────┘  │
│       │             │             │       │
│       └─────────────┴─────────────┘       │
│                   NGINX                   │
└─────────────────────▲─────────────────────┘
│
┌───┴───┐
│Port 80│
└───────┘
▲
│
Clients
</span>


Por ejemplo, esta configuración es correcta:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name primero.com;
    root /var/www/primero;
}

server {
    listen 80;
    listen [::]:80;
    server_name segundo.com;
    root /var/www/segundo;
}

server {
    listen 8080;
    listen [::]:8080;
    server_name segundo.com;
    root /var/www/segundo_test;
}
```

Prueba el funcionamiento de los tres servidores:
- La IP será la misma en los tres casos
- Cambia la cabecera `Host: <nombre-servidor-virtual>`
```http
$ nc <server-IP> 80    # Escribe a mano las dos primeras líneas
GET /index.html HTTP/1.0
Host: primero.com

HTTP/1.1 200 OK
Server: nginx/1.18.0 (Ubuntu)
Content-Type: text/html
Content-Length: 178
Connection: close

<!DOCTYPE html>
<html>
<body>
  <p>Primer servidor</p>
</body>
</html>
```


## Server name

Esta directiva permite que un servidor virtual responda a nombres de dominio concretos. Se pueden añadir varios nombres:
```nginx
server {
    server_name minombre.com www.minombre.com otronombre.com;
}
```

{{< alert icon="👉" >}}
Sólo se puede incluir `server_name` una vez en un servidor virtual.
{{< /alert >}}

Con el asteristo se pueden añadir patrones:
```nginx
server {
    server_name dominio.com *.dominio.com *.otrodominio.*;
    # dominio.com          OK
    # www.dominio.com      OK
    # ftp.dominio.com      OK
    # dominio.es           No reconocido
    # otrodominio.com      No reconocido
    # www.otrodominio.es   OK
    # www.otrodominio.com  OK
    # app.otrodominio.com  OK
}
```


## Logs

Se puede definir un fichero de log para accesos correctos y otro para errores, y pueden ser diferentes para cada servidor virtual:
```nginx
server {
    access_log /var/log/nginx/myserver_access.log;
    error_log /var/log/nginx/myserver_error.log;
}
```
Realiza consultas correctas e incorrectas a tu servidor y revisa los logs.


## Index

La directiva `index` permite establecer el nombre del fichero por defecto cuando un cliente solicita el nombre de un directorio:
```nginx
server {
    index index.html inicio.html;
}
```

Según este ejemplo:
- Si el cliente solicita el recurso raíz `/directorio/`.
- Nginx busca primero `/directorio/index.html` y lo devuelve si existe.
- En segundo lugar, busca `/directorio/inicio.html` y lo devuelve si existe.
- Si no encuentra ninguno, devuelve un error 404.


## Try files

Esta directiva comprueba la existencia de diversas rutas por orden. En el siguiente ejemplo:
- `$uri`: prueba primero con el recurso solicitado tal cual.
- `$uri/`: prueba como si fuese un directorio.
  - Esto irá en conjunción con la directiva `index`.
- `=404`: en último lugar se devuelve un código _404 resource not found_.
```nginx
server {
    try_files $uri $uri/ =404;
}
```
{{< alert icon="👉" >}}
Fíjate en la diferencia entre que una URL acabe en barra `/` o no.
Es la diferencia entre solicitar un fichero o un directorio.
{{< /alert >}}

También podemos evitar fácilmente que los usuarios tengan que escribir `.html` para acceder a una página:
```nginx
server {
    try_files $uri $uri.html $uri/ =404;
}
```

Una forma sencilla de tener una página de mantenimiento es que sea lo primero que busca Nginx. Si existe, se devuelve esa siempre.
```nginx
server {
    try_files /mantenimiento.html $uri $uri/ =404;
}
```


## Páginas de error
Puedes configurar las páginas que se van a mostrar cuando Nginx detecta diferentes tipos de errores.

Revisa los diferentes códigos de estado - [MDN > HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- **1xx:** Información
- **2xx:** Success
- **3xx:** Redirección
- **4xx:** Error en cliente (ej: _404 Not Found_)
- **5xx:** Error en servidor (ej: PHP no funciona)

```nginx
server {
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
}
```

## Location
Con la directiva `location` se pueden poner configuraciones diferentes para cada ruta:
```nginx
server {
    location /ruta_1/ {
       # Configuración para http://server/ruta_1/*
    }
    location /ruta_2/ {
       # Configuración para http://server/ruta_2/*
    }
}
```


## Prohibir rutas
En el siguiente ejemplo se prohibe el acceso a http://server/no_puedes_pasar
```nginx
location /no_puedes_pasar/ {
    # Lo que haya dentro del directorio <root>/no_puedes_pasar
    # jamás será accesible
    deny all;
}
```

## Zonas privadas
Con el módulo `auth_basic` puedes restringir una zona con password:
```nginx
location /zona_privada/ {
    auth_basic "Sitio cerrado";
    auth_basic_user_file /etc/nginx/passwd;
}
```

El fichero de passwords debe ser creado con una herramienta como `htpasswd`:
- Comprueba que la tienes instalada
- Elegimos una ruta para guardar los passwords hasheados, como `/etc/nginx/passwd`
- Para instalarla en CentOS/Amazon Linux: `sudo yum install httpd-tools`
```bash
$ which htpasswd  # Revisamos que está instalada
/usr/bin/htpasswd

$ sudo htpasswd /etc/nginx/passwd <user>
New password:
Re-type new password:
Adding password for user <user>
```

Para comprobar que funciona:
```
$ curl http://<user>:<password>@<server>/zona_privada/file.txt
```


## Redirecciones

Es fácil redireccionar a otra URI devolviendo un código `301` junto al `location` de la redirección.

Para redireccionar del servidor `www.domain.com` al nombre desnudo `domain.com`:
- Usa la variable `$scheme` para devolver al mismo protocolo de origen (http o https).
- Usa `$request_uri` para que el path, query y fragment sean los mismos
```nginx
server {
    listen 80;
    server_name www.domain.com;
    return 301 $scheme://domain.com$request_uri;
}
```
El comportamiento es el siguiente:
```http
$ nc <host> 80
GET /page.html#fragment HTTP/1.0
Host: www.domain.com

HTTP/1.0 301 Moved Permanently
Location: http://domain.com/page.html#fragment
```


Para redirigir a clientes de HTTP a HTTPS:
- Se mantiene el `$host` y la `$request_uri` de la petición, pero se fuerza manualmente al esquema `https`.
```nginx
server {
    listen 80;
    server_name domain.com;
    return 301 https://$host$request_uri;
}
```
