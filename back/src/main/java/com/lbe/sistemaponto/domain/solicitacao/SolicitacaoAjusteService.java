package com.lbe.sistemaponto.domain.solicitacao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SolicitacaoAjusteService {

    @Autowired
    private SolicitacaoAjusteRepository solicitacaoAjusteRepository;

    public DadosDetalhamentoSolicitacaoAjuste criar(DadosSolicitacaoAjuste dados){
        SolicitacaoAjuste solicitacao = new SolicitacaoAjuste(dados);
        solicitacaoAjusteRepository.save(solicitacao);

        return new DadosDetalhamentoSolicitacaoAjuste(solicitacao);
    }

    public void finalizarSolicitacao(Long id, DadosRespostaSolicitacao dados) {
        SolicitacaoAjuste solicitacao = solicitacaoAjusteRepository.getReferenceById(id);
        solicitacao.setAtivo(false);
        solicitacao.setIdAdmin(dados.idAdmin());
        solicitacao.setHoraCompleta(dados.horaCompleta());
        solicitacao.setResposta(dados.resposta());

        if(dados.descricaoResposta() != null) {
            solicitacao.setDescricaoResposta(dados.descricaoResposta());
        }
    }

    public DadosListagemSolicitacoes detalhar(Long id) {
        SolicitacaoAjuste solicitacao = solicitacaoAjusteRepository.getReferenceById(id);

        return new DadosListagemSolicitacoes(solicitacao);
        
  }

}
