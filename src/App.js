import { h } from 'preact';
import Router from 'preact-router';
import Home from './routes/Home';

const App = ({url}) => (
  <Router url={url}>
    <Home path="/" />
  </Router>
);

export default App;