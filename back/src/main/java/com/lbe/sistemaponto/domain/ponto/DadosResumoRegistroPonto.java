package com.lbe.sistemaponto.domain.ponto;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosResumoRegistroPonto(Long id, LocalDate dataCompleta,
                                              LocalTime horarioEntrada1,
                                              LocalTime horarioSaida1,
                                              LocalTime horarioEntrada2,
                                              LocalTime horarioSaida2) {
  
  public DadosResumoRegistroPonto(Ponto ponto ) {
    this(ponto.getId(), ponto.getDataCompleta(), ponto.getHorarioEntrada1(),
        ponto.getHorarioSaida1(), ponto.getHorarioEntrada2(), ponto.getHorarioSaida2());
  }
}

