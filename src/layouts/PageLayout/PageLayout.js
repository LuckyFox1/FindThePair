import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='container'>
    <div className='header'>
      <IndexLink to='/' className='game-link link' activeClassName='page-layout__nav-item--active'>Game</IndexLink>
      <Link to='/settings' className='settings-link link' activeClassName='page-layout__nav-item--active'>
        Settings
      </Link>
    </div>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
