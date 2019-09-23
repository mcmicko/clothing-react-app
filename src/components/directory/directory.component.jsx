import React, { Component } from 'react'
import './directory.styles.scss'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectDirectorySections} from '../../redux/directory/directory.selectors'
import MenuItem from '../menu-item/menu-item.component';

class Directory extends Component {
  render() {
    const {sections} = this.props; 
    return (
      <div className='directory-menu'>
        {
          sections.map(({id, ...otherSectionProps}) => (
            <MenuItem key={id} {...otherSectionProps}/>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);
