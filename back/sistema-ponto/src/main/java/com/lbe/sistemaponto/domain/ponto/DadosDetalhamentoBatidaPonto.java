package com.lbe.sistemaponto.domain.ponto;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosDetalhamentoBatidaPonto(
        LocalDate dataCompleta,
        LocalTime horarioCompleto,
        String latitude,
        String longitude,
        Long idFuncionario) {

  public DadosDetalhamentoBatidaPonto(DadosBatidaPonto dadosBatida) {
        this(dadosBatida.dataCompleta(),
                dadosBatida.horarioCompleto(),
                dadosBatida.latitude(),
                dadosBatida.longitude(),
                dadosBatida.idFuncionario());
  }
}
