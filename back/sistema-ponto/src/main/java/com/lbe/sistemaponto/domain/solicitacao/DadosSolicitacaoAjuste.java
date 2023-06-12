package com.lbe.sistemaponto.domain.solicitacao;


import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosSolicitacaoAjuste(

        // Record que passa as informações para a salvar a solicitação no Banco de Dados pela Solicitacao
        @NotNull
        Long idPonto,
        @NotNull
        Long idFuncionario,
        @NotNull
        LocalDate dataCompleta,
        @NotNull
        LocalTime horarioEntrada1,
        @NotNull
        LocalTime horarioSaida1,
        @NotNull
        LocalTime horarioEntrada2,
        @NotNull
        LocalTime horarioSaida2,
        String descricaoSolicitacao
) {
}
