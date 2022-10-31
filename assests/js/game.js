const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#scoreText');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '4',
        choice2: '22',
        choice3: '21',
        choice4: '32',
        answer: 1,
    },
    {
        question: 'Whats Your favorite food?',
        choice1: 'Sushi',
        choice2: 'Lasagna',
        choice3: 'Mashed Potatos',
        choice4: 'curly Fries',
        answer: 1,
    },
    {
        question: 'Where is Your Happy Place?',
        choice1: 'Any Body of Water',
        choice2: 'On the Couch with a Book',
        choice3: 'Hiking',
        choice4: 'Tahoe',
        answer: 1,
    },
    {
        question: 'Who is Your Favorite Person?',
        choice1: 'Brad Paisley',
        choice2: 'Eric Church',
        choice3: 'Mother Terisa',
        choice4: 'Samantha Saldate',
        answer: 4,
    },
    {
        question: 'Whats my Favorite Number?',
        choice1: '2',
        choice2: '22',
        choice3: '8',
        choice4: '32',
        answer: 3,
    },
    {
        question: 'Whats most important?',
        choice1: 'family',
        choice2: 'food',
        choice3: 'cool stuff',
        choice4: 'Me',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4 || 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestion = questions
    getNewQuestion()
}

getNewQuestion = () => {
console.log(availableQuestion)

    questionCounter++
    if (availableQuestion.length === 2 || questionCounter - 1 >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        window.location = 'file:///C:/Users/salda/Desktop/Boot%20Camp/projects/Weekly%20Challenges/Week%204/Quiz-Chalange/end.html'
    }
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestion.splice(questionsIndex, 1)

    acceptingAnswer = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswer) return

        acceptingAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()