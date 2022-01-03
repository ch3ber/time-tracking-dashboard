import { getCards } from './getCards.js'

window.addEventListener('load', loadApp);

const $container = document.querySelector('.cards');

async function loadApp() {
   $container.innerHTML = await getCards('daily', 'Daily');
   document.querySelectorAll('.card__main__button')
      .forEach(button => button.addEventListener('click', switchCategory));
}

async function switchCategory(event) {
   changeSelectCategoryButton(event.target);

   const category = event.target.dataset.category;

   switch (category) {
      case 'daily':
         $container.innerHTML = await getCards('daily', 'Daily');
         break;
      case 'weekly':
         $container.innerHTML = await getCards('weekly', 'Weekly');
         break;
      case 'monthly':
         $container.innerHTML = await getCards('monthly', 'Monthly');
         break;
   }
}

function changeSelectCategoryButton(selectButton) {
   document.querySelectorAll('.card__main__button')
      .forEach(element => element.classList.remove('card__main__button--select'));
   selectButton.classList.add('card__main__button--select');
}
