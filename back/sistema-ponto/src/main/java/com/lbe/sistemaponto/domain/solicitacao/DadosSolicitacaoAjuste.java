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
        Long idAdmin,
        @NotNull
        LocalTime horaCompleta,
        @NotNull
        LocalDate dataCompleta,
        @NotBlank
        String descricaoSolicitacao
) {
}
