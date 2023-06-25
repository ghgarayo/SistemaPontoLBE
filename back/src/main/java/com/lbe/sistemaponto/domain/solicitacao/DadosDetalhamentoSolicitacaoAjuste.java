package com.lbe.sistemaponto.domain.solicitacao;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosDetalhamentoSolicitacaoAjuste(
        Long idPonto,
        Long idFuncionario,
        LocalDate dataCompleta,
        LocalTime horarioEntrada1,
        LocalTime horarioSaida1,
        LocalTime horarioEntrada2,
        LocalTime horarioSaida2,
        String descricaoSolicitacao
) {

    public DadosDetalhamentoSolicitacaoAjuste(SolicitacaoAjuste dados) {
        this(dados.getIdPonto(),
                dados.getIdFuncionario(),
                dados.getDataCompleta(),
                dados.getHorarioEntrada1(),
                dados.getHorarioSaida1(),
                dados.getHorarioEntrada2(),
                dados.getHorarioSaida2(),
                dados.getDescricaoSolicitacao());
    }

}
