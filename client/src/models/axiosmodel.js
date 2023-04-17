import axios from 'axios'

export async function getTagName (tagId) {
  const resp = await axios.get(`http://localhost:8000/tags/${tagId}`)
  return resp.data.name
  /* return axios.get(`http://localhost:8000/tags/${tagId}`).then((response) => {
    console.log(response.data.name)
    return response.data
  }).catch((e) => {
    console.error(e)
  }) */
}

export async function getAnswerCount (qid) {
  const resp = await axios.get(`http://localhost:8000/questions/${qid}`)
  console.log(resp.data.answers.length)
  return resp.data.answers.length
  /* return axios.get(`http://localhost:8000/questions/${qid}`).then((response) => {
    console.log(response.data.answers.length)
    return response.data.answers.length
  }).catch((e) => {
    console.error(e)
  }) */
}

export function getQuestions () {
  return axios.get('http://localhost:8000/questions').then((response) => {
    console.log(response.data)
    return response.data
  }).catch((e) => {
    console.error(e)
  })
}

export function getAnswers () {
  return axios.get('http://localhost:8000/answers').then((response) => {
    console.log(response.data)
    return response.data
  }).catch((e) => {
    console.error(e)
  })
}

export function getTags () {
  return axios.get('http://localhost:8000/tags').then((response) => {
    console.log(response.data)
    return response.data
  }).catch((e) => {
    console.error(e)
  })
}

export function tagExists (tag) {
  return axios.get(`http://localhost:8000/tags/${tag}`).then((response) => {
    console.log(response.data)
    return response.data
  }).catch((e) => {
    console.error(e); return false
  })
}

export function addTag (tag) {
  return axios.post('http://localhost:8000/tags', {
    name: tag
  }).then((response) => {
    console.log(response.data)
    return response.data
  }).catch((e) => {
    console.error(e)
  })
}

export function addQuestion (title, text, tags, user) {
  return axios.post('http://localhost:8000/questions', {
    title,
    text,
    tags,
    user
  }).then((response) => {
    console.log(response.data)
    return response.data
  }).catch((e) => {
    console.error(e)
  })
}

export function formatDate (askDate, now = new Date()) {
  const timeDiffInSeconds = (now.getTime() - askDate.getTime()) / 1000
  const timeDiffInMinutes = timeDiffInSeconds / 60
  const timeDiffInHours = timeDiffInMinutes / 60
  const timeDiffInDays = timeDiffInHours / 24

  if (timeDiffInDays < 1) {
    if (timeDiffInMinutes < 1) {
      return `${Math.floor(timeDiffInSeconds)} second${
        Math.floor(timeDiffInSeconds) === 1 ? '' : 's'
      } ago`
    } else if (timeDiffInHours < 1) {
      return `${Math.floor(timeDiffInMinutes)} minute${
        Math.floor(timeDiffInMinutes) === 1 ? '' : 's'
      } ago`
    } else {
      return `${Math.floor(timeDiffInHours)} hour${
        Math.floor(timeDiffInHours) === 1 ? '' : 's'
      } ago`
    }
  } else if (timeDiffInDays < 365) {
    const formattedTime = `${askDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${askDate.getMinutes().toString().padStart(2, '0')}`
    return `${askDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })} at ${formattedTime}`
  } else {
    const formattedTime = `${askDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${askDate.getMinutes().toString().padStart(2, '0')}`
    return `${askDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })} at ${formattedTime}`
  }
}
