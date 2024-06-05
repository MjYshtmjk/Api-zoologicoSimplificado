// Importando os módulos necessários
import express from 'express';
import cors from 'cors'; 
import { DatabaseModel } from './model/DatabaseModel'; 
import AveController from './controller/AveController';
import { HabitatController } from './controller/HabitatController'; 
import { AtracaoController } from './controller/AtracaoController'; 

// Instanciando controladores
const aveController = new AveController('', 0, '', 0); 
const habitatController = new HabitatController(''); 
const atracaoController = new AtracaoController(''); 

// Criando uma instância do servidor Express
const server = express();

// Definindo a porta onde o servidor irá escutar
const port = 3000;

// Configurando o servidor para usar JSON e habilitando o CORS
server.use(express.json());
server.use(cors());

// Rota padrão para testes
server.get('/', (req, res) => {
    res.send('Hello World!');
});

// Rota para login
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Informações: ${username} - ${password}`);
});

// Rotas para listar informações cadastradas no banco de dados
server.get('/listar-aves', aveController.todos); 
server.get('/habitats', habitatController.tds); 
server.get('/atracoes', atracaoController.ts); 

// Rotas para cadastrar informações no sistema
server.post('/novo/ave', aveController.novo); 
server.post('/novo/habitat', habitatController.nov); 
server.post('/novo/atracao', atracaoController.nv); 

// Rotas para remover informações do sistema
server.delete('/remover/animal', aveController.remover); 
server.delete('/remover/atracao', atracaoController.remover);
server.delete('/remover/habitat', habitatController.remover); 

// Rotas para atualizar informações no sistema
server.put('/atualizar/animal', aveController.atualizar); 
server.put('/atualizar/atracao', atracaoController.atualizar);
server.put('/atualizar/habitat', habitatController.atualizar); 

// Testa a conexão com o banco de dados antes de iniciar o servidor
new DatabaseModel().testeConexao().then((resbd) => {
    if (resbd) {
        // Inicia o servidor na porta especificada
        server.listen(port, () => {
            console.info(`Servidor executando no endereço http://localhost:${port}/`);
        });
    } else {
        console.log(`Não foi possível conectar ao banco de dados`);
    }
});