## Starting the application
Installing dependencies, generating the DTO's based on backend API documentation (only need to run when backend DTOs changed, and on first install), and starting the application:

npm install  
npm run generate:dtos
npm run dev



to run as app:

npm run electron:compile 

after that change electron/dist/main.js to .cjs

then you can run npm run electron:start
or check the other commands in package.json