import React, { Component } from "react";

class PresetUpdate extends Component {
  render () {
    return (
      <div className="presetButtonsContainer">
        <button id='updatePresetButton' onClick={this.props.updatePreset}>Update Preset</button>
        <button id='loadPresetButton' onClick={this.props.loadUserPresets}>Load Preset</button>
      </div>
    )
  }
}

export default PresetUpdate;