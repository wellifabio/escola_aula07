const uri = 'http://localhost:3000/';
const user = JSON.parse(window.localStorage.getItem('userTurmaAtividade'));
const professor = document.querySelector('#professor');
const corpo = document.querySelector('#corpo');
const form = document.querySelector('#formTurma');

if (!user)
    window.location.href = './index.html';
else
    if (!user.logado) {
        window.location.href = './index.html';
    }
professor.innerHTML = user.nome;

//Listar todas as turmas do professor
fetch(uri + 'professor/' + user.id)
    .then(response => response.json())
    .then(data => {
        data.turmas.forEach(t => {
            corpo.innerHTML += `
            <tr>
                <td style="text-align:center">${t.id}</td>
                <td>${t.nome}</td>
                <td style="text-align:center">
                    <button class="bexcluir" onclick="excluir(${t.id})">Excluir</button>
                    <button class="bvisualizar" onclick="visualizar(${t.id},'${t.nome}')">Visualizar</button>
                </td>
            </tr>`;
        });
    });

//Cadastrar turma
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = {
        nome: form.nome.value,
        professorId: user.id
    }
    fetch(uri + 'turma', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                alert('Turma cadastrada com sucesso!');
                window.location.reload();
            }
        });
});

//Excluir turma
function excluir(id) {
    if (confirm('Deseja realmente excluir esta turma?')) {
        fetch(uri + 'turma/' + id, {
            method: 'DELETE'
        })
            .then(response => response.status)
            .then(data => {
                if (data === 204) {
                    alert('Turma excluída com sucesso!');
                    window.location.reload();
                } else {
                    alert('Você não pode excluir uma turma com atividades cadastradas!');
                }
            });
    }
}

//Ir para atividade
function visualizar(id, nome) {
    const turma = { id, nome };
    window.localStorage.setItem('turma', JSON.stringify(turma));
    window.location.href = './turma.html';
}

//Sair do sistema
function sair() {
    window.localStorage.removeItem("userTurmaAtividade");
    window.location.href = "./index.html";
}