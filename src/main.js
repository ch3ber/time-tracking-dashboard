import {
   getDailyCards,
   getWeeklyCards,
   getMonthlyCards
} from './utils.js'

window.addEventListener('load', loadApp);

const $container = document.querySelector('.cards');

async function loadApp() {
   $container.innerHTML = await getDailyCards();
   document.querySelectorAll('.card__main__button')
      .forEach(button => button.addEventListener('click', switchCategory));
}

async function switchCategory(event) {
   changeSelectCategoryButton(event.target);

   const category = event.target.dataset.category;

   switch (category) {
      case 'daily':
         $container.innerHTML = await getDailyCards();
         break;
      case 'weekly':
         $container.innerHTML = await getWeeklyCards();
         break;
      case 'monthly':
         $container.innerHTML = await getMonthlyCards();
         break;
   }
}

function changeSelectCategoryButton(selectButton) {
   document.querySelectorAll('.card__main__button')
      .forEach(element => element.classList.remove('card__main__button--select'));
   selectButton.classList.add('card__main__button--select');
}
