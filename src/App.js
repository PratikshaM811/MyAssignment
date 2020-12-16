import logo from './logo.svg';
import './App.css';

import {
 
  HashRouter,
  Route,
  Switch,

} from 'react-router-dom';
import 'antd/dist/antd.css';
import CreateEvent from './CreateEvent';
import './App.css';

function App(){
  return(
    <div>
              <HashRouter>
                <Switch>
                  <Route path="/" exact component={CreateEvent} />
                               </Switch>
              </HashRouter>

    </div>
  )
}
export default App;
