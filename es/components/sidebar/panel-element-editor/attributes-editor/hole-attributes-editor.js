export { HoleAttributesEditor as default };
import React, { PropTypes, Component } from 'react';
import PropertyLengthMeasure from '../../../../catalog/properties/property-lenght-measure';

function HoleAttributesEditor(_ref, _ref2) {
  var element = _ref.element,
      _onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData;
  var translator = _ref2.translator;

  var offsetA = attributeFormData.has('offsetA') ? attributeFormData.get('offsetA') : element.offsetA;
  var offsetB = attributeFormData.has('offsetB') ? attributeFormData.get('offsetB') : element.offsetA;

  return React.createElement(
    'div',
    null,
    React.createElement(PropertyLengthMeasure, {
      value: offsetA,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('offsetA', mapped);
      },
      configs: { label: 'Offset 1', min: 0, max: Infinity }
    }),
    React.createElement(PropertyLengthMeasure, {
      value: offsetB,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('offsetB', mapped);
      },
      configs: { label: 'Offset 2', min: 0, max: Infinity }
    })
  );
}

HoleAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired
};

HoleAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired
};