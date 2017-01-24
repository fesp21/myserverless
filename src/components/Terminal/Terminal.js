import React, { Component, PropTypes } from 'react'
import styles from './Terminal.css'

const propTypes = {
  children: PropTypes.any,
  commands: PropTypes.array,
}

export default class TerminalCommands extends Component {
  constructor(props) {
    super(props)
    this.typeSpeed = 50
    this.lineIndex = 0
    this.currentLineLength = props.commands[0].text.length
    this.currentTextPosition = 0
    this.state = {
      text: ' ',
      obj: {}
    }
    this.delay = null
  }
  componentDidMount() {
    this.writeText()
  }
  componentWillUnmount() {
    window.clearTimeout(this.delay)
  }
  writeText() {
    const { commands } = this.props
    let contents
    if (commands[this.lineIndex].skip) {
      contents = commands[this.lineIndex].text
      this.setState({
        obj: {
          ...this.state.obj,
          [this.lineIndex]: {
            contents,
            className: commands[this.lineIndex].type
          }
        }
      })
    } else {
      const caret = (this.currentTextPosition === this.currentLineLength) ? '' : '_'
      contents = commands[this.lineIndex].text.substring(0, this.currentTextPosition) + caret
      this.setState({
        obj: {
          ...this.state.obj,
          [this.lineIndex]: {
            contents,
            className: commands[this.lineIndex].type
          }
        }
      })
    }

    if (this.currentTextPosition++ === this.currentLineLength) {
      this.currentTextPosition = 0
      this.lineIndex++
      if (this.lineIndex !== commands.length) {
        this.currentLineLength = commands[this.lineIndex].text.length
        this.delay = setTimeout(() => {
          this.writeText()
        }, 200)
      }
    } else {
      const timeout = (commands[this.lineIndex].skip) ? 0 : this.typeSpeed
      this.delay = setTimeout(() => {
        this.writeText()
      }, timeout)
    }
  }
  renderLines() {
    const { obj } = this.state
    const output = Object.keys(obj).map((key, i) => {
      const classes = obj[i].className
      return (
        <div
          key={i}
          className={classes}
          dangerouslySetInnerHTML={{ __html: obj[i].contents }}
        />
      )
    })
    return output
  }
  render() {
    const terminalOutput = this.renderLines()

    return (
      <div className={styles.wrapper}>

        <div className={styles.terminal}>
          <div className={styles.terminalHead}>
            <div className={`${styles.circle} ${styles.close}`} />
            <div className={`${styles.circle} ${styles.turn}`} />
            <div className={`${styles.circle} ${styles.expand}`} />
          </div>
          <div className={styles.terminalText}>
            {terminalOutput}
          </div>
        </div>
      </div>
    )
  }
}

TerminalCommands.propTypes = propTypes
