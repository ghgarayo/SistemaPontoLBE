package com.lbe.sistemaponto.domain.solicitacao;

import java.time.LocalDate;

public record DadosListagemSolicitacoes(Long id, LocalDate dataCompleta, Long idFuncionario) {
    /*
     * recebe um objeto do tipo Solicitação Ajuste e chama o construtor do record passando os
     * apenas atributos necessários para o retorno de dados para listagem.
     */
    public DadosListagemSolicitacoes(SolicitacaoAjuste solicitacao){
        this(solicitacao.getId(), solicitacao.getDataCompleta(), solicitacao.getIdFuncionario());
    }
}
