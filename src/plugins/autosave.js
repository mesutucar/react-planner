//const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;
import {loadProject} from '../actions/project-actions';
var _constants = require('../constants');

const TIMEOUT_DELAY = 1000;

let timeout = null;
let projectLoaded = false;
let thisisdevelopment = true;

export default function autosave(autosaveKey, delay) {

  //console.log("this is autosave. autosaveKey: ", autosaveKey, "localStorage: ", localStorage);

  return (store, stateExtractor) => {

    delay = delay || TIMEOUT_DELAY;

    //if (!autosaveKey) return;
    //if (!localStorage) return;

    //revert mesut: bu initial update isini yapiyor...
    //if (localStorage.getItem(autosaveKey) !== null) {
      console.log("this is autosave.revert");
      let json = fetch(_constants.DATA_PATH)
      //let json = fetch(`http://localhost:8999/meskun_mahal_scene`)
        .then(function(response) {
          return response.json()
        }).then(function(json) {
          console.log('*** parsed json', json)
          store.dispatch(loadProject(json));
          projectLoaded = true;
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    //}

    if (thisisdevelopment) {
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
            fetch(_constants.DATA_PATH, {
            //fetch('http://localhost:8999/meskun_mahal_scene', {
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
    else {
      store.subscribe(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          let json = fetch(_constants.DATA_PATH)
            .then(function(response) {
              return response.json()
            }).then(function(json) {
              //let state = stateExtractor(store.getState());
              //if (JSON.stringify(json) != JSON.stringify(state.sceneHistory.last()))
                store.dispatch(loadProject(json));
            }).catch(function(ex) {
              console.log('parsing failed', ex)
            });
        }, delay)
      });
    }
  }
}
