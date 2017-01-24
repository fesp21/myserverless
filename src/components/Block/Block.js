import React, { PropTypes } from 'react'
import classnames from 'classnames'
import styles from './Block.css'

const propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

export default function Block({ children, ...props }) {
  const classes = classnames(styles.cta, props.className)
  return (
    <div {...props} className={classes}>
      {children}
    </div>
  )
}

Block.propTypes = propTypes
