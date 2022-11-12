# Gazprom Dobycha Mars LLC Web Application

Gazprom Dobycha Mars LLC Web Application (GDMWA) is a NodeJS/MySQL/MongoDB web site of a fictional company that contains various vulnerabilities. 
Its main purpose is to train web developers to write secure code as well as to help pentesters to practice their skills. 

I personally use this app during my classes with web developers of different skill levels. 
It was inspired by DWVA (https://github.com/digininja/DVWA/), so check it out too. 

- - -

## WARNING!

Since this app is intentionally vulnerable, please don't even think of hosting it anywhere on the internet. It will be hacked and your server will be compromised. I guarantee it.

- - -

## License

Gazprom Dobycha Mars LLC Web Application (GDMWA) is a free software. You can use it as you like under terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version. But please note, that there are no warranties, so see the GNU General Public License for more details. 
 
It's free, but if you like it, I don't mind if you buy me a coffee :wink:

<a href="https://www.buymeacoffee.com/belowzero273" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

- - -

## Installation

The best way is to just use pre-built container. 

```bash
docker run -p 3000:3000 -d belowzero273/gazprom-mars
```

But you can also install everything manually by yourslef. You'll need NodeJS, MongoDB and Mysql. For Debian-like distro process is strait forward:

Start with NodeJS:

```bash
apt-get update 
apt-get install -y curl gpg gnupg wget
url -fsSL https://deb.nodesource.com/setup_18.x | bash
apt-get install -y nodejs
```
Then install MongoDB:
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list 
apt-get update
mkdir -p /data/db
apt-get install -y mongodb-org 
```
And of course MySQL:
```bash
apt-get install -y mysql-server
usermod -d /var/lib/mysql/ mysql
```
Then copy all app files and start the app:
```bash
npm install
node app.js
```

I think it should also work on Windows Server, but it will take you some time figure it out.

- - -

## Getting started
- By default this app listens to port 3000, so just run http://127.0.0.1:3000. There are no set user accounts and you'll have to register.
![Login](/public/img/github/login.png)
- Then login and startd hacking/teaching/learning/whatever you do
![Challenge](/public/img/github/challenge.png)
- If you host this app in your class, you can use http://127.0.0.1:3000/scoreboard to track you students progress.
![Scoreboard](/public/img/github/scoreboard.png)

- - -

## What's next?

I haven't implemented everything yet, so stay tuned.
- - -
## Credits

- translation/edition by @katpolukat 
- <a href="https://www.flaticon.com/free-icons/planet" title="planet icons">Planet icons created by Freepik - Flaticon</a>