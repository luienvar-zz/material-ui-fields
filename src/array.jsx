import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import {ArrayComponent} from 'simple-react-form'

const styles = {
  label: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 5,
    fontSize: 12
  }
}

const propTypes = {
  ...ArrayComponent.propTypes,
  parentClassName: PropTypes.string,
  childrenClassName: PropTypes.string,
  useSmallSpace: PropTypes.bool,
  smallRemoveButtonTooltipPosition: PropTypes.string
}

const defaultProps = {
  ...ArrayComponent.defaultProps,
  childrenClassName: '',
  parentClassName: '',
  useSmallSpace: false,
  smallRemoveButtonTooltipPosition: 'bottom-center'
}

export default class MaterialArray extends ArrayComponent {

  renderChildrenItem ({ index, children }) {
    if (this.props.useSmallSpace) return this.renderChildrenSmallItem({ index, children })
    return (
      <div className={this.props.childrenClassName} key={`${this.props.fieldName}.${index}`}>
        <Paper style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
          {this.renderChildrenItemWithContext({index, children})}
          <div style={{ marginTop: 10, textAlign: 'right' }}>
            {this.renderRemoveButton(index)}
          </div>
        </Paper>
      </div>
    )
  }

  renderChildrenSmallItem ({ index, children }) {
    return (
      <div className={this.props.childrenClassName} key={`${this.props.fieldName}.${index}`} style={{ marginTop: 10, marginBottom: 10, display: 'flex' }}>
        <div style={{ flexBasis: '90%', maxWidth: '90%' }}>
          {this.renderChildrenItemWithContext({index, children})}
        </div>
        <div style={{ flexBasis: '10%', maxWidth: '10%', marginTop: 20, textAlign: 'right' }}>
          {this.renderSmallRemoveButton(index)}
        </div>
      </div>
    )
  }

  renderRemoveButton (index) {
    if (this.props.disabled) return
    return <RaisedButton label={this.props.removeLabel} onTouchTap={() => this.removeItem(index)}/>
  }

  renderSmallRemoveButton (index) {
    if (this.props.disabled) return
    return (
      <IconButton
        iconClassName='material-icons'
        onTouchTap={() => this.removeItem(index)}
        tooltip={this.props.removeLabel}
        tooltipPosition={this.props.smallRemoveButtonTooltipPosition}
        >
        clear
      </IconButton>
    )
  }

  renderAddButton () {
    if (!this.props.showAddButton) return
    if (this.props.disabled) return
    if (this.props.useSmallSpace) return this.renderSmallAddButton()
    return <RaisedButton label={this.props.addLabel} onTouchTap={() => this.addItem()}/>
  }

  renderSmallAddButton () {
    return (
      <div style={{ textAlign: 'right' }}>
        <IconButton
          iconClassName='material-icons'
          onTouchTap={() => this.addItem()}
          tooltip={this.props.addLabel}
          >
          add
        </IconButton>
      </div>
    )
  }

  render () {
    return (
      <div style={{ marginTop: 20 }}>
        <div style={styles.label}>{this.props.label}</div>
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        <div className={this.props.parentClassName}>
          {this.renderChildren()}
        </div>
        <div style={{ marginTop: 10 }}>
          {this.renderAddButton()}
        </div>
      </div>
    )
  }
}

MaterialArray.propTypes = propTypes
MaterialArray.defaultProps = defaultProps
