import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay, map, tap } from 'rxjs';

/**
 * Notes:
 * private vehicleUrl = 'https://swapi.py4e.com/api/vehicles'; this brings back the first page only.
 * 
 * Think about the states we need and make them into signals, which helps us easily manage value changes:
 * 1. Vehicles for the drop down list.=> Replace vehicles = signal<Vehicle[]>([]); with vehicles = computed(() => this.vehicleResource.value()); -> computed() makes vehicles reactive.
 * 2. selectedVehicle, which can be undefined when user is not selecting anything.
 * 3. quantity starts from 1, assuming user wants to buy at least one of the selected vehicles.
 * 4. total is the total price.
 * 5. colour is showing green or red based on the total price. This will recalculatd whenever the total price has changed.
 * 
 * The selectedVehicle can be undefined, so give a nullish coalescing operator as 0.
 * 
 * rxResource API: issue an HTTP request, and turn the retrieve data into a signal directly.
 * 1. A loader function must return an Observable.
 * 2. Use pipe to map the vehicle response only to the vehicle response's results field.
 * 3. vehicleResource is ResourceRef type (ResourceRef has a value property as a signal).
 * 4. map (all lowercase) is the RxJS operator used for mapping observable streams.
 * 
 * What if we want to reset the quantity field when user selects another vehicle:
 * 1. Whenever we want to reset a writable Signal based on another signal, use a linkedSignal.
 * 2. Whenever the "source" is changed, "computation" will be re-executed.
 * 3. Add an extra detail to computation: when there's value in selectedVehicle, reset quantity to 1 otherwise 0.
 * 
 * To see how the loading works, add a console log in rxResource and loadingEff, vehiclesEff.
 * 
 * Browser console prints:
 * Before the http request!
 * Loading indicator for vehicles: true
 * Vehicle data:  []
 * 
 * Then, after the resource is ready:
 * Before map!
 * After map!
 * Loading indicator for vehicles: false
 * Vehicle data:  (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
 * 
 * When we select a value in the vehicle drop down list, Selection looks like this:
 * Selection:  {name: 'T-16 skyhopper', model: 'T-16 skyhopper', manufacturer: 'Incom Corporation', cost_in_credits: '14500', length: '10.4 ', …}
 */

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class VehicleService {
  private vehicleUrl = 'https://swapi.py4e.com/api/vehicles';

  private http = inject(HttpClient);

  selectedVehicle = signal<Vehicle | undefined>(undefined);
  // quantity = signal(1);
  quantity = linkedSignal({
    source: this.selectedVehicle,
    // computation: () => 1
    computation: (value) => {
      if (value) {
        return 1;
      }
      return 0;
    }
  });

  total = computed(() => (this.selectedVehicle()?.cost_in_credits ?? 0) * this.quantity());
  color = computed(() => this.total() > 50000 ? 'green' : 'red');

  private vehicles$ = this.http.get<VehicleResponse>(this.vehicleUrl).pipe(
    tap(() => console.log('Before map!')),
    map(vr =>
        vr.results.map((v) => ({
          ...v,
          cost_in_credits: isNaN(Number(v.cost_in_credits))
              ? Math.round(Math.random() * 100000) // If the price is empty, randomly assign a price
              : v.cost_in_credits,
        }) as Vehicle)
    ),
    tap(() => console.log('After map!')),
    delay(2000)
  );

  private vehiclesResource = rxResource({
      loader: () => {
        console.log('Before http request!');
        return this.vehicles$;
      }
  });
  isVehicleLoading = this.vehiclesResource.isLoading;
  vehicles = computed(() => this.vehiclesResource.value() ?? [] as Vehicle[]);

  // Display signal values in the browser console whenever they change
  loadingEff = effect(() => console.log('Loading indicator for vehicles: ', this.isVehicleLoading()));
  vehiclesEff = effect(() => console.log('Vehicle data: ', this.vehicles()));
  selectedVehiclesEff = effect(() => console.log('Selected vehicle: ', this.selectedVehicle()));
}


export interface VehicleResponse { // checked in browser console
  count: number;
  next: string;
  previous: string;
  results: Vehicle[]
}

export interface Vehicle { // checked with SWAPI doc
  name: string;
  cost_in_credits: number;
  films: string[];
}
