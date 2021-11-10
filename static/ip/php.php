<?php

echo $_SERVER['REMOTE_ADDR'] . "\n";

date_default_timezone_set("Europe/Madrid");
echo date('Y-m-d H:i:s') . "\n";

echo $_SERVER['SERVER_NAME'] . "\n";
echo $_SERVER['SERVER_SOFTWARE'] . "\n";
echo $_SERVER['HTTP_USER_AGENT'] . "\n";

system('systemctl status nginx');
