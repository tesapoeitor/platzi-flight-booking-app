import { assign, createMachine } from 'xstate';
import { fetchCountries } from '../Utils/api';
import type { BookingMachineContext, BookingMachineEvent } from '../types/BookingMachine';

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "getCountries",
        src: () => fetchCountries,
        onDone: {
          target: "success",
          actions: assign({
            // @ts-ignore
            countries: (_, event) => event.data
          })
        },
        onError: {
          target: "failure",
          actions: "falloRequest"
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: {
          target: "loading",
        },
      },
    },
  },
};

const bookingMachine = createMachine<BookingMachineContext, BookingMachineEvent>({
  predictableActionArguments: true,
  id: "buy plane tickets",
  context: {
    passengers: [],
    selectedCountry: "",
    countries: [],
    error: ""
  },
  initial: "initial",
  states: {
    initial: {
      entry: "resetContext",
      on: {
        START: {
          target: "search",
          actions: "imprimirInicio"
        }
      }
    },
    // @ts-ignore
    search: {
      entry: "imprimirEntrada",
      exit: "imprimirSalida",
      on: {
        CONTINUE: {
          target: "passengers",
          actions: assign({
            selectedCountry: (_, event) => event.selectedCountry
          })
        },
        CANCEL: "initial",
      },
      ...fillCountries
    },
    passengers: {
      on: {
        DONE: {
          target: "tickets",
          cond: "moreThanOnePassengers"
        },
        CANCEL: "initial",
        ADD: {
          target: "passengers",
          actions: assign((context, event) => {
            context.passengers.push(event.newPassenger)
            return context
          })
        }
      }
    },
    tickets: {
      after: {
        5000: {
          target: 'initial'
        }
      },
      on: {
        FINISH: "initial"
      }
    }
  }
},
{
  actions: {
    imprimirInicio: () => console.log("imprimir inicio"),
    imprimirEntrada: () => console.log("imprimir entrada"),
    imprimirSalida: () => console.log("imprimir salida"),
    falloRequest: () => console.log("Fallo el request"),
    resetContext: assign(context => {
      context.passengers = []
      context.selectedCountry = ""
      return context
    })
  },
  guards: {
    moreThanOnePassengers: context => context.passengers.length > 0
  }
});

export { bookingMachine };