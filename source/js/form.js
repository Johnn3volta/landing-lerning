(function(){
  var me = {},
    form = document.querySelector('.form-container'),
    closeButton = null;

  function onClose(e)
  {
    e.preventDefault();

    me.close();
    closeButton.removeEventListener('click', onClose);
  }

  me.open = function(){
    form.classList.remove('is-hidden');

    closeButton = document.querySelector('.form__close-button');
    closeButton.addEventListener('click', onClose);
  };

  me.close = function(){
    form.classList.add('is-hidden');
  };

  me.isValid = function(){

    if (!me.isAllCompleted(document.querySelectorAll('[data-valid="required"]'))){
      console.log('Заполните все необходимые поля плиз');
      return false;
    }
    return true;
  };

  me.isAllCompleted = function(data){
    var result = true;

    for (var i = 0; i < data.length; i++){
      if (!ITVDN.validation.isNotEmpty(data[i].value)){
        result = false;
        break;
      }
    }
    return result;
  };

  ITVDN.form = me;

}());