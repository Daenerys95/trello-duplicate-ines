var app = {
  init: function() {
    console.log('init');
    
    $('#jeTriche').empty();     
    
    app.generateAddListButton();
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

      


      $addListModalElement.find('form').submit(app.handleAddListFormSubmit);

      app.listsAJAXRequest();
      app.CardsAJAXRequest();


    
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

  generateListElement: function($listName, $listId){
    var $listTemplate = $('#listTemplate').contents().clone();
    var $h2 = $listTemplate.find('.column h2').text($listName);
    //intercepter évènement dblclick sur le nom des listes
    $h2.dblclick(app.changeListNameOnClick); 
    $listTemplate.attr('id', 'list_'+$listId);
    return $listTemplate;
  },

  generateCardElement: function($cardName){
    var $cardTemplate = $('#cardTemplate').contents().clone();
    $cardTemplate.find('#cardName').text($cardName);
    $cardTemplate.find('#dustbin').click(app.deleteCardOnClick);
    $cardTemplate.find('#pencil').click(app.handleAddCardFormSubmit);
    return $cardTemplate;
  },

  
  handleAddCardFormSubmit: function(event) {
    
    var  $modal = $('#addListModal');
    // Ajout de la classe active
    $modal.addClass('is-active');
    event.preventDefault();
    console.log(event);
    var $cardName = $(event.target).find('input[name="list-name"]').val();
    var $newCard = app.generateCardElement($cardName);
    if($cardName) {
      $('#jeTriche').append($newCard);
      $('#addListModal').removeClass('is-active');
    }
  },

  listsAJAXRequest: function() {
    $.ajax({
      method: 'GET',
      url:'data/lists.json',
      dataType:'json',
      data:'null'
    })
      .done(function(response){
        //console.log(response);
        app.lists = response;
        for (var list of app.lists) {
          var newLists = app.generateListElement(list.name, list.id);
          $('#jeTriche').append(newLists);
        }
      })
      .fail(function(error){
        console.error(error);
        alert('ta requête ne marche pas');
      })
  },

  CardsAJAXRequest: function() {
    $.ajax({
      method: 'GET',
      url:'data/cards.json',
      dataType:'json',
      data:'null'
    })
      .done(function(response){
        //console.log(response);
        app.cards = response;
        for (var card of app.cards) {
          //console.log(card);
          var $newCard = app.generateCardElement(card.name);
          app.addNewCardToNewList($newCard, card.list);
         
        }
      })
      .fail(function(error){
        console.error(error);
        alert('ta requête ne marche pas');
      })
  },

  addNewCardToNewList: function(card, listId){
    var $theList = $('#list_'+listId);
    $theList.find('.panel-block').append(card);
    
  },

  deleteCardOnClick: function (event) {
    console.log('le click marche');
    var deleteForm = app.createDeleteForm();
    //$('.panel-block').append(deleteForm);
  },

  createDeleteForm() {
    var $deleteFormTemplate = $('#deleteCard').contents().clone();
    $deleteFormTemplate.find('.modal-card-title').text('Êtes-vous sûr de vouloir supprimer ?');
    $deleteFormTemplate.find('.button .is-sucess').text('Confirmer');
    $deleteFormTemplate.find('.button .close').text('Annuler');
    $deleteFormTemplate.addClass('is-active');
    console.log($deleteFormTemplate);
    return $deleteFormTemplate;
  },

  generateAddListButton: function() {
    // cette méthode va constuire le bouton "ajouter une liste"
    // 1 - ajouter une div column
    var columnDiv = $('<div>').addClass('column');
    // 2 - ajouter un bouton dans la div column( avec les bonnes classes et id)
    var button = $('<button>').addClass('button is-success').attr('id', 'addListButton');
    button.appendTo(columnDiv);

    // 3 - ajouter le contenu du bouton
    var span = $('<span>').addClass('icon is-small').append(
        $('<i>').addClass('fas fa-plus')
    );
    button.append(span);
    button.append('&nbsp;Ajouter une liste');

    // 4 - ajouter le tout au DOM
    columnDiv.appendTo($('#jeTriche'));

}

};

$(app.init);