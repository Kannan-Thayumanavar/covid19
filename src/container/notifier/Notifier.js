import { h } from 'preact';
// import { useEffect } from 'preact/hooks';
import {askPermission} from '../../serviceWorker';

const Notifier = () => {

  function notiflyClickHandler() {
    askPermission();
  }

  return (
    <div>
      <button onClick={notiflyClickHandler}>Notify Me</button>
    </div>
  )
}

export default Notifier;