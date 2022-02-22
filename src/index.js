const ul = document.querySelector('ul')

ul.addEventListener('click', async(ev)=>{
    const target = ev.target
    if (target.tagName === 'LI'){
        const id = target.getAttribute('data-id')
        console.log(await axios.delete(`/api/cards/${id}`))
        init();
    }
})

const init = async()=>{
    const response = await axios.get('/api/cards')
    const cards = response.data
    const html = cards.map(card =>{
        return `<li data-id = ${card.id}>
            ${card.name} is a(n) ${card.cardType} card with mana value of ${card.manaValue}
        </li>`
    }).join('')
    ul.innerHTML = html
}
init()