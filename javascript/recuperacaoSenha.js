$("#submitButton").click(function(event){
    event.preventDefault();

    let listaUser = []
    let userValid = {
        nome: '', 
        data: '',
        email: 'naovai',
        senha: '',
        cep: ''    
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'));

    listaUser.forEach((item) => {
        if($('#nomeRec').val() == item.nomeCad && $('#emailRec').val() == item.emailCad){
            userValid = {
                nome: item.nomeCad, 
                data: item.dataCad,
                email: item.emailCad,
                senha: item.senhaCad,
                cep: item.cepCad
            }
        } 
            console.log (item.nomeCad)
            console.log ($('#nomeRec').val())
    });
    console.log ($('#nomeRec').val())
    console.log (userValid)

    if($('#nomeRec').val() == userValid.nome && $('#emailRec').val() == userValid.email){
        $('#mensError').css ('display', 'none');
        $('#mensError').html (``);
        $('#mensCerto').css ('display', 'block')
        $('#mensCerto').html ('digite a uma nova senha');

        $('#confirmacao').css ('display', 'none')
        $('#recuperacao').css ('display', 'block')
    } else {
        $('#mensError').css ('display', 'block');
        $('#mensError').html ('danos não confere');
        $('#mensCerto').css ('display', 'none')
        $('#mensCerto').html ('');
    }
    
    
})


$('#submitRec').click(function (event){
    event.preventDefault();

    if($('#senhaRec').val() == $('#confirmSenha').val()){
        $('#mensError').css ('display', 'none');
        $('#mensError').html (``);
        $('#mensCerto').css ('display', 'block')
        $('#mensCerto').html ('senha mudado com sucesso');

    } else {
        $('#mensError').css ('display', 'block');
        $('#mensError').html ('Senha não confere');
        $('#mensCerto').css ('display', 'none')
        $('#mensCerto').html ('');
    }

})

$( "#eyeum" ).click(function() {
    $("#senhaRec").attr("type", "text");
  });
  
$( "#eyeum" ).mouseout(function() {
    $("#senhaRec").attr("type", "password");
  });

$( "#eyedois" ).click(function() {
    $("#confirmasenha").attr("type", "text");
  });
  
$( "#eyedois" ).mouseout(function() {
    $("#confirmasenha").attr("type", "password");
  });
