// Fazer uma uma tela html com um input que receba um cep. 
// Fazer uma requisição para a API via CEP.
// Exibir as informações na tela.
// Fazer uso de =>
    
//https://viacep.com.br/ws/60311020/json/

// Popular os dados em uma tela.

async function consultarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length !== 8) {
        alert('Digite um CEP válido com 8 dígitos.');
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error('CEP não encontrado');
        const data = await response.json();
        
        const resultDiv = document.getElementById('result');
        if (data.erro) {
            resultDiv.innerHTML = '<p>CEP não encontrado.</p>';
        } else {
            resultDiv.innerHTML = `
                <div><strong>CEP:</strong> ${data.cep}</div>
                <div><strong>Logradouro:</strong> ${data.logradouro}</div>
                <div><strong>Bairro:</strong> ${data.bairro}</div>
                <div><strong>Cidade:</strong> ${data.localidade}</div>
                <div><strong>Estado:</strong> ${data.uf}</div>
            `;
        }
    } catch (error) {
        document.getElementById('result').innerHTML = `<p>Erro: ${error.message}</p>`;
    }
}