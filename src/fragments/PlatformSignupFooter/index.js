import React, { Component } from 'react'
import { getItem, createCookie, readCookie } from '../../utils/storage'
import HelloBar from '../../components/HelloBar'
import NewAuth from '../../components/NewAuth'
import styles from './PlatformSignupFooter.css'

const DISMISS = 'dismissSignup'

export default class PlatformSignupFooter extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      showHelloBar: false,
    }
  }
  componentDidMount() {
    window.addEventListener('serverlessLogin', this.handleToggle, false)
    this.showBar(10000)
  }
  componentWillUnmount() {
    window.clearTimeout(this.delay)
    window.removeEventListener('serverlessLogin', this.handleToggle)
  }
  handleToggle = () => {
    this.setState({
      showHelloBar: false
    })
  }
  showBar = (timeout) => {
    this.delay = setTimeout(() => {
      const isUser = getItem('profile')
      const hasDismissCookie = readCookie(DISMISS)
      if (hasDismissCookie || isUser) {
        return false
      }
      this.setState({
        showHelloBar: true,
      })
    }, timeout)
  }
  setCookie = () => {
    createCookie(DISMISS, true, 2)
  }
  render() {
    let renderElement = null
    if (this.state.showHelloBar) {
      renderElement = (
        <HelloBar
          onClose={this.setCookie}
          active={this.state.showHelloBar}
          position={'bottom'}
          className={styles.signUp}
        >
          <div className={styles.inner}>
            <div className={styles.text}>
              The Serverless Platform is coming
            </div>
            <NewAuth>
              <button className={styles.button}>Register for the Beta</button>
            </NewAuth>
          </div>
        </HelloBar>
      )
    }
    return renderElement
  }
}
