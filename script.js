const input = document.getElementById('tarefaInput');
const btnAdicionar = document.getElementById('adicionarBtn');
const lista = document.getElementById('listaTarefas');

function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll('.tarefa').forEach(li => {
        tarefas.push({
            texto: li.querySelector('span').textContent,
            concluida: li.classList.contains('concluida')
        });
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(t => criarTarefa(t.texto, t.concluida));
}

function criarTarefa(texto, concluida = false) {
    const li = document.createElement('li');
    li.classList.add('tarefa', 'entrada');
    if(concluida) li.classList.add('concluida');

    const span = document.createElement('span');
    span.textContent = texto;
    li.appendChild(span);

    const btnConcluir = document.createElement('button');
    btnConcluir.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`;
    btnConcluir.classList.add('concluir');
    btnConcluir.onclick = () => {
        li.classList.toggle('concluida');
        salvarTarefas();
    };

    const btnDeletar = document.createElement('button');
    btnDeletar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M3 6h18M8 6v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V6" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`;
    btnDeletar.classList.add('deletar');
    btnDeletar.onclick = () => {
        li.remove();
        salvarTarefas();
    };

    li.appendChild(btnConcluir);
    li.appendChild(btnDeletar);
    lista.appendChild(li);

    salvarTarefas();
}

function adicionarTarefa() {
    const textoTarefa = input.value.trim();
    if (!textoTarefa) return alert('Digite uma tarefa!');
    criarTarefa(textoTarefa);
    input.value = '';
}

btnAdicionar.addEventListener('click', adicionarTarefa);
input.addEventListener('keypress', e => {
    if (e.key === 'Enter') adicionarTarefa();
});

carregarTarefas();
