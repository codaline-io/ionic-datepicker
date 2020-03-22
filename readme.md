![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# ionic-datepicker

This is a datepicker component for ionic projects. It is using [js-datepicker](https://www.npmjs.com/package/js-datepicker) in an [ion-popover](https://ionicframework.com/docs/api/popover) and the possibility to use a native date input on mobile devices.

## [Live Demo & Preview](https://codaline-io.github.io/ionic-datepicker)

<img width="350" alt="Bildschirmfoto 2020-03-22 um 09 11 16" src="https://user-images.githubusercontent.com/2264672/77245288-c0a34b80-6c1d-11ea-8d12-0fb7a011809b.png">
<img width="350" alt="Bildschirmfoto 2020-03-22 um 09 11 25" src="https://user-images.githubusercontent.com/2264672/77245292-c4cf6900-6c1d-11ea-92cf-0024652a7ee5.png">
<img width="350" alt="Bildschirmfoto 2020-03-22 um 09 11 51" src="https://user-images.githubusercontent.com/2264672/77245343-34455880-6c1e-11ea-86cd-9d854452d101.png">

## Setup

### Requirements

- Install [`js-datepicker`](https://www.npmjs.com/package/js-datepicker) and [`luxon`](https://www.npmjs.com/package/luxon)
- Make them globally available (on `window`) load `js-datepicker` css (in an angular project, just add them to your `angular.json` as scripts and styles)
- Keep in mind that it is only usable in an ionic project

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/@codaline-io/ionic-datepicker@VERSION/dist/ionic-datepicker.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install @codaline-io/ionic-datepicker --save`
- Put a script tag similar to this `<script src='node_modules/@codaline-io/ionic-datepicker/dist/ionic-datepicker.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install @codaline-io/ionic-datepicker --save`
- Add an import to the npm packages `import @codaline-io/ionic-datepicker;`
- Then you can use the element anywhere in your template, JSX, html etc

### In other frameworks

- Check stenciljs [framework integration documentation](https://stenciljs.com/docs/overview)

## Usage

- After the setup use `ionic-datepicker` as tag in your ionic pwa

### Configuration

- For configration check the [component readme](https://github.com/codaline-io/ionic-datepicker/blob/master/src/components/ionic-datepicker/readme.md)

### Styling

- Styling/theming is done with css-variables.
- All css variables can be found in the [variables.css](https://github.com/codaline-io/ionic-datepicker/blob/master/src/components/variables.css)
- All color/background variables are using ionic css variables per default
