import { Atracao } from "../model/Atracao";
import { Request, Response } from "express";

export class AtracaoController extends Atracao {

    /**
     * Acessa a função do Model que lista todas as atrações
     */
    public async ts(req: Request, res: Response): Promise<Response> {
        try {
            const atracoes = JSON.stringify(await Atracao.listarAtracoes());
            return res.status(200).json(atracoes);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }

    public async nv(req: Request, res: Response) {
        // Desestruturando objeto recebido pelo front-end
        const { nomeAtracao } = req.body;

        // Instanciando objeto Habitat
        const novoAtracao = new Atracao(nomeAtracao);

        // Chama o método para persistir o habitat no banco de dados
        const result = await Atracao.cadastrarAtracao(novoAtracao);

        // Verifica se a query foi executada com sucesso
        if (result) {
            return res.status(200).json('Atração cadastrada com sucesso');
        } else {
            return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
        }
    }

    public async remover(req: Request, res: Response) {
        const idAtracao = parseInt(req.query.idAtracao as string);
        const resultado = await Atracao.removerAtracao(idAtracao);

        if (resultado) {
            res.status(200).json('Atração removida com sucesso');
        } else {
            res.status(401).json('Erro ao remover atração');
        }
    }

    public async atualizar(req: Request, res: Response) {
        console.log('entrei na rota');

        // Desestruturando objeto recebido pelo front-end
        const { nomeAtracao } = req.body;
        const idAtracao = parseInt(req.query.idAtracao as string);

        // Instanciando objeto Atração
        const novoAtracao = new Atracao(nomeAtracao);

        // Chama o método para persistir a ave no banco de dados 
        const result = await Atracao.atualizarAtracao(novoAtracao, idAtracao);
        // Verifica se a query foi executada com sucesso
        if (result) {
            return res.status(200).json('Atração atualizada com sucesso');
        } else {
            return res.status(400).json('Não foi possível atualizar a atração no banco de dados');
        }
    }
}
