package com.lbe.sistemaponto.domain.ponto;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosBatidaPonto(
  @NotNull
  LocalDate dataCompleta,
  @NotNull
  LocalTime horarioCompleto,
  @NotBlank
  String latitude,
  @NotBlank
  String longitude,
  @Valid
  String login
) {
  
}
