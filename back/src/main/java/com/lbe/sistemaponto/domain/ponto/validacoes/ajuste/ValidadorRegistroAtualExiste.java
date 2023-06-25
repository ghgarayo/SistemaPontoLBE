package com.lbe.sistemaponto.domain.ponto.validacoes.ajuste;

import com.lbe.sistemaponto.domain.ponto.DadosAjustePonto;
import com.lbe.sistemaponto.domain.ponto.PontoRepository;

import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ValidadorRegistroAtualExiste implements ValidadorAjustePonto{

    @Autowired
    private PontoRepository repository;

    @Override
    public void validar(DadosAjustePonto dados) {
        var registroAtual = repository.findById(dados.idPonto());

        if(registroAtual.isEmpty()){
            throw new ValidationException("Registro de Ponto não encontrado!");
        }

    }
}
