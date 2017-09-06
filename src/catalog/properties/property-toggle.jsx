import React, {PropTypes} from 'react';
import FormLabel from '../../components/style/form-label'
import Button from '../../components/style/button';

const tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
const firstTdStyle = { width: '6em' };

export default function PropertyToggle({value, onUpdate, configs, sourceElement, internalState}) {
  return (
    <table className="PropertyToggle" style={tableStyle}>
      <tbody>
        <tr>
          <td style={firstTdStyle}><FormLabel>{configs.label}</FormLabel></td>
          <td>
            <Button onClick={e =>
              {
                fetch("http://localhost:8999/tekno_1_1_scene", {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method: 'PATCH',
                  body: '[{"op": "replace", "path":"/layers/layer-1/items/H1hG0_LMW/properties/isBuzzing", "value": ' + (!value) + '}]'
                });
                onUpdate(!value)
              }
            } size="small">{configs.actionName}</Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

PropertyToggle.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object
};
