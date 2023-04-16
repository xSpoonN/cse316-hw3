import React from 'react'
import PropTypes from 'prop-types'
import { modle } from '../App.js'

export default function AllTags ({ setSearchQuery }) {
  const tags = modle.getAllTags().map((item, index) => {
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
