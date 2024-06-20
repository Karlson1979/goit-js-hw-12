import{a as u,i,S as m}from"./assets/vendor-c493984e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();function f(s){return s.map(({webformatURL:r,largeImageURL:a,tags:o,likes:e,views:t,comments:n,downloads:p})=>`
        <a href="${a}" target="_blank" rel="noopener noreferrer">
          <li class="item">
            <img src="${r}" alt="${o}" width="360" height="170">
            <div class="statistic">
              <p>Likes:<br> <span>${e}</span></p>
              <p>Views:<br> <span>${t}</span></p>
              <p>Comments:<br> <span>${n}</span></p>
              <p>Downloads:<br> <span>${p}</span></p>
            </div>
          </li>
        </a>
      `).join("")}async function d(s){const o="https://pixabay.com/api/",e={params:new URLSearchParams({key:"44403468-b3192a3f07a9f4ae6c998e95a",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0})};try{return(await u.get(o,e)).data}catch(t){throw i.error({title:"Error",message:"Please enter a search term",position:"topRight"}),t}}const l=document.querySelector(".form"),g=document.querySelector(".nav-list"),c=document.querySelector(".loader");l.addEventListener("submit",async s=>{s.preventDefault();const r=s.target.elements.search.value.trim();if(!r){i.error({title:"Error",message:"Please enter a search term",position:"topRight"});return}c.style.display="block";try{const a=await d(r);if(a.hits.length===0){i.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const o=f(a.hits);g.innerHTML=o,new m(".gallery a").refresh(),l.reset()}catch{i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}finally{c.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
