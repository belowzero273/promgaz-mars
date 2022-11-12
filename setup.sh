#!/bin/bash

mongod --fork --logpath /var/log/mongod.log
service mysql start

mysql -e "CREATE USER 'belowzero273'@'%' IDENTIFIED BY 'password123';"
mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'belowzero273'@'%';"
mysql -e "FLUSH PRIVILEGES;"
mysql -e "CREATE DATABASE gazprom_mars;"
mysql -e "CREATE TABLE gazprom_mars.guestbook (name varchar(255), record varchar(255));"
mysql -e "CREATE TABLE gazprom_mars.persons (id int, name varchar(255), password varchar(255), profilepicture varchar(255));"
mysql -e "INSERT INTO gazprom_mars.persons (id,name,password,profilepicture) VALUES (1,'admin','hellothisismypassword', 'admin.jpg'),(2,'cyberdemon','hellawaits', 'cyberdemon.jpg'),(3,'doomguy','iddqd', 'doom.jpg'),(4,'elonmusk','teslaboy', 'elon.jpg'),(5,'kirk','perasperadastra', 'kirk.jpg'),(666,'satan','6666666666', 'satan.jpg');"

node app.js