#!/bin/bash
set -e  # Stop script upon error

# Must run as root (sudo)
if [[ $USER != 'root' ]]; then
  echo "Please run as root"
  exit -1
fi

# Paquetes básicos
yum update
amazon-linux-extras enable epel
yum install -y yum-utils unzip curl wget bash-completion policycoreutils-python-utils mlocate bzip2

# MariaDB
yum install -y mariadb mariadb-server
systemctl enable --now mariadb.service
mysql_secure_installation

# Instalar PHP 7.4
amazon-linux-extras enable php7.4
yum install -y php php-fpm php-pdo_mysql

# PHP packages for NextCloud
yum install -y php-gd php-mbstring php-intl php-pecl-apcu php-mysqlnd php-opcache php-json php-zip

# More packages not mentioned in the website...
yum install -y php-dom php-XMLWriter php-XMLReader php-libxml php-SimpleXML
yum install -y php-posix

systemctl enable --now php-fpm.service

# Instalar Nginx
amazon-linux-extras install nginx1
yum install -y nginx
systemctl enable --now nginx.service

################ NextCloud
# Download latest version
echo "Downloading nextcloud..."
curl -LO https://download.nextcloud.com/server/releases/latest.zip

# Should unzip as nextcloud/
echo "Extracting nextcloud..."
unzip -q latest.zip

# Create the directory and its parents if needed (-p)
mkdir -p /var/www
mv nextcloud /var/www/

# Set user and group owners
sudo chown -R nginx:nginx /var/www/nextcloud/

