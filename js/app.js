var app = {
  init: function() {
    console.log('init');

    // ajout de la getion de l'vent click sur le bouton d'ajout de liste
    document.getElementById('addListButton').addEventListener('click', app.displayAddListModal);

    // Récupration de l'élément Modal pour ajouter une liste
    var addListModalElement = document.getElementById('addListModal');

    // Cibler tous les boutons de fermeture du modal
    var closingButtons = addListModalElement.querySelectorAll('.close');

    // Pour chaque bouton
    closingButtons.forEach(function(currentButtonElement) {
      currentButtonElement.addEventListener('click', function() {
        addListModalElement.classList.remove('is-active');
      });
    });
  },
  displayAddListModal: function(evt) {
    // Récupration de l'élément Modal
    var modal = document.getElementById('addListModal');
    // Ajout de la classe active
    modal.classList.add('is-active');
  }
};

document.addEventListener('DOMContentLoaded', app.init);