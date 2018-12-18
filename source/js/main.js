(function(){

  // Add vent listener for open from button

  var openFormButton = document.querySelector('.arrow-down'),
      form           = document.querySelector('.form'),
      nav            = document.querySelector('.nav');

  if (openFormButton){
    openFormButton.addEventListener('click', function(e){
      e.preventDefault();
      ITVDN.form.open();
    });
  }

  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (ITVDN.form.isValid()){
        console.log('All good');
      }else{
        console.log('Warning');
      }
    });
  }

  if (nav){
    nav.addEventListener('click', function(e){
      var target = e.target;

      if (target.tagName.toLowerCase() !== 'a'){
        return;
      }
      e.preventDefault();

      ITVDN.navigation.toggleToActiveLink(target);
    });

  }

}());