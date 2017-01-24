import React from 'react'
import styles from './Resource.css'

export default class Resource extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
  };

  render() {
    const params = this.props.params
    return (
      <div className={styles.page}>
        <h2>{'name of resource'}</h2>
        {params.id}
        <div>Image</div>
        <div>Tags</div>
      </div>
    )
  }
}
