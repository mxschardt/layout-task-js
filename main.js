import "./style.css"
import "./workspace.css"

// Создаем плашки
// Пока что вместо сервера
const workspace = document.querySelector("#workspace")
for (let i = 0; i < 100; i++) {
    const card = document.createElement("div")
    card.classList.add("card")
    card.innerText = i
    workspace.appendChild(card)
}
