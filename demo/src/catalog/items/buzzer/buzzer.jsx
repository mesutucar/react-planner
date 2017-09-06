import {BoxGeometry, MeshBasicMaterial, Mesh, BoxHelper} from 'three';

import React from 'react';

import {makeTextSprite} from '../../utils/makeTextSprite';

export default {
  name: "Buzzer",
  prototype: "items",

  info: {
    title: "Buzzer",
    tag: ['buzzer'],
    group: "Sensor",
    description: "Buzzer",
    image: require('./buzzer.png')
  },

  properties: {
    color: {
      label: "Color",
      type: "color",
      defaultValue: "#f4f400"
    },
    altitude: {
      label: "Altitude",
      type: "length-measure",
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
    isBuzzing: {
      label: "Klima",
      actionName: "Aç / Kapa",
      type: "toggle",
      defaultValue: false
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
      let box = new BoxHelper(mesh, '#d7d700');
      box.material.linewidth = 1;
      mesh.add(box);
    }

    mesh.position.y = newAltitude + 5;

    console.log("**** ", element.properties);

    var textToDisplay = "Klima " + (element.properties.get('isBuzzing') ? "Açık" : "Kapalı");
    var spritey = makeTextSprite(textToDisplay,
      { fontsize: 24, borderColor: {r:215, g:215, b:0, a:1.0}, backgroundColor: {r:244, g:244, b:0, a:0.8} } );
    spritey.position.set(10, 25, 0);

    mesh.add(spritey);

    return Promise.resolve(mesh);
  }

};



