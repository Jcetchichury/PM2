let cepValid = false

let mensError = document.querySelector('#mensError');
let mensCerto = document.querySelector('#mensCerto');


//Validar e-mail
$("#email").ready(function(){
    
    function limpa_email(){
        $("#email").val("");
    }

    $("#email").blur(function(){

        const email = $(this).val();
        const emailError = $("#emailError")
        const er = (/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);

        if(email != ""){
            if(!er.test(email)){
                emailError.css("display", "block")
                emailError.html(`Digite um e-mail válido`);
                emailError.css("color", "red");
            } else {
                emailError.css("display", "none");
            }
        }  
    })
});


//Exibir e Ocultar Senha
$( "#eyeum" ).click(function() {
    $("#senha").attr("type", "text");
  });
  
$( "#eyeum" ).mouseout(function() {
    $("#senha").attr("type", "password");
  });

$( "#eyedois" ).click(function() {
    $("#confirmasenha").attr("type", "text");
  });
  
$( "#eyedois" ).mouseout(function() {
    $("#confirmasenha").attr("type", "password");
  });


//Validação de Senha
$("#senha").ready(function(){
    
    function limpa_senha(){
        $("#senha").val("");
        $("#confirmasenha").val("");
    }

    $("#senha").blur(function(){

        const senha = $(this).val();
        const erroSenha = $("#erroSenha");

        if(senha != ""){
            if(senha.length != 8){
                erroSenha.css("display", "block")
                erroSenha.html(`Senha inválida. Digite uma senha com 8 dígitos`);
                erroSenha.css("color", "red");
            } else {
                erroSenha.css("display", "none");
            }
        }
    })
});


//Confirmação de Senha
$("#confirmasenha").ready(function(){

    function limpa_senha(){
        $("#confirmasenha").val("");
    }

    $("#confirmasenha").blur(function(){

        const confirmaSenha = $(this).val();
        const senha = $("#senha").val();
        const erroSenha = $("#erroSenhaDois");

        if(confirmaSenha != ""){
            if(confirmaSenha != senha){
                erroSenha.css("display", "block")
                erroSenha.html(`As senhas não conferem. Digite novamente.`);
                erroSenha.css("color", "red");
            } else {
                erroSenha.css("display", "none");
            }
        }
    })
});


//Validação do CEP
$(document).ready(function() {

    function limpa_formulário_cep() {
        
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
    }
    
    
    $("#cep").blur(function() {

        
        const cep = $(this).val().replace(/\D/g, '');

        
        if (cep != "") {

            
            const validacep = /^[0-9]{8}$/;

            
            if(validacep.test(cep)) {

                
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");

                
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    try {
                        
                        if ("erro" in dados){
                            cepValid = false
                            throw new Error ("Digite um CEP válido")
                        } else {

                            $("#rua").val(dados.logradouro);
                            $("#bairro").val(dados.bairro);
                            $("#cidade").val(dados.localidade);
                            $("#uf").val(dados.uf);
                            cepValid = true
                        }
                    } 
                    catch (error) { 
                        alert(error.message)
                    }
                })                    
            };
        }
    });
});


$("#submitButton").click(function(event){
    event.preventDefault();

    const senha = $("#senha").val();
    const confirmaSenha = $("#confirmasenha").val();
    const email = $("#emailError");

    if(senha.length == 8 && confirmaSenha == senha && email.css('display') == 'none' && cepValid){
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

        listaUser.push({
            nomeCad: $("#nome").val(),
            dataCad: $("#datanasc").val(),
            emailCad: $("#email").val(),
            senhaCad: $("#senha").val(),
            cepCad: $("#cap").val(),
        })
        
        localStorage.setItem('listaUser', JSON.stringify(listaUser))
        
        mensCerto.setAttribute('style', 'display: block')
        mensCerto.innerHTML = '<strong>cadastrando usuario...</strong>'
        mensError.setAttribute ('style', 'display: none')
        mensError.innerHTML = ''

        setTimeout(()=>{
            window.location.href = './logIn.html'
        }, 2500)    
    } else {
        mensError.setAttribute ('style', 'display: block')
        mensError.innerHTML = '<strong>Preencha todos os dados devidamente.</strong>'
        mensCerto.setAttribute ('style', 'display: none')
        mensCerto.innerHTML = ''
    }

});

