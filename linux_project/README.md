project name:
            linux server configration project 
about project:
            this project is the 6th of udacity full satck web developer nano degree 
            also about deplaoy flask/django python web(flask/django)
            on cloud service (aws amazon web service ) using ubuntu 
            instance
Public DNS (IPv4)
ec2-35-165-231-39.us-west-2.compute.amazonaws.com

IPv4 Public IP
35.165.231.39
list of all libraries installed to acomplish this project 
sudo apt-get -qqy install python python-pip
sudo -H pip2 install --upgrade pip
sudo -H pip2 install flask packaging oauth2client redis passlib flask-httpauth
sudo -H pip2 install sqlalchemy flask-sqlalchemy psycopg2 bleach requests
sudo pip install httplib2
sudo pip install psycopg2
private key
grader.pem>>>will be attached 
to connect ssh:
open terminal at same directorey of grader.pem type command :
ssh -p 2200 -i "grader.pem" grader@ec2-35-165-231-39.us-west-2.compute.amazonaws.com
to access this website:
open your prefered webbrowser type 
http://35.165.231.39
tasks to acomplish this project 
1.create user grader and give it admin premissiomns 
command: sudo createuser grader
command: sudo nano /etc/sudoers.d/grader, type in grader ALL=(ALL:ALL) ALL, save and quit
2.set ssh login 
command: 
mkdir /home/grader/.ssh
command:ssh-keygen 
some files will created
id_rsa >>private key
id_rsa.pub>>public key
fo security issues add these commands 
$ chmod 700 .ssh
$ chmod 644 .ssh/authorized_keys
3.reload SSH using service ssh restart
4.update all packages 
sudo apt-get update
sudo apt-get upgrade
5.change ssh port from 22 to 2200
sudo nano /etc/ssh/sshd_config
change port number from 22 to 2200
save and quit 
reload the ssh service 
command: ssh service reload 
6.configure ufw (micro firewell build i ubuntu )
sudo ufw allow 2200/tcp
sudo ufw allow 80/tcp
sudo ufw allow 123/udp
sudo ufw enable 
you can check status of ufw by command
sudo ufw status
7.configure a clocal timezone to utc
sudo timedatectl set-timezone UTC
8.install apache for wsgi 
sudo apt-get install apache2
sudo apt-get install python-setuptools libapache2-mod-wsgi
sudo service apache2 restart
9.install postgresql
sudo apt-get install postgresql
10.configure postgresql
Login as user "postgres" sudo su - postgres
get into postgresql type psql
create database catalog
sudo createdb catalog;
create user named it catalog 
sudo createuser catlog
set password for db catalog 
alter role catalog with password 'catalog';
alter database catalog owner to catalog;
11.install libraries for the project 
sudo apt-get install python-psycopg2 python-flask
sudo apt-get install python-sqlalchemy python-pip
sudo pip install --upgrade pip
sudo pip install oauth2client
sudo pip install requests
sudo pip install httplib2
12.install git (version control)
sudo apt-get install git
13.set up catalog app project 
navigate to /var/www command : sudo cd /var/wwww
command:sudo mkdir FlaskApp
command:cd FlaskApp
colne project from github 
command: git clone  https://github.com/BakrFrag/Udacity_Flask_Project FlaskApp
change app_project.py to __init__.py 
command: mv app_project.py __init__.py
edit files default.py,database_setup.py and __init__.py
change engine to be engine = create_engine('postgresql://catalog:catalog@localhost/catalog');
quit and save changies
command:
sudo nano file_name them save and quit
add file called add.py to FlaskApp to init catogries at catalog postgresql database 
type command :
sudo nano /var/www/FlaskApp/FlaskApp/add.py
them add the following script and save and quit
______start of script __________
from database_setup import Branche,Base,Catogrey;
from sqlalchemy import  create_engine;
from sqlalchemy.orm import sessionmaker;
engine=create_engine('postgresql://catalog:catalog@localhost/catalog');
Base.metadata.bind=engine;
dbsession=sessionmaker(bind=engine);
session=dbsession();
#Catogrey
names=["computer science","Mathematics ","Software Engineering","Physics","Chemistry "];
for i in names:
    item=Catogrey(name=i);
    session.add(item);
    session.commit();
______end of script_________
14.create virtual host
create FlaskApp.conf 
command: sudo nano /etc/apache2/sites-available/FlaskApp.conf
add this script to the FlaskApp.conf save and quit 
<VirtualHost *:80>
	ServerName 172.31.18.141
	ServerAdmin bakr.frag@gmail.com
	WSGIScriptAlias / /var/www/FlaskApp/flaskapp.wsgi
	<Directory /var/www/FlaskApp/FlaskApp/>
		Order allow,deny
		Allow from all
	</Directory>
	Alias /static /var/www/FlaskApp/FlaskApp/static
	<Directory /var/www/FlaskApp/FlaskApp/static/>
		Order allow,deny
		Allow from all
	</Directory>
	ErrorLog ${APACHE_LOG_DIR}/error.log
	LogLevel warn
	CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
15.create wsgi file 
must be at /var/www/FlaskApp
command:
cd /var/www/FlaskApp
sudo nano flaskapp.wsgi 
add this lines of code to flaskapp.wsgi
#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/FlaskApp/")

from FlaskApp import app as application
application.secret_key = 'super_secret_key'
save and quit 
16.final step restart apache
command: sudo service apache2 restart
17.third-party resources
these resources informative and help me to acomplish this project 
1.https://askubuntu.com/
2.https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps
3.https://stackoverflow.com 
