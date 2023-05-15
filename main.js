// Размеры элементов импортируются из связанных с ними CSS файлов.
// Если размеры не найдены в файлах, плашки не запрашиваются.

// Размеры рабочей области
const workspace = document.querySelector("#workspace")
const workspaceStyles = getComputedStyle(workspace)
// Размеры плашки
const cardWidth = parseFloat(workspaceStyles.getPropertyValue("--card-width"))
const cardHeight = parseFloat(workspaceStyles.getPropertyValue("--card-height"))
// Размер промежутков между плашками
const gap = parseFloat(workspaceStyles.getPropertyValue("--gap"))

// Количество плашек, которые помещаются на рабочее пространство
let cardCount = calculateElementCount(
    workspace.offsetWidth,
    workspace.offsetHeight,
    cardWidth,
    cardHeight,
    gap
)

// Не создаем начальные плашки, если они не помещаются
if (cardCount) {
    createCards(cardCount)
}

// При изменении размера окна, запрашивает новые заголовки, 
// если на страницу помещается больше элементов, чем раньше
addEventListener("resize", async () => {
    const newCardCount = calculateElementCount(
        workspace.offsetWidth,
        workspace.offsetHeight,
        cardWidth,
        cardHeight,
        gap
    )
    if (newCardCount > cardCount) {
        createCards(newCardCount - cardCount, cardCount)
        cardCount = newCardCount
    }
})

// Создание плашек и добавление их в DOM
async function createCards(cardCount, start = 0) {
    // Получаем заголовки
    const titles = await fetchTitles(cardCount, start)
    // Для каждого заголовка создаем новую плашку
    titles.forEach((title) => workspace.appendChild(createCard(title)))
}

// Запрашивает посты и возвращает их заголовки
async function fetchTitles(limit, start = 0) {
    const uri = `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
    const response = await fetch(uri)
    const posts = await response.json()
    const titles = posts.map((x) => x.title)
    return titles
}

// Создает плашку со вложенным текстом
function createCard(title) {
    const text = document.createElement("span")
    text.innerText = title

    const card = document.createElement("div")
    card.classList.add("card")
    card.appendChild(text)

    return card
}

// Считает количество элементов, которые поместятся в контейнер
// Если какой-то из аргументов не является числом, возвращается null.
function calculateElementCount(
    containerWidth,
    containerHeight,
    elementWidth,
    elementHeight,
    gap
) {
    if (Array.from(arguments).some((arg) => typeof arg != "number")) {
        return null
    }

    const columns = Math.floor(containerWidth / (elementWidth + gap))
    const rows = Math.round(containerHeight / (elementHeight + gap))
    return columns * rows
}