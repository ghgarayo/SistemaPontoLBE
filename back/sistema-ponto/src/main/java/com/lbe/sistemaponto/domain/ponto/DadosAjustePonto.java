package com.lbe.sistemaponto.domain.ponto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;

public record DadosAjustePonto(
        @NotNull
        Long idPonto,
        @NotNull
        LocalTime horarioEntrada1,
        @NotNull
        LocalTime horarioSaida1,
        @NotNull
        LocalTime horarioEntrada2,
        @NotNull
        LocalTime horarioSaida2
) {
}
