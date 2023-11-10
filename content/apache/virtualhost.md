---
title: Virtual Hosts
description: Virtual Hosts de Apache
date: 2023-10-16
lastmod: 2023-10-16
draft: false
menu:
  apache:
    parent: apache
weight: 120
toc: true
---

Ejemplo de configuración:

```apache
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/example

    # Establece siempre ficheros de log personalizados
    # para depurar claramente lo de diferentes virtual hosts.
    ErrorLog /var/log/apache2/example-error.log
    CustomLog /var/log/apache2/example-access.log combined

    # Páginas de error personalizadas
    ErrorDocument 404 /mierror404.html
    ErrorDocument 500 /mierror500.html

    # Cuando el cliente solicita http://example.com/laweb
    # no se sirve el directorio del DocumentRoot /var/www/example/laweb
    # sino del directorio indicado en este alias, ej: /var/alternativo
    Alias /laweb /var/alternativo

    # La directiva Directory permite establecer direcivas que se
    # aplican solo dentro de un directorio.
    <Directory /var/www/example>
        # Establecer el nombre del fichero por defecto que se sirve
        # al cliente, en vez de index.html
        DirectoryIndex principal.html
    </Directory> 

    # Este bloque hace que Apache genere una vista con 
    # la lista de ficheros y subdirectorios. Esto ocurrirá cuando un
    # directorio no tiene index.html (o lo indicado en DirectoryIndex)
    <Directory /var/www/example>
        Options Indexes FollowSymLinks
    </Directory> 

    # ...y deshabilitamos los índices en un subdirectorio
    <Directory /var/www/example/subdir>
      Options -Indexes
    </Directory> 

    # Para prohibir el acceso a un fichereo concreto.
    # Ejercicio: prueba con un directorio con Directory.
    <Files "private.html">
        Require all denied
    </Files>

    # Solicitar password a una ruta
    <Location /private>
        AuthType Basic
        AuthName "Restricted Files"
        AuthBasicProvider file
        AuthUserFile "/etc/apache2/htpasswd"
        Require user theuser
    </Location> 

    # Puedes devolver al cliente una redirección para indicarle que vaya a otro sitio
    # La recirección puede ser a un sitio externo o interno del mismo VirtualHost.
    Redirect "/otrositio" "https://wikipedia.org/"
    Redirect "/otrapagina" "/private.html"

    AliasMatch "^/myapp" "/opt/myapp-1.2.3"
    <Directory "/opt/myapp-1.2.3">
        RewriteEngine On
        RewriteBase "/myapp/"
        RewriteRule "^index\.html$"  "welcome.html"
    </Directory>
</VirtualHost>
```

---

## Documentación Apache

- [Configuration files](https://httpd.apache.org/docs/current/configuring.html)
- [Apache IP-based Virtual Host Support](https://httpd.apache.org/docs/2.4/vhosts/ip-based.html)
- [Configuration Sections](https://httpd.apache.org/docs/2.4/sections.html) - Filesystem vs. Webspace
- [VirtualHost Directive](https://httpd.apache.org/docs/2.4/mod/core.html#virtualhost)
- [Authentication and Authorization](https://httpd.apache.org/docs/2.4/howto/auth.html)
- [Mapping URLs to Filesystem Locations](https://httpd.apache.org/docs/2.4/urlmapping.html)
- [Apache Module mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)


## Configuración básica

Configuración mínima fundamental:
```apache
<VirtualHost *:80>
    ServerName example.com
    DocumentRoot /var/www/example
</VirtualHost>
```

Esto hace que Apache sirva exactamente lo que haya en el directorio `/var/www/example`.


## Alias
Esta directiva permite mapear URLs a otros directorios fuera del `DocumentRoot`:
```apache
<VirtualHost *:80>
    ServerName example.com
    DocumentRoot /var/www/example
    Alias "/hola" "/var/www/otro_dir"
</VirtualHost>
```

Con esto, si el usuario solicita `http://example.com/hola/index.html`:
- No se va a servir `/var/www/example/hola/index.html`
- Se sirve `/var/wwww/otro_dir/index.html`
- Sólo afecta a la URL indicada en la directiva, el resto sigue funcionando en el `DocumentRoot` original.

Una sintaxis alternativa del ejemplo anterior (más adelante se explica _Location_):
```apache
<Location "/hola">
    Alias "/var/www/otro_dir"
</Location>
```

{{< alert icon="👉" >}}
Ten en cuenta la diferencia entre:
- **Webspace**: vista del usuario en la URL. Su raíz es `ServerName`.
- **Filesystem**: vista del sistema operativo en disco. Su raíz es `DocumentRoot`.

Cada uno con su raíz, ambos tipos de rutas en principio son iguales, pero se alteran con directivas como `Alias`.
{{< /alert >}}


## Redirect

Podemos indicar al usuario que el recurso que solicita está en otra URL. No se devolverá ningún recurso HTML al usuario, sino un mensaje HTTP de tipo redirección.

Hay dos tipos generales de redirecciones:
- **Redirección temporal:** indica sitio en mantenimiento o caído temporalmente.
- **Redirección permanente:** si por ejemplo tu sitio ha cambiado de dominio o de esquema de URLs pero no quieres que se rompan enlaces antiguos.

Los clientes web (navegadores) suelen guardar un tiempo en caché el resultado de las redirecciones permanentes y no de las temporales.

{{< alert icon="👉" >}}
La redirección es usada por los motores de indexación de los buscadores (como Googlebot). Darán preferencia a mostrar a los usuarios la URL final de la redirección (ej [developers.google.com](https://developers.google.com/search/docs/crawling-indexing/301-redirects)).
{{< /alert >}}

Para redirigir en Apache:
```apache
Redirect permanent "/cambiado_1/"     "http://example.com/recurso/"
Redirect permanent "/cambiado_2/"     "http://otrodominio.com/otro/recurso/"
Redirect temp      "/cambiado_3/"     "http://otrodominio.com/otro/contenido/"
Redirect           "/fichero_1.html"  "/fichero_2.html"  # Temporal por defecto
```
Como ves, la redirección puede ser al mismo dominio o a otro diferente.

En todo caso el comportamiento es el mismo:
1. El cliente solicita el recurso.
2. El servidor devuelve una respuesta de tipo redirección (_status code_ tipo 300).
3. El cliente lee la respuesta y habitualmente inicia una segunda consulta HTTP con la ubicación recibida.
   - Salvo que tenga las [redirecciones deshabilitadas](https://superuser.com/a/1265348).
   - O salvo alcanzar el máximo de redirecciones (entre 10 y 20).


### ¿Redirect o Alias?

Mira el siguiente ejemplo:
```apache
# Si no se indica nada, es redirección temporal por defecto
Redirect /fichero_1.html /fichero_2.html
```
Esto implica que el cliente:
- Realiza una consulta HTTP para `http://example.com/fichero_1.html`.
- Redibe una respuesta de redirección.
- Inicia una segunda consulta HTTP para `http://example.com/fichero_2.html`.

Para este caso en el que el resultado es otro fichero **en el mismo dominio**, habría sido mejor un Alias:
```apache
Alias /fichero_1.html /fichero_2.html
```
Con esto Apache ve que se solicita `fichero_1.html`, pero va al disco a buscar `fichero_2.html` y lo devuelve, quedando resuelto en una única consulta HTTP.

Pero si el destino está en otro dominio la única solución es la redirección.

**Cuidado con los permidos:** Es probable que tu instalación de Apache ya cuente con acceso permitido a todo el contenido bajo `/var/www` (suele estar dado el permiso en `apache2.conf`), pero si usas otras rutas habituales como `/srv`, `/opt` u otros directorios, puede que tengas que incluir directivas para dar permiso de lectura en esos directorios. Por ejemplo:
```apache
<Directory /opt/miaplicacion>
	 Require all granted
</Directory>
Alias /mialias /opt/miaplicacion
```

Revisa los contenidos de tu `/etc/apache2/apache2.conf` para ver qué rutas tienen permisos por defecto en tu sistema.


## Location, Directory, File
Estas tres directivas de bloque permiten escribir otras directivas que no afecten a todo el VirtualHost, sino a una parte del mismo.

`<Location "/una/ruta">` crea un bloque que aplica cuando el cliente solicita la ruta indicada como `http://example.com/una/ruta`.

`<Directory "/un/directorio">` crea un bloque que aplica cuando el cliente solicita un recurso que se encuentra en el disco en la ruta indicada. Ten en cuenta que un `Alias` puede alterar las rutas fuera del `DocumentRoot` inicial.

`<File "/un/fichero.html">` es equivalente a _Directory_, pero aplica únicamente a un fichero.



## htaccess

- [Apache HTTP Server Tutorial: .htaccess files](https://httpd.apache.org/docs/2.4/howto/htaccess.html)

Este mecanismo permite tener configuración del servidor de Apache no sólo en `/etc/apache2` sino también dentro del propio directorio que se va a servir indicado en `DocumentRoot`, como `/var/www`.

Por ejemplo, en nuestro virtual host podemos poner:

```
<Directory "/var/www/example">
    AllowOverride All
</Directory>
```

Esto nos permite crear un fichero `/var/www/example/.htaccess` (lleva un punto porque es un fichero oculto) con directivas de Apache que se aplicarán al directorio y subdirectorios.

Se pueden dar permisos htacces con diferente granularidad: 

- `All`: Se pueden usar todas las directivas permitidas.
- `None`: Se ignora el fichero .htaccess. Valor por defecto.
- `AuthConfig`: Directivas de autentificación y autorización: AuthName, AuthType, AuthUserFile, Require, …
- `FileInfo`: Directivas relacionadas con el mapeo de URL: redirecciones, módulo rewrite, …
- `Indexes`: Directiva que controlan la visualización de listado de ficheros.
- `Limit`: Directivas para controlar el control de acceso: Allow, Deny y Order.


{{< alert icon="👉" >}}
**Los cambios en `.htaccess` son automáticos.**

Apache lee estos ficheros **para cada consulta HTTP**, por lo que no es necesario reiniciar Apache cuando haces cambios. Por contra, esto ralentiza la petición y es el motivo de que otros servidores web como Nginx no implementen esta funcionalidad.
{{< /alert >}}

