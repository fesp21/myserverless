import React, { Component, PropTypes } from 'react'
import styles from './Terminal.css'

const propTypes = {
  children: PropTypes.any
}

export default class Ternimal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commands: {},
      history: [],
      prompt: '$ '
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }
  componentDidMount() {
    const term = this.refs.term
    this.registerCommands()
    this.showWelcomeMsg()
    term.focus()
  }
  componentDidUpdate() {
    const el = this.refs.terminal
      // var container = document.getElementsByClassName('container')[0];
    const container = document.getElementById('main')
    container.scrollTop = el.scrollHeight
  }
  clearHistory = () => {
    this.setState({ history: [] })
  }
  registerCommands() {
    this.setState({
      commands: {
        clear: this.clearHistory,
        ls: this.listFiles.bind(this),
        intro: this.showWelcomeMsg.bind(this),
        help: this.showHelp.bind(this),
        github: this.openLink('http://github.com/serverless'),
      }
    })
  }
  listFiles() {
    this.addHistory('README.md')
  }
  showWelcomeMsg() {
    this.addHistory('Welcome to Serverless.com')
    this.addHistory('Type `help` to see what all commands are available')
  }
  openLink = (link) => {
    return function () {
      window.open(link, '_blank')
    }
  }
  showHelp() {
    this.addHistory('help - this help text')
    this.addHistory('source - browse the code for this page')
    this.addHistory('clear - clear screen')
    this.addHistory('ls - list files')
  }

  handleInput(e) {
    if (e.key === 'Enter') {
      const inputText = this.refs.term.value
      const inputArray = inputText.split(' ')
      const input = inputArray[0]
      const arg = inputArray[1]
      const command = this.state.commands[input]

      this.addHistory(`${this.state.prompt} ${inputText}`)

      if (command === undefined) {
        this.addHistory(`sh: command not found: ${input}`)
      } else {
        command(arg)
      }
      this.clearInput()
    }
  }
  clearInput() {
    this.refs.term.value = ''
  }
  addHistory(output) {
    const history = this.state.history
    history.push(output)
    this.setState({
      history
    })
  }
  handleClick() {
    const term = this.refs.term
    term.focus()
  }
  render() {
    const output = this.state.history.map((op, i) => {
      return <p key={i}>{op}</p>
    })
    return (
      <div className={styles.window} id='main' ref='terminal'>
        <div className={styles.bar}>
          <div className={styles.btn} />
        </div>
        <div className={styles.body}>
          <div className={styles.inputContainer} onClick={this.handleClick}>
            {output}
            <p>
              <span className={styles.prompt}>
                {this.state.prompt}
              </span>
              <input
                type='text'
                className={styles.input}
                onKeyPress={this.handleInput}
                ref='term'
              />
            </p>
          </div>
        </div>
      </div>
    )
  }
}

Ternimal.propTypes = propTypes
