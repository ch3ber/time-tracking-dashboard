window.addEventListener('load', async () => {
   const container = document.querySelector('.cards');
   const defaultCards = await getDefaultCards();
   container.innerHTML = defaultCards;
   document.querySelectorAll('.card__main__button')
      .forEach(button => button.addEventListener('click', switchCategory));
});


async function switchCategory(event) {
   const [CARD_DAILY, CARD_WEEKLY, CARD_MONTHLY] = await getAllCategoryCards();
   const container = document.querySelector('.cards');
   const button = event.target;
   const category = event.target.dataset.category;

   removeCssClassFromElements('card__main__button', 'card__main__button--select')

   switch (category) {
      case 'daily':
         button.classList.add('card__main__button--select');
         container.innerHTML = CARD_DAILY;
         break;
      case 'weekly':
         button.classList.add('card__main__button--select');
         container.innerHTML = CARD_WEEKLY;
         break;
      case 'monthly':
         button.classList.add('card__main__button--select');
         container.innerHTML = CARD_MONTHLY;
         break;
   }
}

function removeCssClassFromElements(elementsName, cssClass) {
   const elements = document.querySelectorAll(`.${elementsName}`);
   elements.forEach(element => element.classList.remove(cssClass))
}

async function fetchData (url) {
   const response = await fetch(url);
   const data = await response.json();
   return data
}

async function getAllCategoryCards() {
   const data = await fetchData('../data.json');
   const CARD_DAILY = data.map(card => Card(card.title, card.timeframes.daily.current, card.timeframes.daily.previous, 'Daily', card.imgPath)).join('');
   const CARD_WEEKLY = data.map(card => Card(card.title, card.timeframes.weekly.current, card.timeframes.weekly.previous, 'Weekly', card.imgPath)).join('');
   const CARD_MONTHLY = data.map(card => Card(card.title, card.timeframes.monthly.current, card.timeframes.monthly.previous, 'Monthly', card.imgPath)).join('');
   return [CARD_DAILY, CARD_WEEKLY, CARD_MONTHLY]
}

async function getDefaultCards() {
   const cards = await fetchData('../data.json');
   const defaultCards = cards.map(card => Card(card.title, card.timeframes.daily.current, card.timeframes.daily.previous, 'Daily', card.imgPath)).join('');
   return defaultCards;
}

const Card = (title, current, previous, category, imgPath) => {
   const view = `
      <div class="card">
         <div class="card__hero">
            <img src="${imgPath}" alt="category image"/>
         </div>
         <header>
            <h2 class="card__title">${title}</h2>
            <p class="card__hour">${current}hrs</p>
         </header>
         <footer>
            <img src="./src/images/icon-ellipsis.svg "/>
            <p class="card__previous">Last ${category} - ${previous}hrs</p>
         </footer>
      </div>
   `
   return view
}
