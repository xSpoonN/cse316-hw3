import { React, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
const modle = require('../models/axiosmodel.js')

export default async function Answers ({ qid, gotoPostAnswerPage }) {
  // const [answerCount, setAnswerCount] = useState([])
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    async function fetchAnswers () {
      const a = await modle.getAnswers(qid)
      console.log(a)
      setAnswers(a)
    }
    fetchAnswers()
  }, [qid])

  // const answers = modle.getAnswersByQID(qid).map((item) => {
  //   return <Answer key={item.aid} answer={item} />
  // })
  /* const answers = await modle.getAnswersByQID(qid).then((data) => {
    console.log(data)
    return data.map((item) => {
      return <Answer key={item.aid} answer={item} />
    })
  }).catch((err) => {
    console.log(err)
  }) */

  modle.addViews(qid)

  const textWithLinks = replaceLinks(await modle.getQuestionText(qid))

  return (
    <>
    <p id="ap_answercount"><b>{answers.length} answers</b></p>
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
