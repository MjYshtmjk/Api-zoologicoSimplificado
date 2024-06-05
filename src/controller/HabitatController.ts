// Importa a classe Habitat do modelo e os tipos Request e Response do Express
import { Habitat } from "../model/Habitat";
import { Request, Response } from "express";

// Define a classe HabitatController que estende a classe Habitat
export class HabitatController extends Habitat {

    /**
     * Método para listar todos os habitats.
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns Uma resposta JSON com a lista de habitats ou uma mensagem de erro
     */
    public async tds(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarHabitats do modelo e converte o resultado para JSON
            const habitats = JSON.stringify(await Habitat.listarHabitats());
            return res.status(200).json(habitats); // Retorna a lista de habitats com status 200 (OK)
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`); // Retorna uma mensagem de erro com status 400 (Bad Request)
        }
    }

    /**
     * Método para cadastrar um novo habitat.
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns Uma resposta JSON com uma mensagem de sucesso ou erro
     */
    public async nov(req: Request, res: Response) {
        // Desestrutura o nome do habitat do corpo da requisição
        const { nomeHabitat } = req.body;

        // Cria uma nova instância da classe Habitat com o nome fornecido
        const novoHabitat = new Habitat(nomeHabitat);

        // Chama o método cadastrarHabitat para salvar o novo habitat no banco de dados
        const result = await Habitat.cadastrarHabitat(novoHabitat);

        // Verifica se o cadastro foi bem-sucedido
        if (result) {
            return res.status(200).json('Habitat cadastrado com sucesso'); // Retorna uma mensagem de sucesso com status 200 (OK)
        } else {
            return res.status(400).json('Não foi possível cadastrar o habitat no banco de dados'); // Retorna uma mensagem de erro com status 400 (Bad Request)
        }
    }

    /**
     * Método para remover um habitat.
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns Uma resposta JSON com uma mensagem de sucesso ou erro
     */
    public async remover(req: Request, res: Response) {
        // Obtém o ID do habitat a ser removido dos parâmetros da query
        const idHabitat = parseInt(req.query.idHabitat as string);
        // Chama o método removerHabitat para remover o habitat do banco de dados
        const resultado = await Habitat.removerHabitat(idHabitat);

        // Verifica se a remoção foi bem-sucedida
        if (resultado) {
            res.status(200).json('Habitat removido com sucesso'); // Retorna uma mensagem de sucesso com status 200 (OK)
        } else {
            res.status(401).json('Erro ao remover habitat'); // Retorna uma mensagem de erro com status 401 (Unauthorized)
        }
    }

    /**
     * Método para atualizar um habitat.
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns Uma resposta JSON com uma mensagem de sucesso ou erro
     */
    public async atualizar(req: Request, res: Response) {
        // Desestrutura o nome do habitat do corpo da requisição
        const { nomeHabitat } = req.body;
        // Obtém o ID do habitat a ser atualizado dos parâmetros da query
        const idHabitat = parseInt(req.query.idHabitat as string);

        // Cria uma nova instância da classe Habitat com o nome fornecido
        const novoHabitat = new Habitat(nomeHabitat);

        // Chama o método atualizarHabitat para atualizar o habitat no banco de dados
        const result = await Habitat.atualizarHabitat(novoHabitat, idHabitat);

        // Verifica se a atualização foi bem-sucedida
        if (result) {
            return res.status(200).json('Habitat atualizado com sucesso'); // Retorna uma mensagem de sucesso com status 200 (OK)
        } else {
            return res.status(400).json('Não foi possível atualizar o habitat no banco de dados'); // Retorna uma mensagem de erro com status 400 (Bad Request)
        }
    }
}