import { h } from 'preact';
import Router from 'preact-router';
import Home from './routes/Home';
import { useEffect } from 'preact/hooks';
import {registerServiceWorker} from './serviceWorker';

const App = ({url}) => {

  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <Router url={url}>
      <Home path="/" />
    </Router>
  );
}

export default App;