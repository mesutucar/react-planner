import {BoxGeometry, MeshBasicMaterial, Mesh, BoxHelper, Object3D} from 'three';

import React from 'react';

import {makeTextSprite} from '../../utils/makeTextSprite';

export default {
  name: "PIR",
  prototype: "items",

  info: {
    title: "PIR",
    tag: ['PIR'],
    group: "Sensor",
    description: "Passive Infra Red",
    image: require('./pir.png')
  },

  properties: {
    color: {
      label: "Color",
      type: "color",
      defaultValue: "#b0b0ff"
    },
    altitude: {
      label: "Altitude",
      type: "length-measure",
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
    thereismotion: {
      label: "There is Motion",
      type: "number",
      defaultValue: 0
    }
  },

  render2D: (element, layer, scene) => {
    let style = {
      stroke: "#000",
      strokeWidth: element.selected ? "2px" : "0px",
      fill: element.properties.get('color')
    };

    return (
      <g transform="translate(-10, -5)">
        <rect x="0" y="0" width="20" height="10" style={style}/>
      </g>
    );
  },

  render3D: (element, layer, scene) => {

    let newAltitude = element.properties.get('altitude').get('length');
    let geometry = new BoxGeometry(20, 10, 10);
    let material = new MeshBasicMaterial({
      color: element.properties.get('color')
    });

    let mesh = new Mesh(geometry, material);

    if (element.selected) {
      let box = new BoxHelper(mesh, '#000');
      box.material.linewidth = 1;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      mesh.add(box);
    }
    else {
      let box = new BoxHelper(mesh, '#0000c0');
      box.material.linewidth = 1;
      mesh.add(box);
    }

    mesh.position.y = newAltitude + 5;

    var textToDisplay = "Hareket " + (element.properties.get('thereismotion') == 1 ? "Var" : "Yok");
    var spritey = makeTextSprite(textToDisplay,
      { fontsize: 24, borderColor: {r:0, g:0, b:192, a:1.0}, backgroundColor: {r:172, g:172, b:255, a:0.8} } );
    spritey.position.set(10, 25, 0);
    //spritey.renderOrder = 10000;
    mesh.add(spritey);

    return Promise.resolve(mesh);
  }

};
