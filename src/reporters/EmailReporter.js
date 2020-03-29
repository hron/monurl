class EmailReporter {
  constructor(emailAddresses) {
    this.emailAddresses = emailAddresses
  }

  process(eventType, payload) {
    if (eventType === 'checkFinished' && payload.status === 'down') {
      for (let e of this.emailAddresses) {
        console.log(`Notifying ${e} about a down state of ${payload.url}`)
      }
    }
  }
}

module.exports = EmailReporter
