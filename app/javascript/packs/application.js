// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

document.addEventListener('turbolinks:load', _ => {
    document.querySelectorAll('.collapser').forEach(collapser => {
        collapser.addEventListener('click', _ => {
            const target = document.getElementById(collapser.dataset.target);
            if (window.getComputedStyle(target).display !== 'none') {
                target.style.display = 'none'
            } else {
                target.style.display = 'block'
            }
        });
    });
})