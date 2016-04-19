//Initialize the modal
$('.modal-trigger').leanModal();
//this is for the login modal
$('.message a').click(function(){
 $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
