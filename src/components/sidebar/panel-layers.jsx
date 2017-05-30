import React, {PropTypes} from 'react';
import Panel from './panel';
import IconVisible from 'react-icons/lib/fa/eye';
import IconHide from 'react-icons/lib/fa/eye-slash';
import IconAdd from 'react-icons/lib/ti/plus';
import IconEdit from 'react-icons/lib/fa/pencil';
import IconTrash from 'react-icons/lib/fa/trash';

const STYLE_ADD_WRAPPER = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  padding: "0px 15px"
};

const STYLE_ADD_LABEL = {
  fontSize: "10px",
  marginLeft: "5px"
};

const STYLE_EDIT_BUTTON = {
  cursor: "pointer",
  marginLeft: "5px",
  border: "0px",
  background: "none",
  color: "#fff",
  fontSize: "14px",
  outline: "0px"
};

const iconColStyle = { width:'2em' };
const tableStyle = {
  width: '100%',
  cursor: 'pointer',
  overflowY: 'auto',
  maxHeight: '20em',
  display: 'block',
  padding: '0 1em',
  marginLeft: '1px'
};

export default function PanelLayers({state: {scene, mode}}, {sceneActions, itemsActions, translator}) {

  let addClick = event => {
    sceneActions.addLayer();
    event.stopPropagation();
  };


  let addItemClick = event => {
    console.log("this is PanelLayers.addBoxClick");
    itemsActions.addBox("layer-1");

    event.stopPropagation();
  };

  let isLastLayer = scene.layers.size === 1;

  return (
    <Panel name={translator.t("Layers")}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th colSpan="3"></th>
            <th>{translator.t("Altitude")}</th>
            <th>{translator.t("Name")}</th>
          </tr>
        </thead>
        <tbody>
          {scene.layers.entrySeq().map(([layerID, layer]) => {

            let selectClick = e => sceneActions.selectLayer(layerID);
            let configureClick = e => sceneActions.openLayerConfigurator(layer.id);
            let delLayer = e => { e.stopPropagation(); sceneActions.removeLayer(layerID); };

            let swapVisibility = e => {
              sceneActions.setLayerProperties(layerID, {visible: !layer.visible});
              e.stopPropagation();
            };

            let isCurrentLayer = layerID === scene.selectedLayer;
            let eyeStyle = !layer.visible ? { fontSize:'1.25em', color: "#a5a1a1" } : { fontSize:'1.25em' };

            return (
              <tr key={layerID} onClick={selectClick} onDoubleClick={configureClick}>
                <td style={iconColStyle}>
                  { !isCurrentLayer ? <IconVisible onClick={swapVisibility} style={eyeStyle}/> : null }
                </td>
                <td style={iconColStyle}>
                  <IconEdit onClick={configureClick} style={STYLE_EDIT_BUTTON} title={translator.t("Configure layer")} />
                </td>
                <td style={iconColStyle}>
                  { !isLastLayer ? <IconTrash onClick={delLayer} style={STYLE_EDIT_BUTTON} title={translator.t("Delete layer")} /> : null }
                </td>
                <td style={{ width:'6em', textAlign:'center'}}>
                  [ h : {layer.altitude} ]
                </td>
                <td>
                  {layer.name}
                </td>
              </tr>
            );

          })}
        </tbody>
      </table>
      <div style={STYLE_ADD_WRAPPER} onClick={addClick}>
        <IconAdd />
        <span style={STYLE_ADD_LABEL}>{translator.t("New layer")}</span>
      </div>
      <div style={STYLE_ADD_WRAPPER} onClick={addItemClick}>
        <IconAdd />
        <span style={STYLE_ADD_LABEL}>{"Add Box"}</span>
      </div>
    </Panel>
  )

}

PanelLayers.propTypes = {
  state: PropTypes.object.isRequired,
};

PanelLayers.contextTypes = {
  sceneActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
