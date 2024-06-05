// Importa a classe Atracao do modelo e os tipos Request e Response do Express
import { Atracao } from "../model/Atracao";
import { Request, Response } from "express";

// Define a classe AtracaoController que estende a classe Atracao
export class AtracaoController extends Atracao {

    /**
     * Método para listar todas as atrações.
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns Uma resposta JSON com a lista de atrações ou uma mensagem de erro
     */
    public async ts(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarAtracoes do modelo e converte o resultado para JSON
            const atracoes = JSON.stringify(await Atracao.listarAtracoes());
            return res.status(200).json(atracoes); // Retorna a lista de atrações com status 200 (OK)
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${ error }`);
            return res.status(400).json(`Erro ao acessar as informações`); // Retorna uma mensagem de erro com status 400 (Bad Request)
        }
    }

    /**
     * Método para cadastrar uma nova atração.
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns Uma resposta JSON com uma mensagem de sucesso ou erro
     */
    public async nv(req: Request, res: Response) {
        // Desestrutura o nome da atração do corpo da requisição
        const { nomeAtracao } = req.body;

        // Cria uma nova instância da classe Atracao com o nome fornecido
        const novoAtracao = new Atracao(nomeAtracao);

        // Chama o método cadastrarAtracao para salvar a nova atração no banco de dados
        const result = await Atracao.cadastrarAtracao(novoAtracao);

        // Verifica se o cadastro foi bem-sucedido
        if (result) {
            return res.status(200).json('Atração cadastrada com sucesso'); // Retorna uma mensagem de sucesso com status 200 (OK)
        } else {
            return res.status(400).json('Não foi possível cadastrar a atração no banco de dados'); // Retorna uma mensagem de erro com status 400 (Bad Request)
        }
    }

    /**
     * Método para remover uma atração.
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns Uma resposta JSON com uma mensagem de sucesso ou erro
     */
    public async remover(req: Request, res: Response) {
        // Obtém o ID da atração a ser removida dos parâmetros da query
        const idAtracao = parseInt(req.query.idAtracao as string);

        // Chama o método removerAtracao para remover a atração do banco de dados
        const resultado = await Atracao.removerAtracao(idAtracao);

        // Verifica se a remoção foi bem-sucedida
        if (resultado) {
            res.status(200).json('Atração removida com sucesso'); // Retorna uma mensagem de sucesso com status 200 (OK)
        } else {
            res.status(401).json('Erro ao remover atração'); // Retorna uma mensagem de erro com status 401 (Unauthorized)
        }
    }

    /**
     * Método para atualizar uma atração.
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns Uma resposta JSON com uma mensagem de sucesso ou erro
     */
    public async atualizar(req: Request, res: Response) {
        console.log('entrei na rota');

        // Desestrutura o nome da atração do corpo da requisição
        const { nomeAtracao } = req.body;
        // Obtém o ID da atração a ser atualizada dos parâmetros da query
        const idAtracao = parseInt(req.query.idAtracao as string);

        // Cria uma nova instância da classe Atracao com o nome fornecido
        const novoAtracao = new Atracao(nomeAtracao);

        // Chama o método atualizarAtracao para atualizar a atração no banco de dados
        const result = await Atracao.atualizarAtracao(novoAtracao, idAtracao);

        // Verifica se a atualização foi bem-sucedida
        if (result) {
            return res.status(200).json('Atração atualizada com sucesso'); // Retorna uma mensagem de sucesso com status 200 (OK)
        } else {
            return res.status(400).json('Não foi possível atualizar a atração no banco de dados'); // Retorna uma mensagem de erro com status 400 (Bad Request)
        }
    }
}
