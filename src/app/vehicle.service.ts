import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay, map } from 'rxjs';

/**
 * Notes:
 * private vehicleUrl = 'https://swapi.py4e.com/api/vehicles'; this brings back the first page only.
 * We only use these two fields of each Vehicle: name and cost_in_credits.
 * 
 * Think about the states we need and make them into signals, which helps us easily manage value changes:
 * Vehicles for the drop down list.
 * selectedVehicle, which can be undefined when user is not selecting anything.
 * quantity starts from 1, assuming user wants to buy at least one of the selected vehicles.
 * 
 * name and the price of the vehicle will be extracted from vehicle.
 * 
 * total is the total price.
 * colour is showing green or red based on the total price. This will recalculatd whenever the total price has changed.
 * 
 * as the selectedVehicle can be undefined - in that case, give a nullish coalescing operator as 0.
 * rxResource API: issue an HTTP request, and turn the retrieve data into a signal directly.
 * We defined a loader function which must return an Observable.
 * Use pipe to map the vehicle response only to the vehicle response's results field.
 * vehicleResource is of ResourceRef type (ResourceRef should have a value property as a signal).
 * Replace vehicles = signal<Vehicle[]>([]); with vehicles = computed(() => this.vehicleResource.value()); -> computed() makes vehicles reactive.
 * map (all lowercase) is the RxJS operator used for mapping observable streams.
 * streams used to be loader but now it's changed to streams.
 * 
 * What if we want to reset the quantity field when user selects another vehicle:
 * Whenever we want to reset a writable Signal based on another signal, use a linkedSignal.
 * Whenever the "source" is changed, "computation" will be re-executed.
 * Add an extra detail to computation: when there's value in selectedVehicle, reset quantity to 1 otherwise 0.
 * 
 * To see how the loading works, add a console log in rxResource and loadingEff, vehiclesEff.
 * Browser console will print:
 * Before the http request!
 * Loading indicator:  true
 * Vehicle data:  []
 * 
 * Loading indicator:  false
 * Vehicle data:  (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
 * 
 * Since we don't want to expose vehicleResource to components, add a property called isLoading.
 */
@Injectable({
  providedIn: 'root'
})
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

  private vehicleResource = rxResource({
    stream: () => {
      console.log('Before the http request!');
      return this.http.get<VehicleResponse>(this.vehicleUrl).pipe(
        map(vehicleResponse => vehicleResponse.results),
        delay(1000) // delay for 1 sec to see the loading indicator!
      ) 
    },
    defaultValue: [],
  });
  vehicles = computed(() => this.vehicleResource.value() ?? [] as Vehicle[]);

  // display the isLoading property whenever it changes
  loadingEff = effect(() => console.log('Loading indicator: ', this.vehicleResource.isLoading()));
  vehiclesEff = effect(() => console.log('Vehicle data: ', this.vehicles()));

  isLoading = this.vehicleResource.isLoading;
}


export interface VehicleResponse {
  count: number;
  next: string;
  previous: string;
  results: Vehicle[]
}

export interface Vehicle {
  name: string;
  cost_in_credits: number;
}
