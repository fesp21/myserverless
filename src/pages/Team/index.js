import React from 'react'
import Default from '../../layouts/Default'
import teamMembers from './team.json'
import styles from './Team.css'

export default class TeamPage extends React.Component {
  listTeamMembers = () => {
    return teamMembers.map((person, i) => {
      return (
        <div className={styles.block} key={i}>
          <span className={styles.image}>
            <div className={styles.imageBG}>
              <img src={person.avatar} alt='' />
            </div>
          </span>
          <div className={styles.about}>
            <div className={styles.content}>
              <h2>{person.name}</h2>
              <p dangerouslySetInnerHTML={{ __html: person.bio.short }} />
            </div>
          </div>
        </div>
      )
    })
  }
  render() {
    return (
      <Default {...this.props} className={styles.partnerPage}>
        <h1>The Serverless Team</h1>
        <p>We're a passionate group of developers, writers, and operators who love what we do. Half of us work in the San Francisco office with the other half distributed across the globe. We get together twice a year at different exotic retreat locations to keep the good vibes flowing.</p>
        <section className={styles.tiles}>
          {this.listTeamMembers()}
        </section>
      </Default>
    )
  }
}
