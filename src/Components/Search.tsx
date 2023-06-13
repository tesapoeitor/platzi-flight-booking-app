import { ChangeEvent, useState } from 'react';
import './Search.css';
import { EventData, StateFrom } from 'xstate';
import { bookingMachine } from '../Machine/bookingMachine';

interface Props {
  state: StateFrom<typeof bookingMachine>,
  send: (event: any, payload?: EventData ) => void
}

export const Search = ({ send, state }: Props) => {
  const [flight, setFlight] = useState('');

  const goToPassengers = () => {
    send('CONTINUE', { selectedCountry: flight })
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFlight(event.target.value);
  };

  const countries = state.context.countries;

  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <select id="country" className='Search-select' value={flight} onChange={handleSelectChange}>
        <option value="" disabled>Escoge un país</option>
        {countries.map((country) => <option value={country.name.common} key={country.name.official}>{country.name.common}</option>)}
      </select>
      <button onClick={goToPassengers} disabled={flight === ''} className='Search-continue button'>Continuar</button>
    </div>
  );
}; 