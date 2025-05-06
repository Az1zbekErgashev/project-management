# Project Readme

## Environment Variables

Environment variables are read at runtime from `/public/runtime-config.js` file, therefore,
they should be specified in this file instead of an `.env` file.

### `/public/runtime-config.js` example
```javascript
window['runConfig'] = {
	nodeEnv: 'development',
	backendUrl: 'http://localhost:8080',
	frontendUrl: 'http://localhost:3000',
};
```

1. Clone project
2. docker-compose build
3. docker network create all_network
4. docker-compose up -d
5. Every command should be executed in container


### Environment setup
1. Copy contents of `/public/runtime-config.example.js` to `/public/runtime-config.js`
2. Modify the default values as necessary
3. Re-run
