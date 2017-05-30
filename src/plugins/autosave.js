const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;
import {loadProject} from '../actions/project-actions';

const TIMEOUT_DELAY = 500;

let timeout = null;

let projectLoaded = false;

export default function autosave(autosaveKey, delay) {

  console.log("this is autosave. autosaveKey: "+autosaveKey);

  return (store, stateExtractor) => {

    delay = delay || TIMEOUT_DELAY;

    if (!autosaveKey) return;
    if (!localStorage) return;

    //revert mesut: bu initial update isini yapiyor...
    if (localStorage.getItem(autosaveKey) !== null) {
      console.log("this is autosave.revert");
      //let data = localStorage.getItem(autosaveKey);
      //let json = JSON.parse(data);
      //console.log("***"+JSON.stringify(json));
      let json = fetch(`http://localhost:9001/tekno_1_1_scene`)
        .then(function(response) {
          return response.json()
        }).then(function(json) {
          console.log('*** parsed json', json)
          store.dispatch(loadProject(json));
          projectLoaded = true;
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    }

    //update mesut: periodic save yapiyor.
    store.subscribe(() => {
      console.log("this is autosave.update");
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {

        let state = stateExtractor(store.getState());

        let scene = state.sceneHistory.last();
        let json = JSON.stringify(scene.toJS());
        //localStorage.setItem(autosaveKey, json);

        if (projectLoaded) {
          fetch('http://localhost:9001/tekno_1_1_scene', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: json
          })
        }
      }, delay)
    });
  }
}
