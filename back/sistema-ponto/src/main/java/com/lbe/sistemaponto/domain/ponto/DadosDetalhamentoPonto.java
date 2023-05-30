package com.lbe.sistemaponto.domain.ponto;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosDetalhamentoPonto(LocalDate dataCompleta, LocalTime horarioCompleto, String tipo,
    String latitude, String longitude, String login) {

}
