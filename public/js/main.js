const goalItem = document.querySelectorAll('not')
const goalComplete = document.querySelectorAll('goal.completed')

Array.from(goalItem).forEach((el) => {
  el.addEventListener('click', markComplete)
})

Array.from(goalComplete).forEach((el) => {
  el.addEventListener('click', markIncomplete)
})

async function markComplete() {
  const goalId = this.parentNode.dataset.id
  try {
    const response = await fetch('goal/markComplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        'goalIdFromJSFile': goalId,
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}

async function markIncomplete() {
  const goalId = this.parentNode.dataset.id
  try {
    const response = await fetch('goal/markIncomplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        'goalIdFromJSFile': goalId,
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}