$( document ).ready( function(){
  $( '#addButton' ).on( 'click', function(){
    // get username from input
    var newUserName = $( '#usernameIn' ).val();
    // create object to post
    var newUser={
      "username": newUserName,
      "active": true
    };// end object
    // send object to server as a post
    $.ajax({
      type: 'POST',
      url: '/createNew',
      data: newUser
    }); // end ajax
  }); // end addbutton

  $('#getUsers').on('click', function(){
    $('#outputDiv').children().remove();
    $.ajax({
      type: 'GET',
      url: '/getUsers',
      success: function( data ){
      showUsers( data );
      } // end success
    }); //end ajax
  });
  function showUsers( users ){
    console.table( 'in showUsers:' + users );
    for( i=0; i<users.length; i++ )
    {
      var userOut = "<p>" + users[ i ].username + ", active: " + users[ i ].active + " created: " + users[ i ].created + "</p>";
      $('#outputDiv').append( userOut );
      var userButton = "<button class='deactivate btn' data-id='" + users[ i ].id + "'>Deactivate " + users[ i ].username + "</button>";
      $('#outputDiv').append( userButton );

    } // end for loop
    $('.deactivate').on('click', function(){
      console.log('deactivating user');
      var getID = {
          "id" : $(this).attr('data-id')
      };

      $.ajax({
        type: 'POST',
        url: '/deactivateUser',
        data: getID,
        success: function( data ){
          console.log(data);// deactivateUser ();
        } // end success
      }); //end ajax

      });
  } // end show users

  // function deactivateUser(){
  //   console.log('Success!');
  // }







}); // end jQuery
