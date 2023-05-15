import "./style.css"
import "./workspace.css"

const workspace = document.querySelector("#workspace")

async function fetchTitles(limit) {
    const uri = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
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

const titles = await fetchTitles(20)
titles.forEach((title) => workspace.appendChild(createCard(title)))
