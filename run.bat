for /f "delims=" %%i in ('npm config get prefix') do set NPM_HOME=%%i
set HTTP_SERVER_BIN=%NPM_HOME%\node_modules\http-server\bin
echo %HTTP_SERVER_BIN%
node %HTTP_SERVER_BIN%\http-server %DEV%\cards -o