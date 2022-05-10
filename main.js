const limparFormulario = (endereco) =>{
    document.getElementById('rua').value = '';
    document.getElementById('numero').value = ''; 
    document.getElementById('bairro').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('cidade').value = '';
}

const preencherFormulario = (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('estado').value = endereco.uf;
    document.getElementById('cidade').value = endereco.localidade;
}

const limparAviso (aviso) {
    document.getElementById('cepn').style.display="none";
    document.getElementById('cepin').style.display="none";

}

const cepValido = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep);


const pesquisarCep = async() => {
    limparAviso();
    limparFormulario();

    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;    
    //Validando a informação
    if (cepValido (cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();

        //Tratando caso de não ter o cep digitado
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('cepn').style.display="block";
        }else{
            preencherFormulario(endereco)
        }

    }else{
        document.getElementById('cepin').style.display="block";
    }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);
