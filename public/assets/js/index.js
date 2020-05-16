// const e = require("express");

$(document).ready(function () {
  let burger = document.querySelector('.navbar-burger');
  let menu = document.querySelector('.navbar-menu');
  burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });

  let search = $('#search');
  let input = $('.input');

  search.on('click', function (event) {
    event.preventDefault();
    let searchTerm = input.val().trim();

    $.get('/api/' + searchTerm, function (data) {
      if (data.length !== 0) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          let collapsible = `<ul class="collapsible popout">
    <li>
        <div class="collapsible-header">${data[i].title}</div>
        <div class="collapsible-body"><span>
        <h4>Category: ${data[i].category}</h4>
        <h4>Country of Origin: ${data[i].country_origin}</h4>
        </span>
        </div>
    </li>
    <li>
        <div class="collapsible-header">Description:</div>
        <div class="collapsible-body"><span>${data[i].description}</span>
        </div>
    </li>
    <li>
        <div class="collapsible-header">Rules:</div>
        <div class="collapsible-body"><span>${data[i].instructions}</span>
        </div>
    </li>
</ul>`;
          $('#put-cards-here').append(collapsible);
          $('.collapsible').collapsible();
        };
      }
      else {
        $('#put-cards-here').text('No games found!');
      }
    });
  });
});
