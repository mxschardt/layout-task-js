import "./style.css"
import "./workspace.css"

async function fetchTitles(limit, start = 0) {
    const uri = `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
    const response = await fetch(uri)
    const posts = await response.json()
    const titles = posts.map((x) => x.title)
    return titles
}

function createCard(title) {
    const text = document.createElement("span")
    text.innerText = title

    const card = document.createElement("div")
    card.classList.add("card")
    card.appendChild(text)

    return card
}

function calculateElementCount(
    containerWidth,
    containerHeight,
    elementWidth,
    elementHeight,
    gap
) {
    const columns = Math.floor(containerWidth / (elementWidth + gap))
    const rows = Math.floor(containerHeight / (elementHeight + gap))
    return columns * rows
}

const workspace = document.querySelector("#workspace")
const workspaceStyles = getComputedStyle(workspace)
const cardWidth = parseFloat(workspaceStyles.getPropertyValue("--card-width"))
const cardHeight = parseFloat(workspaceStyles.getPropertyValue("--card-height"))
const gap = parseFloat(workspaceStyles.getPropertyValue("--gap")) / 2

let cardCount = calculateElementCount(
    workspace.offsetWidth,
    workspace.offsetHeight,
    cardHeight,
    cardWidth,
    gap
)

const titles = await fetchTitles(cardCount)
titles.forEach((title) => workspace.appendChild(createCard(title)))

addEventListener("resize", async () => {
    const newCardCount = calculateElementCount(
        workspace.offsetWidth,
        workspace.offsetHeight,
        cardHeight,
        cardWidth,
        gap
    )
    if (newCardCount > cardCount) {
        const newTitles = await fetchTitles(newCardCount - cardCount, cardCount)
        newTitles.forEach((title) => workspace.appendChild(createCard(title)))
        cardCount = newCardCount
    }
})
