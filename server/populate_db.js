// Run this script to test your schema
// Start the mongoDB service as a background process before running the script
// Pass URL of your mongoDB instance as first argument(e.g., mongodb://127.0.0.1:27017/fake_so)
const userArgs = process.argv.slice(2)

if (!userArgs[0].startsWith('mongodb')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument')
  throw new Error()
}

const Tag = require('./models/tags')
const Answer = require('./models/answers')
const Question = require('./models/questions')

const mongoose = require('mongoose')
const mongoDB = userArgs[0]
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.Promise = global.Promise;
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

/* const tags = []
const answers = [] */
function tagCreate (name) {
  const tag = new Tag({ name })
  return tag.save()
}

function answerCreate (text, ansBy, ansDateTime) {
  const answerdetail = { text }
  if (ansBy !== false) answerdetail.ans_by = ansBy
  if (ansDateTime !== false) answerdetail.ans_date_time = ansDateTime

  const answer = new Answer(answerdetail)
  return answer.save()
}

function questionCreate (title, text, tags, answers, askedBy, askDateTime, views) {
  const qstndetail = {
    title,
    text,
    tags,
    asked_by: askedBy
  }
  if (answers !== false) qstndetail.answers = answers
  if (askDateTime !== false) qstndetail.ask_date_time = askDateTime
  if (views !== false) qstndetail.views = views

  const qstn = new Question(qstndetail)
  return qstn.save()
}

const populate = async () => {
  const t1 = await tagCreate('react')
  const t2 = await tagCreate('javascript')
  const t3 = await tagCreate('android-studio')
  const t4 = await tagCreate('shared-preferences')
  const a1 = await answerCreate('React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.', 'hamkalo', false)
  const a2 = await answerCreate('On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.', 'azad', false)
  const a3 = await answerCreate('Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.', 'abaya', false)
  const a4 = await answerCreate('YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);', 'alia', false)
  const a5 = await answerCreate('I just found all the above examples just too confusing, so I wrote my own. ', 'sana', false)
  await questionCreate('Programmatically navigate using React router', 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function I\'m calling, moveToNextImage(stepClicked), the same value shows but the animation isn\'t happening. This works many other ways, but I\'m trying to pass the index value of the list item clicked to use for the math to calculate.', [t1, t2], [a1, a2], 'Joji John', false, false)
  await questionCreate('android studio save string shared preference, start activity and load the saved string', 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.', [t3, t4, t2], [a3, a4, a5], 'saltyPeter', false, 121)
  if (db) db.close()
  console.log('done')
}

populate()
  .catch((err) => {
    console.log('ERROR: ' + err)
    if (db) db.close()
  })

console.log('processing ...')
