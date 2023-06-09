package com.lbe.sistemaponto.domain.solicitacao;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosListagemSolicitacoes(
        Long id,
        Long idFuncionario,
        Long idPonto,
        LocalDate dataCompleta,
        LocalTime horarioEntrada1,
        LocalTime horarioSaida1,
        LocalTime horarioEntrada2,
        LocalTime horarioSaida2,
        String descricaoSolicitacao

        ) {
    /*
     * recebe um objeto do tipo Solicitação Ajuste e chama o construtor do record passando os
     * apenas atributos necessários para o retorno de dados para listagem.
     */
    public DadosListagemSolicitacoes(SolicitacaoAjuste solicitacao){
        this(solicitacao.getId(),
                solicitacao.getIdFuncionario(),
                solicitacao.getIdPonto(),
                solicitacao.getDataCompleta(),
                solicitacao.getHorarioEntrada1(),
                solicitacao.getHorarioSaida1(),
                solicitacao.getHorarioEntrada2(),
                solicitacao.getHorarioSaida2(),
                solicitacao.getDescricaoSolicitacao());
    }
}
