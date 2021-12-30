import { Card } from './components/Card.js';

export async function parseFetch(url) {
   const response = await fetch(url);
   return await response.json();
}

export async function getDailyCards() {
   const data = await parseFetch('../data.json');
   return data.map(card => (
      Card(
            card.title,
            card.timeframes.daily.current,
            card.timeframes.daily.previous,
            'Daily',
            card.imgPath
         )
   )).join('');
}

export async function getWeeklyCards() {
   const data = await parseFetch('../data.json');
   return data.map(card => (
      Card(
            card.title,
            card.timeframes.weekly.current,
            card.timeframes.weekly.previous,
            'Weekly',
            card.imgPath
         )
   )).join('');
}

export async function getMonthlyCards() {
   const data = await parseFetch('../data.json');
   return data.map(card => (
      Card(
            card.title,
            card.timeframes.monthly.current,
            card.timeframes.monthly.previous,
            'Monthly',
            card.imgPath
         )
   )).join('');
}
