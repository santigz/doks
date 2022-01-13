---
title: HTTPS
description: Certificados para HTTPS
date: 2022-01-12
lastmod: 2022-01-12
draft: false
menu:
  nginx:
    parent: nginx
weight: 160
toc: true
---

**PRERREQUISITO:** Debes disponer de un nombre de un servidor en internet y de un dominio apuntando a su IP.

Para tener HTTPS es necesario disponer de un certificado, que se puede obtener de dos maneras:
- Creando tú mismo un certificado autofirmado (self-signed).
- Obteniéndolo de una CA (Certification Authority) como Let's Encrypt.

## Self-signed certificate

Se necesitan dos ficheros:
- `DOMINIO.key`: clave pública
- `DOMINIO.crt`: info adicional y metadatos. Ej: entidad que expide el certificado, fecha de expiración, etc.

Para generarlos (sustituye `DOMINIO` por tu nombre de dominio, como `example-com.key` y `example-com.crt`):
```bash
$ cd  # Vamos al home
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout DOMINIO.key -out DOMINIO.crt
# ...rellena los campos que te pide
```

Es habitual situar estos ficheros en directorios adecuados:
```bash
$ mv DOMINIO.key /etc/ssl/private/DOMINIO.key
$ mv DOMINIO.crt /etc/ssl/certs/DOMINIO.crt
```

### Configurar Nginx

La configuración de un servidor HTTPS en Nginx es fácil:
```nginx
server {
    listen 443 ssl;
    ssl_certificate /etc/ssl/certs/DOMINIO.crt;
    ssl_certificate_key /etc/ssl/private/DOMINIO.key;

    # Resto de configuraciones
}
```


## Certificado de Let's Encrypt
En vez de crear un certificado autofirmado, es conveniente usar uno expedido por una CA (Certification Authority).

[Let's Encrypt](https://letsencrypt.org/) es una CA que ofrece certificados gratuitos.
- No necesitas tener una cuenta en Let's Encrypt.
- Necesitas tener un nombre de dominio en una máquina con IP pública en internet.

La herramienta para crear certificados de esta CA se llama `certbot`.

Instalamos los paquetes necesarios:
```bash
$ sudo apt install certbot python3-certbot-nginx
```

**IMPORTANTE:** debes asegurarte de que tienes un nombre de dominio configurado correctamente en Nginx. Esto supone que tienes algo como:
```nginx
server {
    server_name DOMINIO;  # ej: example.com
}
```

Con el siguiente comando se van a crear los certificados **y se va a modificar la configuración de tu servidor Nginx:**
```bash
$ sudo certbot --nginx -d DOMINIO
# ... sigue las instrucciones
```

➜ Revisa la configuración de tu servidor de Nginx para ver cómo lo ha modificado.

### Renovación de certificados

Let's Encrypt expide certificados por un tiempo determinado (actualmente 3 meses). Unos días antes de que expire puedes solicitar la renovación:
```bash
$ sudo certbot renew  # Renueva todos los certificados
```

El paquete `certbot` en Ubuntu instala un temporizador que se lanza dos veces al día para revisar la renovación automática. Debes comprobar que está activado:
```bash
$ sudo systemctl status certbot.timer
# Debe estar *active*
```
