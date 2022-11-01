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
        question: 'Javascript is an _______ language?',
        choice1: 'Object-Oriented',
        choice2: 'Object Based',
        choice3: 'Procedural',
        choice4: 'none of the above',
        answer: 1,
    },
    {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        choice1: 'var',
        choice2: 'let',
        choice3: 'both A and B',
        choice4: 'None of the above',
        answer: 3,
    },
    {
        question: 'Which of the following methods is used to access HTML elements using Javascript?',
        choice1: 'getElementbyId()',
        choice2: 'getElementByClassName()',
        choice3: 'Both A and B',
        choice4: 'None of the Above',
        answer: 3,
    },
    {
        question: 'How can a datatype be declared to be a constant type?',
        choice1: 'const',
        choice2: 'var',
        choice3: 'let',
        choice4: 'constant',
        answer: 1,
    },
    {
        question: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
        choice1: 'Throw Errors',
        choice2: 'Ignores the statements',
        choice3: 'Gives warnings',
        choice4: 'None of the above',
        answer: 2,
    },
    {
        question: 'What keyword is used to check whether a given property is valid or not?',
        choice1: 'in',
        choice2: 'is in',
        choice3: 'exists',
        choice4: 'lies',
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