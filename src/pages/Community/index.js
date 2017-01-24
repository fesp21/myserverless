import React, { Component, PropTypes } from 'react'
import Default from '../../layouts/Default'

export default class CommunityPage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }
  render() {
    return (
      <Default {...this.props} />
    )
  }
}
