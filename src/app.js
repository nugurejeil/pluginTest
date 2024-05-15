import { plus } from "./plus.js";
import './app.css';
import rabbit from './rabbit.png';
import rabbit2 from './rabbit2.png';
import tiger from './tiger.png';

console.log(plus(1, 3));
// console.log(env);
// console.log(pw);
// console.log(process.env.NODE_ENV);

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `<img src="${rabbit}"><img src="${tiger}"><img src="${rabbit2}">`;
})