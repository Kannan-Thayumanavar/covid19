import { h } from 'preact';
import CovidLister from '../container/covidLister/CovidLister';
import Notifier from '../container/notifier/Notifier';

const Home = () => (
  <div>
    <div style={{background: '#673AB7', color: 'white', height: '200px', borderRadius: '5px'}}>
      <div style={{ paddingTop: '100px', textAlign: 'center' }}>
        Hello Preact!
      </div>
    </div>
    <Notifier/>
    <CovidLister/>
  </div>
);

export default Home;