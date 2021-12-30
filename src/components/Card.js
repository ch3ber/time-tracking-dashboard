export const Card = (title, current, previous, category, imgPath) => {
   const view = `
      <div class="card">
         <div class="card__hero card__${title.toLowerCase().replace(' ', '-')}">
            <div class="card__hero__overlay">
               <img src="${imgPath}" alt="category image"/>
            </div>
         </div>
         <div class="card__info">
            <h2 class="card__title">${title}</h2>
            <img src="./src/images/icon-ellipsis.svg "/>
            <p class="card__hour">${current}hrs</p>
            <p class="card__previous">Last ${category} - ${previous}hrs</p>
         </div>
      </div>
   `
   return view
}
