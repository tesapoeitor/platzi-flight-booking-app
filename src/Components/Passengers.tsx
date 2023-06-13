import { ChangeEvent, FormEvent, useState } from 'react';
import './Passengers.css';
import { EventData, StateFrom } from 'xstate';
import { bookingMachine } from '../Machine/bookingMachine';

interface Props {
  state: StateFrom<typeof bookingMachine>,
  send: (event: any, payload?: EventData ) => void,
}

export const Passengers = ({ send, state }: Props) => {
  const [value, changeValue] = useState('');

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    changeValue(e.target.value);
  }

  const goToTicket = () => {
    send('DONE')
  }

  const submit = (e: FormEvent) => {
    send('ADD', { newPassenger: value })
    e.preventDefault();
    changeValue('');
  }

  const { passengers } = state.context

  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar ✈️</p>
      {passengers && passengers.map((passenger, index) => <p key={passenger + index}><strong>✔ {passenger}</strong></p>)}
      <input 
        id="name" 
        name="name" 
        type="text" 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-add button-secondary'
          type="submit"
        >
          Agregar Pasajero
        </button>
        <button
          className='Passenger-pay button'
          type="button"
          onClick={goToTicket}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};