const express = require('express')

const server = express()

const projects = []


server.use(express.json())

function checkProjectos(req, res, next) {
    const { id } = req.params;
    console.log(id)
    console.log(projects)
    const projet = projects.find(d => d.id == id)
    console.log(projet)
    if(!projet) {
        return res.status(400).json({error: 'Projeto inexistente'})
    }

    return next();
}

function logRequisicao(req, res, next) {
    console.log('Requisição feita')
    console.count('Requisições: ')
    return next();
}

server.use(logRequisicao)


server.get('/projetos', (req, res) => {
    return res.json(projects)
})


server.post('/projetos', (req, res) => {
    const { id, title} = req.body;
    
    const project = {
        id,
        title,
        tasks: []
    };

    projects.push(project)
    return res.json(projects)
})

server.put('/projetos/:id', checkProjectos, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    const projeto = projetos.find(d => d.id == id);
    projeto.title = title

    return res.json(projeto)
})

server.delete('/projetos/:id', checkProjectos, (req, res) => {
    const { id } = req.params;

    const indexProjeto = projetos.findIndex(d => d.id == id)

    projetos.splice(indexProjeto, 1);

    return res.json(projetos)
})

server.post('/projetos/:id/tasks', checkProjectos, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const projeto = projetos.find(f => f.id == id)

    projeto.tasks.push(title)

    return res.json(projeto)
})




server.listen(3000)