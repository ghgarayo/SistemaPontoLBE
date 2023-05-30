package com.lbe.sistemaponto.domain.ponto;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosListagemPonto(LocalDate dataCompleta,
    LocalTime horarioEntrada1, String latitudeEntrada1, String longitudeEntrada1,
    LocalTime horarioSaida1, String latitudeSaida1, String longitudeSaida1,
    LocalTime horarioEntrada2, String latitudeEntrada2, String longitudeEntrada2,
    LocalTime horarioSaida2, String latitudeSaida2, String longitudeSaida2) {

    public DadosListagemPonto(Ponto ponto){
      this(ponto.getDataCompleta(),
      ponto.getHorarioEntrada1(), ponto.getLatitudeEntrada1(), ponto.getLongitudeEntrada1(),
      ponto.getHorarioSaida1(), ponto.getLatitudeSaida1(), ponto.getLongitudeSaida1(),
      ponto.getHorarioEntrada2(), ponto.getLatitudeEntrada2(), ponto.getLongitudeEntrada2(),
      ponto.getHorarioSaida2(), ponto.getLatitudeSaida2(), ponto.getLongitudeSaida2());
    }
}
