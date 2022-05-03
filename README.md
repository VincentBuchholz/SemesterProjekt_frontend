1. Change URLS to match new backend
2. Change or delete jokes component


Deployment Guide:

**On Droplet:**
_Var/www:_
- mkdir $project_name
- chmod -R 777 $project_name
_root:_
- nano etc/nginx/sites-enabled/default
- Change location to new project
- service nginx restart

**On pc**
_Project root:_
- npm run build
-scp -r ./build/* root@$URL:/var/www/$project_name