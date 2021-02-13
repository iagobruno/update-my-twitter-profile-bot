const Twit = require('twit')
const differenceInYears = require('date-fns/differenceInYears')
const differenceInMonths = require('date-fns/differenceInMonths')
const differenceInDays = require('date-fns/differenceInDays')
const addYears = require('date-fns/addYears')
const addMonths = require('date-fns/addMonths')

const myBday = new Date(1996, 07, 26, 00, 00, 00)
const today = new Date()

const myAge = differenceInYears(today, myBday)

const myLastBday = addYears(myBday, myAge)
const monthsSinceMyLastBday = differenceInMonths(today, myLastBday)

const daysSinceLastMonth = differenceInDays(today, addMonths(myLastBday, monthsSinceMyLastBday) )

updateMyTwitterName(`v${myAge}.${monthsSinceMyLastBday}.${daysSinceLastMonth}-rc.${randomIntFromInterval(1, 5)}`)


function updateMyTwitterName(name) {
  console.log('name = ', name)
  new Twit({
    consumer_key: 'pxA50IBV39IEQFASMhPErEuPl',
    consumer_secret: '2kU4cjHdbNnmEEhZItznPMGj7zbRsc6lRm2iOJ8H7UQplHiC7H',
    app_only_auth: true
  })
    .post('account/update_profile', { name })
    .then(() => {
      console.log('Update 🐦✔. New name =', name)
    })
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
