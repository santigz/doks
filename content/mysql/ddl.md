---
title: DDL
description: Data Definition Language
date: 2023-01-11
lastmod: 2023-01-11
draft: false
menu:
  mysql:
    parent: mysql
weight: 160
toc: true
---

## Data Definition Language

```sql
CREATE TABLE IF NOT EXISTS Empleado (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  campo2 INT,
  campo3 VARCHAR(4),
  CONSTRAINT fk_externa,
  FOREIGN KEY (campo4) REFERENCES 
)
```
