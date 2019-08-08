var app = {
  init: function() {
    console.log('init');

             
    // ajout de la gestion de l'event click sur le bouton d'ajout de liste
    $('#addListButton').click(app.displayAddListModal);

    // Récupération de l'élément Modal pour ajouter une liste
     var $addListModalElement = $('#addListModal');

    // Cibler tous les boutons de fermeture du modal
     var $closingButtons = $addListModalElement.find('.close');

    // Pour chaque bouton (cancel et la croix), j'enlève la visibilité du formulaire au click
    $closingButtons.each(function(index, currentButtonElement) {
      $(currentButtonElement).click(function() {
        $addListModalElement.removeClass('is-active');
      });
    });

     //intercepter évènement dblclick sur le nom des listes
      $('.column h2').dblclick(app.changeListNameOnClick);  


      $addListModalElement.find('form').submit(app.handleAddListFormSubmit);
    
  },

  /* METHODE QUI AFFICHE LE FORMULAIRE AU CLICK SUR 'AJOUTER UNE LISTE' -- ECOUTEUR PLACE LIGNE 6*/
  displayAddListModal: function(evt) {
    // Récupration de l'élément Modal
    var  $modal = $('#addListModal');
    // Ajout de la classe active
    $modal.addClass('is-active');
  },


  changeListNameOnClick: function(evt){
    var $h2 = $(evt.target);
    $h2.addClass('is-hidden');
    $h2.next('form').removeClass('is-hidden');
  },

  handleAddListFormSubmit: function(event) {
    event.preventDefault();
    var $listName = $(event.target).find('input[name="list-name"]').val();
    var $newList = app.generateListElement($listName);
    if($listName) {
      $('#jeTriche').append($newList);
      $('#addListModal').removeClass('is-active');
    }
    
  },

  generateListElement($listName){
    var $listTemplate = $('#listTemplate').contents().clone();
    $listTemplate.find('.column h2').text($listName);
    return $listTemplate;
  },
};

$(app.init);