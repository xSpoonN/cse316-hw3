import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/questions.css'
import '../stylesheets/fakeStackOverflow.css'
import { getQuestions, getTagName, formatDate } from '../models/axiosmodel.js'
/* import { showAnswers } from './answers.js' */
/* import { addTagLink } from './alltags.js' */

export function Question ({ qid, answers, views, title, tagList, askedBy, date, unans, setActivePage }) {
  const setPage = (qid) => () => {
    setActivePage(qid)
  }

  if (unans && answers) return undefined
  return (
    <tr className="qRow">
      <td className="qTD">
        {answers} answers <br />
        {views} views
      </td>

      <td className="qTD">
        <a className="qlink" onClick={ setPage(qid) }>
          {title}
        </a>
        <br/>
        {tagList.map((tag) => (
          <button key={tag} className="qtag" /* onClick={addTagLink(tag, modle.findTagName(tag))} */>
            {getTagName(tag).name}
          </button>
        ))}
      </td>

      <td className="qTD"><b>{askedBy}</b> {`asked ${formatDate(date)}`}</td>
    </tr>
  )
}
Question.propTypes = {
  qid: PropTypes.string.isRequired,
  answers: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  tagList: PropTypes.array.isRequired,
  askedBy: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  unans: PropTypes.bool.isRequired,
  setActivePage: PropTypes.func.isRequired
}

function getTagName (tagId) {
  return axios.get(`http://localhost:8000/tags/${tagId}`).then((response) => {
    console.log(response.data.name)
    return response.data
  }).catch((e) => {
    console.error(e)
  })
}

function getQuestions () {
  return axios.get('http://localhost:8000/questions').then((response) => {
    console.log(response.data)
    return response.data
  }).catch((e) => {
    console.error(e)
  })
}

export default function Questions ({ searchQuery, fun }) {
  const [sortOrder, setSortOrder] = useState('Newest')
  const [questionList, setQuestionList] = useState([])
  const [qCount, setQCount] = useState(0)

  function search (query, q = modle.getAllQstns(), t = modle.getAllTags()) {
    let searchTerms = query.toLowerCase().split(' ')
    let changed = false
    do {
      /* console.log(searchTerms) */ /* This separates all closely positioned tags. */
      changed = false
      for (const term of searchTerms) {
        const ind = term.indexOf('][')
        if (ind !== -1) {
          searchTerms.push(term.slice(0, ind + 1))
          searchTerms.push(term.slice(ind + 1))
          searchTerms = searchTerms.filter((x) => x !== term)
          changed = true
        }
      }
    } while (changed)

    const searchWords = searchTerms.filter((word) => !/^\[\S+\]$/.test(word)) /* Words are those that are not surrounded in brackets */
    const searchTags = searchTerms
      .filter((word) => /^\[\S+\]$/.test(word)) /* Tests for [x] for tags */
      .map((tag) => tag.replace(/\[|\]/g, '')) /* Deletes the brackets from each tag */
    const out = []
    for (let i = 0; i < q.length; i++) {
      if (
        (searchWords.some((term) =>
          q[i].title.toLowerCase().includes(term) || /* Title includes a search term */
          q[i].text.toLowerCase().includes(term) /* Description includes the search term */
        ) || !searchWords.length) /* Or there are no search words */ && /* AND */
        (q[i].tagIds.some((tag) =>
          searchTags.some((term) => term === t.find((x) => x.tid === tag).name) /* Tag name matches a search tag */
        ) || !searchTags.length) /* Or there are no search tags */
      ) out.push(q[i])
    }
    /* console.log(`Searched "${query}", words: [ ${searchWords} ], tags: [ ${searchTags} ]`) */
    return out
  }

  useEffect(() => {
    async function fetchQuestions (qList) {
      if (!qList) qList = await getQuestions()
      console.log(qList)
      /* Sort Options */
      if (searchQuery) qList = search(searchQuery)
      if (sortOrder === 'Newest' || sortOrder === 'Unanswered') {
        qList = qList.sort((a, b) => (b.askDate > a.askDate) ? -1 : 1); qList.reverse()
      } else if (sortOrder === 'Active') {
        qList.sort(compareActive)
      }

      // eslint-disable-next-line camelcase
      const qL = qList.map(({ _id, answers, views, title, tags, asked_by, ask_date_time }) => {
        if (sortOrder === 'Unanswered' && answers.length) return undefined
        return (
          <Question
            qid={_id}
            answers={answers.length}
            views={views}
            title={title}
            tagList={tags}
            askedBy={asked_by} // eslint-disable-line camelcase
            date={new Date(ask_date_time)} // eslint-disable-line camelcase
            key={_id}
            unans={sortOrder === 'Unanswered'}
            setActivePage={fun}
          />
        )
      })
      qL.unshift(<tr className="qRow" key="RowFiller"></tr>) /* Adds a blank row at the top to get the top border */
      setQuestionList(qL)
      setQCount(qL.filter(q => q).length)
      return qL
    }
    fetchQuestions()
  }, [sortOrder])

  function compareActive (a, b) {
    let aLatest = 0
    let bLatest = 0
    const ans = getAnswers()
    for (let i = 0; i < a.ansIds.length; i++) { // Finds the latest answer
      const answe = ans.find((x) => x.aid === a.ansIds[i])
      if (!aLatest || answe.ansDate > aLatest) {
        aLatest = answe.ansDate
      }
    }
    for (let i = 0; i < b.ansIds.length; i++) { // Finds the latest answer
      const answe = ans.find((x) => x.aid === b.ansIds[i])
      if (!bLatest || answe.ansDate > bLatest) {
        bLatest = answe.ansDate
      }
    }
    return bLatest - aLatest
  }

  return (
    <div>
      <p id="questioncount">
        {`${(qCount - 1) === 1
          ? (qCount - 1) + ' question'
          : !(qCount - 1) ? 'No Questions Found.' : (qCount - 1) + ' questions'
          }`}
      </p>
      <button id="newbutt" className="questionsort" onClick={() => setSortOrder('Newest')}>Newest</button>
      <button id="activebutt" className="questionsort" onClick={() => setSortOrder('Active')}>Active</button>
      <button id="unbutt" className="questionsort" onClick={() => setSortOrder('Unanswered')}>Unanswered</button>
      <br id="liststart"/>
      <table className="questions">
        <tbody>
          {questionList}
        </tbody>
      </table>
    </div>
  )
}
Questions.propTypes = {
  searchQuery: PropTypes.string,
  fun: PropTypes.func.isRequired
}
