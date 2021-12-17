window.addEventListener('load', defaultCards);

async function defaultCards() {
   const [CARD_DAILY] = await CardsWithData();
   document.querySelector('.cards').innerHTML = CARD_DAILY;
}

document.querySelectorAll('.card__main__button')
   .forEach(button => button.addEventListener('click', switchContentCards));

async function switchContentCards(event) {
   const [CARD_DAILY, CARD_WEEKLY, CARD_MONTHLY] = await CardsWithData();
   const container = document.querySelector('.cards');

   switch (event.target.textContent) {
      case 'Daily':
         container.innerHTML = CARD_DAILY;
         break;
      case 'Weekly':
         container.innerHTML = CARD_WEEKLY;
         break;
      case 'Monthly':
         container.innerHTML = CARD_MONTHLY;
         break;
   }
}

const fetchData = async url => {
   const response = await fetch(url);
   const data = await response.json();
   return data
}

async function CardsWithData() {
   const data = await fetchData('./data.json');
   const CARD_DAILY = data.map(card => Card(card.title, card.timeframes.daily.current, card.timeframes.daily.previous, 'Daily')).join('');
   const CARD_WEEKLY = data.map(card => Card(card.title, card.timeframes.weekly.current, card.timeframes.weekly.previous, 'Weekly')).join('');
   const CARD_MONTHLY = data.map(card => Card(card.title, card.timeframes.monthly.current, card.timeframes.monthly.previous, 'Monthly')).join('');
   return [CARD_DAILY, CARD_WEEKLY, CARD_MONTHLY]
}

const Card = (title, current, previous, category) => {
   const view = `
      <div class="card">
         <header>
            <h2 class="card__title">${title}</h2>
            <p class="card__hour">${current}hrs</p>
         </header>
         <footer>
            <img src="./images/icon-ellipsis.svg "/>
            <p class="card__previous">Last ${category} - ${previous}hrs</p>
         </footer>
      </div>
   `
   return view
}