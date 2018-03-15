import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'material-ui/Checkbox'
import * as Colors from 'material-ui/styles/colors'
import {FieldType} from 'simple-react-form'
import styles from './styles'
import _ from 'underscore'

const propTypes = {
  ...FieldType.propTypes,
  /**
   * The options for the checkbox.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    description: PropTypes.string
  })).isRequired
}

const defaultProps = {

}

export default class MultipleCheckbox extends React.Component {

  onCheck (value, currentVal) {
    var newVal = []
    if (_.contains(currentVal, value)) {
      newVal = _.without(currentVal, value)
    } else {
      newVal = _.union(currentVal, [value])
    }

    this.props.onChange(newVal)
  }

  renderOptions () {
    const currentVal = this.props.value || []
    return this.props.options.map(option => {
      return (
        <div key={option.value} style={{ marginTop: 10 }}>
          <Checkbox
            checked={_.contains(currentVal, option.value)}
            onCheck={() => this.onCheck(option.value, currentVal)}
            label={option.label}
            disabled={this.props.disabled || option.disabled}
            {...this.props.passProps}
          />
          <div
            style={{ marginLeft: 40, color: Colors.grey500, cursor: 'pointer' }}
            onClick={() => this.onCheck(option.value, currentVal)}>
            {(option.description || '').split('\n').map((text, index) => <div key={index}>{text}</div>)}
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div style={styles.fieldContainer}>
        <div style={styles.mirrorLabel}>
          {this.props.label}
        </div>
        {this.renderOptions()}
        <div style={styles.errorMessage}>{this.props.errorMessage}</div>
      </div>
    )
  }
}

MultipleCheckbox.propTypes = propTypes
MultipleCheckbox.defaultProps = defaultProps
