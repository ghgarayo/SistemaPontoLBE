package com.lbe.sistemaponto.domain.ponto.validacoes.registro;

import com.lbe.sistemaponto.domain.ValidacaoException;
import com.lbe.sistemaponto.domain.ponto.DadosBatidaPonto;
import com.lbe.sistemaponto.domain.ponto.PontoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class ValidadorHorarioAlmoco implements ValidadorRegistroPonto {

    @Autowired
    private PontoRepository repository;

    @Override
    public void validar(DadosBatidaPonto dados) {
        var registro = repository.findByIdFuncionarioAndDataCompleta(dados.idFuncionario(), dados.dataCompleta());

        if (registro == null) {
            return;
        }

        if (registro.getHorarioEntrada1() == null) {
            return;
        }

        if (registro.getHorarioSaida1() == null) {
            return;
        }

        if (registro.getHorarioEntrada2() != null) {
            return;
        }

        var diferencaEmMinutos = Duration.between(registro.getHorarioSaida1(), dados.horarioCompleto()).toMinutes();

        if (diferencaEmMinutos < 60) {
            throw new ValidacaoException("Pausa deve ser de pelo menos 1 hora!");
        }

    }
}
