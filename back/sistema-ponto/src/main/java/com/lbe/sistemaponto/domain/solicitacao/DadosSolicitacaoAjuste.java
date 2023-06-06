package com.lbe.sistemaponto.domain.solicitacao;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosSolicitacaoAjuste(
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
        @NotBlank
        String descricaoSolicitacao
) {
}
