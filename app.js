
let tg = window.Telegram.WebApp;
tg.expand();

const cardMapping = {
    1: 'ac', 2: '2c', 3: '3c', 4: '4c', 5: '5c', 6: '6c', 7: '7c', 8: '8c', 9: '9c', 10: '10c',
    11: 'pc', 12: 'rc', 13: 'qc', 14: 'kc',
    15: 'ad', 16: '2d', 17: '3d', 18: '4d', 19: '5d', 20: '6d', 21: '7d', 22: '8d', 23: '9d', 24: '10d',
    25: 'pd', 26: 'rd', 27: 'qd', 28: 'kd',
    29: 'as', 30: '2s', 31: '3s', 32: '4s', 33: '5s', 34: '6s', 35: '7s', 36: '8s', 37: '9s', 38: '10s',
    39: 'ps', 40: 'rs', 41: 'qs', 42: 'ks',
    43: 'aw', 44: '2w', 45: '3w', 46: '4w', 47: '5w', 48: '6w', 49: '7w', 50: '8w', 51: '9w', 52: '10w',
    53: 'pw', 54: 'rw', 55: 'qw', 56: 'kw',
    57: '0', 58: '1', 59: '2', 60: '3', 61: '4', 62: '5', 63: '6', 64: '7', 65: '8', 66: '9',
    67: '10', 68: '11', 69: '12', 70: '13', 71: '14', 72: '15', 73: '16', 74: '17', 75: '18',
    76: '19', 77: '20', 78: '21'
};

// Получить 7 случайных карт
function getRandomCards(count) {
    const allCards = Object.keys(cardMapping);
    const shuffled = allCards.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(id => ({
        id: parseInt(id),
        name: `Карта ${id}`,
        selected: false,
        revealed: false
    }));
}

let selectedCount = 0;
let cards = getRandomCards(7);

function renderCards() {
    const topRow = document.getElementById('topRow');
    const bottomRow = document.getElementById('bottomRow');
    
    topRow.innerHTML = '';
    bottomRow.innerHTML = '';
    
    // Распределяем карты: 3 сверху, 4 снизу
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.selected ? 'selected' : ''} ${card.revealed ? 'revealed' : ''}`;
        if (card.revealed) {
            cardElement.style.backgroundImage = `url(/static/cards/${cardMapping[card.id]}.jpg)`;
        }
        cardElement.onclick = () => toggleCard(card, cardElement);
        
        if (index < 3) {
            topRow.appendChild(cardElement);
        } else {
            bottomRow.appendChild(cardElement);
        }
    });
}

function toggleCard(card, element) {
    if (card.selected || selectedCount >= 3) return;
    
    card.selected = true;
    card.revealed = true;
    selectedCount++;
    
    element.style.backgroundImage = `url(/static/cards/${cardMapping[card.id]}.jpg)`;
    element.classList.add('selected', 'revealed');
    
    if (selectedCount === 3) {
        setTimeout(() => {
            const selectedCards = cards.filter(c => c.selected).map(c => c.id);
            tg.sendData(JSON.stringify({
                selected_cards: selectedCards
            }));
            tg.close();
        }, 1500);
    }
}

renderCards();
