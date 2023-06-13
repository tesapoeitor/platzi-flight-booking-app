import { EventData } from 'xstate';
import './Tickets.css';
import type { BookingMachineContext } from  '../types/BookingMachine';

interface Props {
  send: (event: any, payload?: EventData ) => void
  context: BookingMachineContext
}

export const Tickets = ({ send, context }: Props) => {
  const finish = () => {
    send('FINISH')
  };

  return (
    <div className='Tickets'>
      <p className='Tickets-description description'>Gracias por volar con book a fly 💚</p>
      <div className='Tickets-ticket'>
        <div className='Tickets-country'>Colombia</div>
        <div className='Tickets-passengers'>
          {context.passengers.map((passenger, idx) => {
            return <p key={idx}>{passenger}</p>
          })}
          <span>✈</span>
        </div>
      </div>
      <button onClick={finish} className='Tickets-finalizar button'>Finalizar</button>
    </div>
  );
}; 