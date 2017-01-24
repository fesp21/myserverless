/**
 * Base Doc template
 */
import React, { Component, PropTypes } from 'react'
import { BodyContainer } from 'phenomic'
import { Link } from 'react-router'
import Svg from 'react-svg-inline'
import Helmet from 'react-helmet'
import debounce from 'lodash.debounce'
import gitHubSvg from '../../assets/icons/github.svg'
import generatedMenu from './generated-menu'
import Default from '../Default'
import Breadcrumbs from '../../components/Breadcrumbs'
import ContentLoading from '../../components/ContentLoading/Paragraph'
// Global styles are used to style html classes from github markdown files
import globalStyles from './Doc.global.css' // eslint-disable-line
import styles from './Doc.css'

const Clipboard = (typeof window !== 'undefined') ? require('clipboard') : null
/*
TODO: add previous release tag links https://developer.github.com/v3/repos/releases/
*/
const preventDefault = (e) => e.preventDefault()

function currentUrl(url) {
  if (url) {
    return url
  }
  if (typeof window !== 'undefined') {
    return window.location.pathname
  }
  return 'fakeURL'
}

class Doc extends Component {
  static hasLoadingState = true
  constructor(props, context) {
    super(props, context)
    this.sidebarNode = null
    this.sidebarNodeOffset = null
  }
  componentDidMount() {
    const { origin, pathname } = window.location
    if (window.outerWidth > 600) {
      window.addEventListener('scroll', debounce(this.handleScroll, 10))
      window.addEventListener('resize', debounce(this.handleScroll, 10))
      this.sidebarNode = this.refs.sidebar
      this.sidebarNodeOffset = this.sidebarNode.offsetTop
      this.handleScroll()
    }
    // disable anchor tags until they are removed
    this.attachHandlers()
    setTimeout(() => {
      this.clipboardInstance = new Clipboard('.phenomic-HeadingAnchor', { // eslint-disable-line
        text(trigger) { // eslint-disable-line
          return `${origin}${pathname.replace(/\/$/, '')}#${trigger.parentNode.id}`
        }
      })
      this.clipboardInstance.on('error', (e) => {
        // log error in safari
        console.log(e) // eslint-disable-line
      })
    }, 10)

    initializeSearch()
  }
  componentDidUpdate(previousProps, _prevState) {
    if (previousProps.__url !== this.props.__url) {
      this.dettachHandlers()
      setTimeout(() => {
        this.attachHandlers()
      }, 0)
    }
  }
  componentWillUnmount() {
    this.clipboardInstance.destroy()
    // disable anchor tags until they are removed
    this.dettachHandlers()
  }
  attachHandlers = () => {
    const html = document.documentElement
    if (html && html.className.indexOf('safari') > -1) {
      // clipboard doesnt work in safari
      return false
    }
    const elements = document.getElementsByClassName('phenomic-HeadingAnchor')
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', preventDefault, false)
    }
  }
  dettachHandlers = () => {
    const html = document.documentElement
    if (html && html.className.indexOf('safari') > -1) {
      return false
    }
    const elements = document.getElementsByClassName('phenomic-HeadingAnchor')
    for (let i = 0; i < elements.length; i++) {
      elements[i].removeEventListener('click', preventDefault, false)
    }
  }
  handleScroll = (_event) => {
    /* TODO: make editLink fixed */
    const offsetHeigh = window.pageYOffset || document.documentElement.scrollTop
    const stickyNavHeight = 70
    const cachedOffset = this.sidebarNodeOffset - stickyNavHeight
    if (offsetHeigh >= cachedOffset) {
      if (this.sidebarNode.style.position !== 'fixed') {
        this.sidebarNode.style.position = 'fixed'
        this.sidebarNode.style.top = `${stickyNavHeight}px`
        // this.sidebarNode.style.background = 'red'
      }
    } else {
      this.sidebarNode.style.position = 'relative'
      this.sidebarNode.style.top = '0px'
      // this.sidebarNode.style.background = 'white'
    }
  }
  renderList() {
    const { __url } = this.props
    const url = currentUrl(__url)
    const trimmedURL = url.replace(/\/$/, '')
    const menu = generatedMenu[__url] || generatedMenu[trimmedURL]
    let items = ''
    if (menu) {
      items = menu.map((item, i) => {
        const currentStyle = (item.path === trimmedURL) ? styles.currentURL : ''
        return (
          <li key={i} className={`${styles.subPageLink} ${currentStyle}`}>
            <Link to={item.path}>
              {item.title}
            </Link>
          </li>
        )
      })
    }
    return items
  }
  renderNewSidebar() {
    const { __url } = this.props
    const items = this.renderList()
    const url = currentUrl(__url)
    const trimmedURL = url.replace(/\/$/, '')
    const parent = trimmedURL.split('/')
    const parentName = parent[parent.length - 2]
    let parentDisplay = parentName

    if (parentName === 'aws') {
      parentDisplay = 'AWS'
    } else if (parentName === 'framework') {
      parentDisplay = 'Framework Docs'
    }
    return (
      <div className={styles.sidebar}>
        <div ref='sidebar' className={styles.sidebarInner}>
          <div className={styles.searchBumper}>
            <div className={styles.searchWrapper}>
              <input
                className={styles.searchBox}
                id='algolia-search'
                placeholder='&#9889;  Search docs'
                type='text'
              />
            </div>
          </div>

          <div className={styles.pageContext}>
            {parentDisplay}
          </div>

          <div className={styles.subPages}>
            <ul>
              {items}
            </ul>
          </div>


          <div className={styles.versionNumber}>
            Docs Version: {process.env.DOCS_VERSION}
          </div>
        </div>
      </div>
    )
  }
  render() {
    const {
      __url,
      head,
      body,
      isLoading,
    } = this.props
    const url = currentUrl(__url)
    let githubURL

    let markdownContent

    if (isLoading) {
      markdownContent = (
        <div style={{ maxWidth: '650px' }}>
          <ContentLoading numberOfLines={30} />
        </div>
      )
    } else {
      githubURL = `https://github.com/serverless/serverless/edit/master${head.gitLink}`
      markdownContent = (
        <BodyContainer>
          {body}
        </BodyContainer>
      )
    }

    const breadcrumbs = (
      <div className={`${styles.breadCrumbContainer}  docs-breadcrumbs`}>
        <Breadcrumbs path={url} />
      </div>
    )

    return (
      <Default {...this.props} fullWidth className={`${styles.docPage}`} header={breadcrumbs}>
        <Helmet
          link={[
            {
              rel: 'stylesheet',
              href: 'https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css'
            }
          ]}
          script={[
            {
              src: 'https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js', type: 'text/javascript'
            }
          ]}
        />
        <div className={styles.docContainer}>
          <div className={styles.docWrapper}>

            {this.renderNewSidebar()}

            <div className={`${styles.content} docs-content`}>
              <a title='Edit this page on github' className={styles.editLinkWrapper} target='_blank' rel='noopener noreferrer' href={githubURL}>
                <span ref='editLink' className={styles.editLink}>
                  <Svg svg={gitHubSvg} cleanup />
                  <span className={styles.text}>Edit on github</span>
                </span>
              </a>
              {markdownContent}
            </div>
          </div>
        </div>
      </Default>
    )
  }
}

function initializeSearch() {
  if (typeof docsearch !== 'undefined') {
    docsearch({ // eslint-disable-line
      apiKey: 'd5a39b712b86965d93534207ef5423df',
      indexName: 'serverless',
      inputSelector: '#algolia-search',
      debug: false // set to true to style search box
    })
  } else {
    setTimeout(() => {
      initializeSearch()
    }, 50)
  }
}

Doc.propTypes = {
  __url: PropTypes.string,
  head: PropTypes.object,
  body: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
  /** if true, page will be full width */
  fullWidth: PropTypes.bool,
  /** set loading set **/
  isLoading: PropTypes.bool,
}

export default Doc
