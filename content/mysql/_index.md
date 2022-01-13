---
title: MySQL
description: Instrucciones básicas SQL
date: 2020-10-06
lastmod: 2020-10-06
draft: false
images: []
toc: true
---

## Crear DB y usuario
Entramos en la consola de MySQL como root:
```bash
$ sudo mysql       # Si el root no tiene password
$ sudo mysql -p    # Si el root tiene password
```

Creamos una base de datos, un usuario, y le otorgamos privilegios sobre la DB:
```sql
mysql> create database DATABASE_NAME;
mysql> create user 'USER_NAME'@'localhost' identified by 'PASSWORD';
mysql> grant all privileges on DATABASE_NAME.* to 'USER_NAME'@'localhost';
mysql> flush privileges;
```

## Comprobar el usuario
Entramos con el usuario que hemos creado (sin `sudo`):
```bash
$ mysql -u USER_NAME -p
```
Solo deberíamos ver aquello para lo que tiene permisos el usuario, que es su DB:
```sql
mysql> show databases;     -- Muestra las DBs
mysql> use DATABASE_NAME;  -- Entra dentro de una DB
mysql> show tables;        -- Muestra las tablas de la DB (si hay alguna)
```

## Eliminar la DB o el usuario
Entrando como root:
```sql
mysql> drop database DATABASE_NAME;
mysql> drop user USER_NAME;
```
