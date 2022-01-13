---
title : "MySQL"
description: "Instrucciones básicas SQL"
date: 2020-10-06T08:48:23+00:00
lastmod: 2020-10-06T08:48:23+00:00
draft: false
images: []
toc: true
---

Entrar en la consola de MySQL:
```bash
$ mysql
$ mysql -u <user>
$ sudo mysql
```

Crear base de datos:
```sql
create database DATABASE_NAME;
use DATABASE_NAME;
```

Crear usuario y dar privilegios a la DB:
```sql
create user 'USER_NAME'@'localhost' identified by 'PASSWORD';
grant all privileges on DATABASE_NAME.* TO 'USER_NAME'@'localhost';
```

Aplicar privilegios ahora mismo:
```sql
flush privileges;
```

