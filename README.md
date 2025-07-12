# Star-Wars-Vehicles-Sales-Angular

## Concepts

Use the following APIs for reactive state:
```bash
signal()
computed()
linkedSignal()
rxResource(): send HTTP requests and add a loading indicator
```

Add routes:
```bash
RouterLink and RouterOutlet
```

About providing a Service in root vs Component (e.g. vehicle.service.ts), if we register the vehicle serivce at the root level:
```bash
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  ...
```
Then, when we navigate away from vehicle selection screen, its selected value, etc. will **persist**, so when we go back to vehicle selection screen, the same value is displayed.

If we register the vehicle service at the component level:
```bash
@Injectable()
export class VehicleService {
  ...
```

And at the VehicleSelection component's metadata, add:
```bash
@Component({
  ...
  providers: [VehicleService],
  ...
})
export class VehicleSelection {
  ...
```
Then, when we navigate away from vehicle selection screen, its selected value, etc. will **disappear**, so when we go back to vehicle selection screen, the original values are gone (the values will be reset to default e.g. selectedVehicle goes back to undefined).

## Inspiration

[Signals in Action: Building an App](https://www.youtube.com/watch?v=LHgJP7MwTWY&list=PLErOmyzRKOCobnHAC0RA5BwxGBageIhLv&index=1&pp=iAQB)

[Signals in Action: Loading Indicator](https://www.youtube.com/watch?v=5K0Jr2ymQEs&list=PLErOmyzRKOCobnHAC0RA5BwxGBageIhLv&index=2)


## Create a new component with extra helpers

```bash
ng g c vehicle-selection --inline-template --inline-style --skip-tests
```

## Create a new Angular project

Used a custom boilerplate/template:
```bash
ng new Star-Wars-Vehicles-Sales-Angular
```

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

Shorthand and creating standalone components:

```bash
ng g c component-name
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
