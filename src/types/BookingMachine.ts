import { Country } from "./Country"

export interface BookingMachineContext {
    passengers: string[],
    selectedCountry: string,
    countries: Country[],
    error: string
  }
  
export type BookingMachineEvent =
    | { type: 'START' }
    | { type: 'CONTINUE', selectedCountry: string }
    | { type: 'ADD', newPassenger: string }
    | { type: 'CANCEL' }
    | { type: 'DONE' }
    | { type: 'FINISH' }