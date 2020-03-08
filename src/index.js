import './style/main.styl'
import dingSource from './audios/ding.mp3'
import finishSource from './audios/finish.mp3'

/**
 * Sounds
 */
const dingAudio = new Audio(dingSource)
dingAudio.volume = 0.5
const finishAudio = new Audio(finishSource)

/**
 * Elements
 */
const $container = document.querySelector('.aim-trainer')
const $timer = $container.querySelector('.timer')
const $timerValue = $timer.querySelector('.value')
const $score = $container.querySelector('.score')
const $scoreValue = $score.querySelector('.value')
const $play = $container.querySelector('.play')
const $best = $container.querySelector('.best')
const $bestValue = $best.querySelector('.value')
const $targets = $container.querySelector('.targets')

$timer.classList.add('is-hidden')

/**
 * Start
 */
const start = () =>
{
    // Update elements
    $timer.classList.remove('is-hidden')
    $play.classList.add('is-hidden')

    // Update score
    updateScore(0)

    // Start ticker
    timeLeft = timeDuration
    tick()
    
    // Create first target
    createTarget()
}

/**
 * End
 */
const end = () =>
{
    // Play sound
    finishAudio.currentTime = 0
    finishAudio.play()

    // Remove targets
    while($targets.children.length)
    {
        $targets.children[0].remove()
    }

    // Show and update play button
    $play.classList.remove('is-hidden')
    $play.textContent = 'RESTART'

    // Hide timer
    $timer.classList.add('is-hidden')
}

/**
 * Tick
 */
const timeDuration = 10
let timeLeft = null

const tick = () =>
{
    $timerValue.textContent = timeLeft
    if(timeLeft > 0)
    {
        window.setTimeout(tick, 1000)
    }
    else
    {
        end()
    }

    timeLeft--
}

/**
 * Create target
 */
const createTarget = () =>
{
    // Create target element
    const $target = document.createElement('div')
    $target.classList.add('target')
    $target.style.top = `calc(${Math.random() * 100}% - 5vmin)`
    $target.style.left = `calc(${Math.random() * 100}% - 5vmin)`
    $targets.appendChild($target)

    // Listen to mouse enter event
    $target.addEventListener('mouseenter', () =>
    {
        // Play sound
        dingAudio.currentTime = 0
        dingAudio.play()
        
        // Update score
        updateScore(score + 1)

        // Remove target
        $targets.removeChild($target)

        // Create new target
        createTarget()
    })
}

/**
 * Update score
 */
let score = 0
let bestScore = 0

if(window.localStorage.getItem('bestScore'))
{
    bestScore = parseInt(window.localStorage.getItem('bestScore'))
    $bestValue.textContent = bestScore
}

const updateScore = (_value) =>
{
    // Update score
    score = _value
    $scoreValue.textContent = score

    // Update best score
    if(score > bestScore)
    {
        bestScore = score
        $bestValue.textContent = bestScore
    }
}

/**
 * Init
 */
$play.addEventListener('click', start)