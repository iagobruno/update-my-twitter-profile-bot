const Twit = require('twit')
const diffInYears = require('date-fns/differenceInYears')
const diffInMonths = require('date-fns/differenceInMonths')
const diffInDays = require('date-fns/differenceInDays')
const addYears = require('date-fns/addYears')
const addMonths = require('date-fns/addMonths')


const myBday = new Date(1996, 07, 26, 00, 00, 00)
const today = new Date()

const myAge = diffInYears(today, myBday)

const myLastBday = addYears(myBday, myAge)
const monthsSinceMyLastBday = diffInMonths(today, myLastBday)

const daysSinceLastMonth = diffInDays(today, addMonths(myLastBday, monthsSinceMyLastBday))

const isMinorUpdate = daysSinceLastMonth === 0
const suffix = isMinorUpdate ? '' : randomSuffix()

updateMyTwitterName(`v${myAge}.${monthsSinceMyLastBday}.${daysSinceLastMonth}` + suffix)


function updateMyTwitterName(name) {
  new Twit({
    consumer_key: process.env.APP_KEY,
    consumer_secret: process.env.APP_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  })
    .post('account/update_profile', { name })
    .then(() => {
      console.log('Update 🐦✔. New name =', name)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}

function randomSuffix() {
  return '-' + randomItem(['rc', 'beta', 'alpha', 'canary']) + '.' + randomInt()

  function randomInt(min = 1, max = 6) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)]
  }
}
