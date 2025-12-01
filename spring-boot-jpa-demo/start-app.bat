@echo off
echo Setting JAVA_HOME...
set JAVA_HOME=C:\Program Files\Java\jdk-22
set PATH=%JAVA_HOME%\bin;%PATH%

echo Starting Spring Boot application...
cd /d "c:\Users\xinot\OneDrive\Escritorio\Fullstack-main\spring-boot-jpa-demo"

echo Compiling with Maven...
call mvnw.cmd clean compile

echo Starting application...
call mvnw.cmd spring-boot:run

pause
