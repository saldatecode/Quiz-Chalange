const highScoreList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
//for (let i = 0; i < localStorage.getItem("highScores"); i++) {
    let li = document.createElement("li")
    highScoreList.appendChild(li)
    console.log(JSON.parse(localStorage.getItem('highScores')))
    li.textContent = JSON.parse(localStorage.getItem('highScores'))[1].name+ " : "+localStorage.getItem("mostRecentScore")
    //console.log(localStorage.getItem("highScores")[i])
    //li.textContent = JSON.stringify(localStorage.getItem("highScores")[i])
    
//}
