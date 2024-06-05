// Importa a classe Ave do modelo e os tipos Request e Response do Express
import { Ave } from "../model/Ave";
import { Request, Response } from "express";

// Define a classe AveController que estende a classe Ave
class AveController extends Ave {

    /**
     * Método para listar todas as aves.
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns Uma resposta JSON com a lista de aves ou uma mensagem de erro
     */
    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarAves do modelo e converte o resultado para JSON
            const aves = JSON.stringify(await Ave.listarAves());
            return res.status(200).json(aves); // Retorna a lista de aves com status 200 (OK)
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`); // Retorna uma mensagem de erro com status 400 (Bad Request)
        }
    }

    /**
     * Método para cadastrar uma nova ave.
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns Uma resposta JSON com uma mensagem de sucesso ou erro
     */
    public async novo(req: Request, res: Response) {
        try {
            // Desestrutura os dados recebidos pelo front-end
            const { nome, idade, genero, envergadura, idHabitat } = req.body;
            // Cria uma nova instância da classe Ave com os dados fornecidos
            const novaAve = new Ave(nome, idade, genero, envergadura);
            // Chama o método cadastrarAve para salvar a nova ave no banco de dados
            const result = await Ave.cadastrarAve(novaAve, idHabitat);
            if (result) {
                return res.status(200).json('Ave cadastrada com sucesso'); // Retorna uma mensagem de sucesso com status 200 (OK)
            } else {
                return res.status(400).json('Não foi possível cadastrar a ave no banco de dados'); // Retorna uma mensagem de erro com status 400 (Bad Request)
            }
        } catch (error) {
            console.log(`Erro ao cadastrar a ave: ${error}`);
            return res.status(400).json('Não foi possível cadastrar a ave no banco de dados'); // Retorna uma mensagem de erro com status 400 (Bad Request)
        }
    }

    /**
     * Método para remover uma ave.
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns Uma resposta JSON com uma mensagem de sucesso ou erro
     */
    public async remover(req: Request, res: Response) {
        try {
            // Recupera o ID do animal a ser removido dos parâmetros da query
            const idAnimal = parseInt(req.query.idAnimal as string);
            // Chama o método removerAve para remover a ave do banco de dados
            const resultado = await Ave.removerAve(idAnimal);

            if (resultado) {
                return res.status(200).json('Animal foi removido com sucesso'); // Retorna uma mensagem de sucesso com status 200 (OK)
            } else {
                return res.status(401).json('Erro ao remover animal'); // Retorna uma mensagem de erro com status 401 (Unauthorized)
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json("Erro ao remover ave, consulte os logs no servidor"); // Retorna uma mensagem de erro com status 400 (Bad Request)
        }
    }

    /**
     * Método para atualizar uma ave.
     * 
     * @param req - Objeto de requisição do Express
     * @param res - Objeto de resposta do Express
     * @returns Uma resposta JSON com uma mensagem de sucesso ou erro
     */
    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            // Desestrutura os dados recebidos pelo front-end
            const { nome, idade, genero, envergadura } = req.body;
            // Recupera o ID do animal a ser atualizado dos parâmetros da query
            const idAnimal = parseInt(req.query.idAnimal as string);
            // Cria uma nova instância da classe Ave com os dados fornecidos
            const novaAve = new Ave(nome, idade, genero, envergadura);
            // Chama o método atualizarAve para atualizar a ave no banco de dados
            const result = await Ave.atualizarAve(novaAve, idAnimal);

            if (result) {
                return res.status(200).json('Ave atualizada com sucesso'); // Retorna uma mensagem de sucesso com status 200 (OK)
            } else {
                return res.status(400).json('Não foi possível atualizar a ave no banco de dados'); // Retorna uma mensagem de erro com status 400 (Bad Request)
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json("Erro ao atualizar ave, consulte os logs no servidor"); // Retorna uma mensagem de erro com status 400 (Bad Request)
        }
    }
}

// Exporta a classe AveController como o padrão
export default AveController;