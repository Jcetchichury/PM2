let loginError = document.querySelector('#mensError')
loginError.setAttribute ('style', 'display: none')
loginError.innerHTML = ''

$("#submitButton").click(function(event){
    event.preventDefault();

    let listaUser = []
    let userValid = {
        nome: '', 
        data: '',
        email: '',
        senha: '',
        cep: ''    
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'));

    listaUser.forEach((item) => {
        if($('#email').val() == item.emailCad && $('#senha').val()== item.senhaCad){
            userValid = {
                nome: item.nomeCad, 
                data: item.dataCad,
                email: item.emailCad,
                senha: item.senhaCad,
                cep: item.cepCad
            }
        }
    });

    if($('#email').val() == userValid.email && $('#senha').val()== userValid.senha){
        $('#mensError').css ('display', 'none');
        $('#mensError').html (``);
        $('#mensCerto').css ('display', 'block')
        $('#mensCerto').html ('login efetuado com sucesso');
    } else {
        $('#mensError').css ('display', 'block');
        $('#mensError').html ('Usuario/senha não confere');
        $('#mensCerto').css ('display', 'none')
        $('#mensCerto').html ('');
    }
    
    
})

$( "#eyeum" ).click(function() {
    $("#senha").attr("type", "text");
  });
  
$( "#eyeum" ).mouseout(function() {
    $("#senha").attr("type", "password");
  });