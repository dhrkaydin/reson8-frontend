# RESON8

#### About
RESON8 is a music practice tracker, where you can keep track of your different practice routines, start practice sessions with a built-in metronome, and see analytics about your practice habits and progress.

#### Tech Stack
React, Vite, Tailwindcss, Electron, Typescript, Nodejs


## Running/Building
### First boot
```
npm install  
npm run dev
```

### Connecting to Backend

#### Configuration
The .env file contains the URL for the back-end API. All calls to the back-end use the useApi hook, which uses Axios (src/api/apiClient.js)

#### Generating DTOs
This application uses a script to generate DTO's based on the OpenAPI specification of the back-end, so that it dynamically picks up on changes made to the DTO's defined by the back-end. 

Refer to the scripts folder to modify this script in case the location of the documentation changes.
```
npm generate:dtos
```


### Electron
This application can be served as a desktop application, using Electron. The configuration for this can be found in the electron folder, and also in package.json

#### Running as an application
To include the most recent changes, use the build command.

```
npm run build
npm run electron:compile
```

#### Building it as an .exe/.dmg/whatever your OS uses that you run this on
```
npm run build
npm run electron:build
```

