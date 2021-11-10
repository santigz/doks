---
title: "Utilidade de red"
description: "Utilidade de red"
date: 2021-10-21T15:21:01+02:00
lastmod: 2021-10-21T15:21:01+02:00
draft: true
menu:
  linux:
    parent: linux
weight: 120
toc: true
---


## Tracerouting

Utilidades de tracerouting:
- `traceroute`: la tradicional.
- `tracepath`: más segura.
- `mtr` (my traceroute): más interactiva.

```
mypc (192.168.1.7) -> pccomponentes.com
Keys:  Help   Display mode   Restart statistics   Order of fields   quit
                                                      Packets               Pings
 Host                                                Loss%   Snt   Last   Avg  Best  Wrst StDev
 1. csp1.zte.com.cn                                   0.0%    30    2.6   2.8   1.0   6.5   1.2
 2. 100.95.0.1                                        0.0%    30    5.5  10.3   4.0  33.8   7.6
 3. 10.15.0.77                                       10.0%    30    6.2   5.3   3.3   6.9   0.9
 4. 10.15.246.6                                       0.0%    30    6.2   6.3   3.7  22.4   4.2
 5. 10.15.2.14                                        0.0%    30    6.0   6.3   3.2  36.5   5.8
 6. cloudflare.baja.espanix.net                      10.3%    29    7.7  15.6   4.0  76.4  18.6
 7. 172.70.56.5                                      10.3%    29    5.2   5.1   2.8   7.4   1.1
    172.70.60.5
    188.114.108.9
    172.70.58.5
 8. 104.16.162.71                                    10.3%    29    5.2   6.3   3.1  24.3   4.2
```
