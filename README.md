# Star-Wars-Vehicles-Sales-Angular

Use Angular 19 for this project to ensure full compatibility with the `rxResource` API, specifically the `request` and `loader` properties. In Angular 20+, these options have been removed/changed, so this codebase is designed for Angular 19.

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

rxResource (Angular 19):
```bash
request
loader
```

rxJs operators:
```bash
map
forkJoin
of
```

## Inspiration

[Signals in Action: Building an App](https://www.youtube.com/watch?v=LHgJP7MwTWY&list=PLErOmyzRKOCobnHAC0RA5BwxGBageIhLv&index=1&pp=iAQB)

[Signals in Action: Loading Indicator](https://www.youtube.com/watch?v=5K0Jr2ymQEs&list=PLErOmyzRKOCobnHAC0RA5BwxGBageIhLv&index=2)

[SIA: Signals in a Service or a Component?](https://www.youtube.com/watch?v=xtxBMcEMcxU&list=PLErOmyzRKOCobnHAC0RA5BwxGBageIhLv&index=7)
- Skipped the error message handling part

## Documentation

[SWAPI - The Star Wars API](https://swapi.py4e.com/)

- [Vehicles](https://swapi.py4e.com/documentation#vehicles)
- [Films](https://swapi.py4e.com/documentation#films)


## Create an Angular 19 Project

Use npx to Run a Specific CLI Version Temporarily:

```bash
npx -p @angular/cli@19 ng new Star-Wars-Vehicles-Sales-Angular
```

Usually we can create a new Angular project like this:
```bash
ng new Star-Wars-Vehicles-Sales-Angular
```

But with the default `ng new` command — even if our global Angular CLI is v19, it downloads and uses the latest CLI version (20.0.5 here) to scaffold our new project.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version `20.0.5`.

## Downgrade after creating the project

If you already created the project with 20.x.x:

- Change all `@angular/*` dependencies in `package.json` to `^19.0.0`
- Delete `node_modules` and `package-lock.json`

Run:
```bash
npm install
```

## Create a new component

To generate a new component, run:

```bash
ng generate component component-name
```

## Create a new component with extra helpers

```bash
ng g c vehicle-selection --inline-template --inline-style --skip-tests
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.