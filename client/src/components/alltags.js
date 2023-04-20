import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
const modle = require('../models/axiosmodel.js')

export default async function AllTags ({ setSearchQuery }) {
  const [tags, setTags] = useState([])

  useEffect(() => {
    async function updateTags () {
      setTags(await modle.getTags())
    }
    updateTags()
  }, [])

  console.log(tags)

  if (!tags) return (<p>There are no tags</p>)

  /* tags.forEach((item, index) => {
    return <Tag key={item.tid} tag={item} index={index} setSearchQuery={setSearchQuery}/>
  }) */

  return (
    <>
    <p id="t_tagcount">{tags.length} Tags</p>
    <p id="t_alltags">All Tags</p>
    <br /><br /><br />
    <div id="tagcontainer">
      {tags.map((item, index) => (<Tag key={item._id} tag={item} index={index} setSearchQuery={setSearchQuery} />))}
    </div>
    </>
  )
}
AllTags.propTypes = {
  setSearchQuery: PropTypes.func.isRequired
}

export function Tag ({ tag, index, setSearchQuery }) {
  const c = modle.getQuestionCountByTagId(tag._id)
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
