import React from 'react'
// import AutoForm from 'react-auto-form'
import Modal from '../../components/Modal/Modal'
import Default from '../../layouts/Default'
import partners from './partners.json'
import styles from './Partners.css'

const defaultPartner = 'trek10'

export default class PartnersPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      showModal: false,
      partner: partners[defaultPartner]
    }
  }
  openModal = (e) => {
    e.preventDefault()
    const currentPartner = e.target.dataset.partner || defaultPartner
    this.setState({
      showModal: true,
      partner: partners[currentPartner]
    })
  }
  handleToggle = (e) => {
    e.preventDefault()
    this.setState({
      showModal: !this.state.showModal,
    })
  }
  listPartners() {
    const handler = this.openModal
    return Object.keys(partners).map((company, i) => {
      return (
        <div className={styles.block} key={i}>
          <span className={styles.image}>
            <div className={styles.imageBG}>
              <img src={partners[company].logo} alt='' />
            </div>
          </span>
          <a href='' data-partner={company} onClick={handler}>
            <div className={styles.content}>
              <h2>{partners[company].name}</h2>
              <p dangerouslySetInnerHTML={{ __html: partners[company].tagline }} />
            </div>
          </a>
        </div>
      )
    })
  }
  showCaseStudies = () => {
    return Object.keys(partners).map((company, i) => {
      return (
        <div className={styles.caseStudyItem} key={i}>
          {partners[company].stories && partners[company].stories.map((link, j) => {
            return (
              <span className={styles.caseStudyLink} key={j}>
                <a href={link.url}>
                  {link.title} - <strong>{partners[company].name}</strong>
                </a>
              </span>
            )
          })}
        </div>
      )
    })
  }
  render() {
    const { partner, showModal } = this.state
    return (
      <Default {...this.props} className={styles.partnerPage}>
        <h1>Serverless Partners Program</h1>
        <p>Serverless Partners are consultants and agencies who are verified experts in serverless application development with the Serverless Framework</p>
        <p style={{ position: 'relative', zIndex: 2 }}>
          If you are interested in learning more about our partners program send us an email <a href='mailto:partners@serverless.com'>partners@serverless.com</a>
        </p>
        <section className={styles.tiles}>
          {this.listPartners()}
        </section>
        <section className={styles.caseStudies}>
          <h2>Partner Success Stories</h2>
          {this.showCaseStudies()}
        </section>
        <Modal
          className={styles.modalWrapper}
          active={showModal}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
        >
          <div className={styles.modalLogoWrapper} >
            <img className={styles.modalLogo} src={partner.logo} alt='' />
          </div>
          <h2>{partner.name}</h2>
          <div>
            <div dangerouslySetInnerHTML={{ __html: partner.description }} />
            <div>
              {partner.stories && partner.stories.map((link, i) => {
                return <a href={link.url} key={i}>{link.title}</a>
              })}
            </div>
            <div className={styles.siteLink}>
              <a href={partner.website} target='_blank' rel='noopener noreferrer'>
                Visit {`${partner.name}'s`} site
              </a>
            </div>
          </div>
        </Modal>
      </Default>
    )
  }
}
