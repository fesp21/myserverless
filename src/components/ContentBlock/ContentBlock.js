import React, { PropTypes } from 'react'
import styles from './ContentBlock.css'

const propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  image: PropTypes.string,
}

const ContentBlock = ({ children, color, style, title, image }) => {
  const imageSrc = image || 'http://www.fillmurray.com/200/200'
  const colorStyle = styles[color] || ''
  return (
    <div className={'contentBlocks'}>
      <section style={style} className={`${styles.wrapper} ${colorStyle}`}>
        <div className={styles.inner}>
          <span className={styles.image}>
            <img src={imageSrc} alt='' draggable='false' />
          </span>
          <div className={styles.content}>
            <h2 className={styles.title}>{title}</h2>
            {children}
          </div>
        </div>
      </section>
    </div>
  )
}

ContentBlock.propTypes = propTypes
export default ContentBlock
