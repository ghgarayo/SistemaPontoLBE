package com.lbe.sistemaponto.domain.ponto.validacoes.registro;

import java.time.LocalTime;

import org.springframework.stereotype.Component;

import com.lbe.sistemaponto.domain.ValidacaoException;
import com.lbe.sistemaponto.domain.ponto.DadosBatidaPonto;


@Component
public class ValidadorHorario implements ValidadorRegistroPonto {

  @Override
  public void validar(DadosBatidaPonto dados) {
    LocalTime horaAtual = LocalTime.now(); 

    if(dados.horarioCompleto().isAfter(horaAtual)) {
      throw new ValidacaoException("Horário inválido!");
    }

  }
  
}
