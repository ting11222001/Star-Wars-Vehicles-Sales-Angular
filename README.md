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


## Create a new Angular project

Used a custom boilerplate/template:
```bash
ng new Star-Wars-Vehicles-Sales-Angular
```

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

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