import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import Svg from 'react-svg-inline'
import Button from '../../components/Button'
// import Button from '@serverless/components/Button'
import Default from '../../layouts/Default'
import Terminal from '../../components/Terminal'
import ContentBlock from '../../components/ContentBlock'
import terminalCommands from './terminalCommands'
import styles from './Homepage.css'
import playSvg from '../../assets/icons/play.svg'
import docsSvg from '../../assets/icons/book2.svg'

export default class Homepage extends Component {
  static propTypes = {
    phenomicLoading: PropTypes.bool
  }
  static loadingState = true
  constructor(props, context) {
    super(props, context)
    this.state = {
      show: true
    }
  }
  render() {
    return (
      <Default {...this.props} phenomicLoading={this.props.phenomicLoading} fullWidth>
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <div className={styles.bg}>
              <div className={styles.hero}>
                <div className={`${styles.heroLeft} fadeIn fadeInShort`}>

                  <div className={styles.heroFramework} />

                  <div className={styles.tagline}>
                    Build auto-scaling, pay-per-execution, event-driven apps on AWS Lambda
                  </div>
                  <div className={styles.buttons}>
                    <div className={styles.cta}>
                      <Button
                        kind='black'
                        href='/framework'
                      >
                        <span className={styles.ctaInner}>
                          <Svg svg={playSvg} cleanup />
                          <span className={styles.ctaText}>
                            WATCH THE VIDEO
                          </span>
                        </span>
                      </Button>
                    </div>

                    <div className={styles.cta}>
                      <Button
                        kind='black'
                        href='/framework/docs'
                      >
                        <span className={styles.ctaInner}>
                          <Svg svg={docsSvg} cleanup />
                          <span className={styles.ctaText}>
                            READ THE DOCS
                          </span>
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div ref='animDiv' className={`${styles.heroRight} zoomxIn zoomInxLong`}>
                  <Terminal commands={terminalCommands} />
                </div>
              </div>
              <div className={styles.poweredBy}>
                <span>Powered by AWS Lambda</span>
                <img className={styles.awsLogo} src={'https://s3-us-west-2.amazonaws.com/assets.site.serverless.com/images/aws_logo.png'} alt='aws Lambda' />
              </div>
            </div>

          </div>

          <div className={styles.testimonials}>
            <div className={styles.testimonial}>
              “The Serverless Framework is a core component of
              The Coca-Cola Company's initiative to reduce
              IT operational costs and deploy services faster.”
            </div>
            <div className={styles.customer}>
             - Patrick Brandt, Solutions Architect at The Coca-Cola Company
            </div>
          </div>

          <ContentBlock title='The Serverless Architecture' image={'https://s3-us-west-2.amazonaws.com/assets.site.serverless.com/images/architecture.gif'}>
            <p>
              Deploy your applications as independent functions, that respond to events, charge you only when they run, and scale automatically.
            </p>
          </ContentBlock>

          <ContentBlock title='The Serverless Framework' image={'https://s3-us-west-2.amazonaws.com/assets.site.serverless.com/images/framework.gif'}>
            <p>The open-source, application framework to easily build serverless architectures on AWS Lambda & more.  Startups and Fortune 500 companies are using it to build incredibly efficient applications.</p>
            <p>
              <Link to='/framework'>
                View the framework
              </Link>
            </p>
          </ContentBlock>

          <ContentBlock title='The Serverless Community' image={'https://s3-us-west-2.amazonaws.com/assets.site.serverless.com/images/community.png'}>
            <p>Over 1,900 people are in our chat room and on our forum every day discussing the Serverless Framework and Serverless Architectures. Join us!</p>
            <p>
              <a href='https://gitter.im/serverless/serverless' target='_blank' rel='noopener noreferrer'>
              Join the Chatroom
              </a>
              <br />
              <a href='http://forum.serverless.com' target='_blank' rel='noopener noreferrer'>
              Check out the Forum
              </a>
            </p>
          </ContentBlock>
        </div>
      </Default>
    )
  }
}
