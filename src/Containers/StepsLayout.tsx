import { EventData, StateFrom } from 'xstate';
import { Welcome } from '../Components/Welcome';
import { Search } from '../Components/Search';
import { Passengers } from '../Components/Passengers';
import { Tickets } from '../Components/Tickets';
import { bookingMachine } from '../Machine/bookingMachine';
import './StepsLayout.css';

interface Props {
  state: StateFrom<typeof bookingMachine>,
  send: (event: any, payload?: EventData ) => void
}

export const StepsLayout = ({ state, send }: Props) => {
  const renderContent = () => {
    if(state.matches('initial')) return <Welcome send={send}/>;
    if(state.matches('search')) return <Search send={send} state={state}/>;
    if(state.matches('tickets')) return <Tickets send={send} context={state.context}/>;
    if(state.matches('passengers')) return <Passengers send={send} state={state}/>;
    return null;
  };

  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  );
}; 