module.exports = {
  messages: {
    message1: 'Great! We\'ll get you connected to a representative.',
    message2: 'No problem! If you decide you need me, just click "Contact Us".'
  },
  scriptPaths: {
    affirmative: [{ name: 'showIndicator', duration: 3500}, 
                  { name: 'showMessage1', duration: 4000}, 
                  { name: 'showIndicator', duration: 3500}, 
                  { name: 'closeWindow', duration: null}],

      negative:  [{ name: 'showMessage2', duration: 1500}, 
                  { name: 'displayFollowUpPrompt', duration: null}]
  },
  scriptPathsFast: {
    affirmative: [{ name: 'showIndicator', duration: 500}, 
                  { name: 'showMessage1', duration: 500}, 
                  { name: 'showIndicator', duration: 500}, 
                  { name: 'closeWindow', duration: null}],

      negative:  [{ name: 'showMessage2', duration: 500}, 
                  { name: 'displayFollowUpPrompt', duration: null}]
  }
}