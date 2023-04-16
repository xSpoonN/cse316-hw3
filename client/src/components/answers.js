import React from 'react'
import PropTypes from 'prop-types'
import { modle } from '../App.js'

export default function Answers ({ qid, gotoPostAnswerPage }) {
  const answers = modle.getAnswersByQID(qid).map((item) => {
    return <Answer key={item.aid} answer={item} />
  })

  modle.addViews(qid)

  const textWithLinks = replaceLinks(modle.getQuestionText(qid))

  return (
    <>
    <p id="ap_answercount"><b>{modle.getQuestionCount(qid)} answers</b></p>
    <p id="ap_questiontitle"><b>{modle.getQuestionTitle(qid)}</b></p>
    <br />
    <p id="ap_views"><b>{modle.getViews(qid)} views</b></p>
    <p id="ap_questiontext" dangerouslySetInnerHTML={{ __html: textWithLinks }} />
    <p id="ap_askedby"><b>{modle.getWhoAsked(qid)}</b> asked<br />{modle.formatDate(modle.getAskDate(qid))}</p>
    <br />
    <table id="ap_answers"><tbody>
      <tr className="aRow">
        <td className="aTD aAns"></td>
        <td className="aTD aCred"></td>
      </tr>
      {answers}
    </tbody></table>
    <br />
    {answers.length === 0 && <p id="ap_noanswers"><i>No Answers Yet...</i></p>}
    <button id="ap_answerbutton" onClick={gotoPostAnswerPage}>Answer Question</button>
    </>
  )
}
Answers.propTypes = {
  qid: PropTypes.string.isRequired,
  gotoPostAnswerPage: PropTypes.func.isRequired
}

export function Answer ({ answer }) {
  const textWithLinks = replaceLinks(answer.text)
  return (
    <>
    <tr className="aRow">
      <td className="aTD aAns" dangerouslySetInnerHTML={{ __html: textWithLinks }} />
      <td className="aTd aCred"><b>{answer.ansBy}</b> answered<br/>{modle.formatDate(answer.ansDate)}</td>
    </tr>
    </>
  )
}
Answer.propTypes = {
  answer: PropTypes.object.isRequired
}

function replaceLinks (text) {
  return text.replace(/\[(.*?)\]\((.*?)\)/g, (full, name, link) => {
    if (link.match(/^https?:\/\//)) {
      return `<a href='${link}'>${name}</a>`
    } else {
      return full
    }
  })
}
