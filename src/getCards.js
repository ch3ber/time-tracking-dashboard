import { Card } from './components/Card.js';

export async function getCards(query, category) {
   const response = await fetch('../data.json');
   const data = await response.json();

   return data.map(card => (
      Card(
            card.title,
            card.timeframes[query].current,
            card.timeframes[query].previous,
            category,
            card.imgPath
         )
   )).join('');
}
