An example of a config for a full site setup using:
1) Webpack - for building a project (frontend)
2) NodeJS - for processing requests from frontend
3) Nginx - for distributing static content and for proxying requests on NodeJS

Запуск Nginx
sudo service nginx start
После какого-либо изменения в файле конфигурации, мы должны заставить процесс NGINX перечитать конфиг (без перезагрузки) такой командой:
service nginx reload
И наконец, мы можем проверить состояние процесса командой:
service nginx status