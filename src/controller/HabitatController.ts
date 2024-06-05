import { Habitat } from "../model/Habitat";
import { Request, Response } from "express";

export class HabitatController extends Habitat {

    /**
     * Acessa a função do Model que lista todas as habitat
     */
    public async tds(req: Request, res: Response): Promise<Response> {
        try {
            const habitats = JSON.stringify(await Habitat.listarHabitats());
            return res.status(200).json(habitats);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }

    public async nov(req: Request, res: Response) {
        // Desestruturando objeto recebido pelo front-end
        const { nomeHabitat } = req.body;

        // Instanciando objeto Habitat
        const novoHabitat = new Habitat(nomeHabitat);

        // Chama o método para persistir o habitat no banco de dados
        const result = await Habitat.cadastrarHabitat(novoHabitat);

        // Verifica se a query foi executada com sucesso
        if (result) {
            return res.status(200).json('Habitat cadastrado com sucesso');
        } else {
            return res.status(400).json('Não foi possível cadastrar o habitat no banco de dados');
        }
    }

    public async remover(req: Request, res: Response) {
        const idHabitat = parseInt(req.query.idHabitat as string);
        const resultado = await Habitat.removerHabitat(idHabitat);

        if (resultado) {
            res.status(200).json('Habitat removido com sucesso');
        } else {
            res.status(401).json('Erro ao remover habitat');
        }
    }

    public async atualizar(req: Request, res: Response) {
        const { nomeHabitat } = req.body;
        const idHabitat = parseInt(req.query.idHabitat as string);

        // Instanciando objeto Habitat
        const novoHabitat = new Habitat(nomeHabitat);

        // Chama o método para persistir a ave no banco de dados 
        const result = await Habitat.atualizarHabitat(novoHabitat, idHabitat);
        // Verifica se a query foi executada com sucesso
        if (result) {
            return res.status(200).json('Habitat atualizado com sucesso');
        } else {
            return res.status(400).json('Não foi possível atualizar o habitat no banco de dados');
        }
    }
}