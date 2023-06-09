package com.lbe.sistemaponto.domain.solicitacao;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosResponstaSolicitacao(
        @NotNull
        Long idAdmin,
        @NotNull
        LocalTime horaCompleta,
        @NotNull
        LocalDate dataCompleta,
        @NotNull
        RespostaSolicitacao resposta,
        String descricaoResposta
) {
}
