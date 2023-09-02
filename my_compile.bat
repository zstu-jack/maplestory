@echo off
@title HeavenMS
cd .\src
javac -cp ../cores/mina-core-2.0.19.jar;../cores/HikariCP-java7-2.4.13.jar;../cores/mysql-connector-java-bin.jar;../cores/slf4j-api-1.7.21.jar;../cores/slf4j-jdk14-1.7.5.jar;../cores/slf4j-jdk14-1.7.5.jar;../cores/yamlbeans-1.13.jar;../cores/nap_tools-1.23.0807.jar @sources.txt 

timeout /t 60