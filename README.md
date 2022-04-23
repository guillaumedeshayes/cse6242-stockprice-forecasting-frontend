# StockPrice (stockprice-frontend)

## Description
#### Describe the packages in a few paragraphs
Quasar is a library that provides pre-built Vue.js components based on Material Design (an Android-oriented design language created by Google)<br>
We build the application as an SPA (Single Page Application). SPA is a web application or website that dynamically rewrites the current web page with new data from the webserver instead of the default method of a web browser loading entirely new pages. This is useful in our case to dynamically update the page (graphs, displayed values) every 30min without reloading the page, as we want the most recent stock trends.<br>
Packages we used for this project include:
- apexcharts: pre-built graphs for Vue.js, including the candlestick chart for example
- axios: Javascript library that eases HTTP requests. Used here to request our API
- vuex: Javascript package to creates stores (a store contains global variables and functions accessible from any component of the app)

## Installation
#### How to install and setup your code
Code is already setup. To start the environment, please follow the execution steps for local development. The only requirement is having Docker installed on your local computer.<br>
App will be available in localhost.<br>
Each time an update is made, re-run the Docker commands.

## Execution
#### How to run a demo on your code
Our application runs in a Docker container (defined by the DockeFile in the root of the project).<br>
For local development (localhost), please follow the next steps:
1. Open a terminal in the root folder of the application
2. Make sure you have Docker installed and running. You can test this with the following command:
```bash
docker ps
```
3. Build the Docker image:
```bash
docker build -f Dockerfile-Dev -t stockprice:dev .
```
4. Build the Docker container
```bash
docker run -it -p 8000:80 --rm stockprice:dev
```
5. Access the localhost: https://localhost:8000
<br>
To push intoproduction, we used Heroku. Please use the HerokuCLI and follow these commands, one by one:
```bash
heroku container:login
heroku container:push -a stockprice:prod web
heroku container:release -a stockprice:prod web
```
Detailed instructions can be found here: https://devcenter.heroku.com/articles/container-registry-and-runtime