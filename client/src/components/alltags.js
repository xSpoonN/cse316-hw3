import React from 'react'
import PropTypes from 'prop-types'
const modle = require('../models/axiosmodel.js')

export default async function AllTags ({ setSearchQuery }) {
  const tags = await modle.getAllTags()
  tags.foreach((item, index) => {
    return <Tag key={item.tid} tag={item} index={index} setSearchQuery={setSearchQuery}/>
  })

  return (
    <>
    <p id="t_tagcount">{tags.length} Tags</p>
    <p id="t_alltags">All Tags</p>
    <br /><br /><br />
    <div id="tagcontainer">
      {tags}
    </div>
    </>
  )
}
AllTags.propTypes = {
  setSearchQuery: PropTypes.func.isRequired
}

export function Tag ({ tag, index, setSearchQuery }) {
  const c = modle.getQuestionCountByTagId(tag.tid)
  return (
    <div className="tagbox" style={{ gridColumn: `${index % 3 + 1} / span 1`, gridRow: 'auto' }}>
      <p className="taglink" onClick={setSearchQuery('[' + tag.name + ']')}>{tag.name}</p>
      <p className="tagqcount">{c} question{c === 1 ? '' : 's'}</p>
    </div>
  )
}
Tag.propTypes = {
  tag: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  setSearchQuery: PropTypes.func.isRequired
}
