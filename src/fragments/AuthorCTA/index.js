import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Block from '../../components/Block'

const AuthorCTA = (props) => {
  return (
    <Block className={props.className} style={props.style}>
      <h3>
        Join the Serverless<br />Guest Author Program
      </h3>
      <p>Have an awesome serverless story, tip, or trick? Share it with us.
      </p>
      <Link to='/blog/contribute/'>Learn More</Link>
    </Block>
  )
}

AuthorCTA.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}
export default AuthorCTA
