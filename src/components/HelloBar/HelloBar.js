import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { addAnimationEvent, removeAnimationEvent } from '../../utils/animations'
import styles from './HelloBar.css'

const propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  position: PropTypes.string,
  active: PropTypes.bool
}

const defaultProps = {
  position: 'top'
}

export default class HelloBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      active: props.active || false
    }
  }
  componentDidMount() {
    addAnimationEvent(this.refs.hellobar, 'AnimationEnd', this.animationCallback)
  }
  componentWillUnmount() {
    removeAnimationEvent(this.refs.hellobar, 'AnimationEnd', this.animationCallback)
  }
  animationCallback = (event) => { // eslint-disable-line
    // console.log('animationName', event.animationName)
    const node = this.refs.hellobar
    const anim = event.animationName
    if (event.target !== node) {
      return false
    }
    if (anim === 'flipDownSimple' || anim === 'flipUpSimple') {
      node.style.display = 'none'
    }
  }
  handleClose = () => {
    const { onClose } = this.props
    this.setState({
      active: false
    }, () => {
      if (onClose) {
        onClose()
      }
    })
  }
  render() {
    const { style, className, position } = this.props
    const showOrHide = (this.state.active) ? styles.show : styles.hide
    const classes = classnames(
      styles.hellobar, // base class
      // styles.fullWidth, // size
      styles.bounceFlip, // effect
      styles[position],
      className, // prop based class
      showOrHide
    )
    return (
      <div ref='hellobar' className={classes} style={style}>
        <div className={styles.inner}>
          {this.props.children}
        </div>
        <span className={`${styles.close} hello-close`} onClick={this.handleClose} />
      </div>
    )
  }
}
HelloBar.defaultProps = defaultProps
HelloBar.propTypes = propTypes
