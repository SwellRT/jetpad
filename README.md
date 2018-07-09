# Jetpad2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## SwellRT

SwellRT client is loaded according to the current environment configuration. Check out
`environments/environment.*` files for more info.

The angular code is load only after SwellRT JS library is sucessfully loaded. See
`main.ts` for further details.

## Other Dependencies

For basic UI layout and custom UI components we use bootstrap 4.
These are the NPM modules required. Script and style load is configured
in `angular.json`

```
npm i bootstrap
npm i jquery
npm i popper.js  # pop up library
```

In general, we follow Material Design UI framework using
the components of Angular Material project:

```
npm install --save @angular/material @angular/cdk
npm install --save @angular/animations
npm install --save hammerjs # gestures support
```

Also material icons are used as external dependency.
