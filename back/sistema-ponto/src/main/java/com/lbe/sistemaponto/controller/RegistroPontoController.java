package com.lbe.sistemaponto.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.lbe.sistemaponto.domain.ponto.DadosBatidaPonto;
import com.lbe.sistemaponto.domain.ponto.DadosListagemPonto;
import com.lbe.sistemaponto.domain.ponto.Ponto;
import com.lbe.sistemaponto.domain.ponto.PontoRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/registro-ponto")
public class RegistroPontoController {

    @Autowired
    private PontoRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity registrarBatidaPonto(@RequestBody @Valid DadosBatidaPonto dados,
            UriComponentsBuilder uriBuilder) {

        Ponto registroPonto = repository.findByDataCompleta(dados.dataCompleta());
        System.out.println(registroPonto);

        if (registroPonto == null) {
            var dadosBatida = new Ponto(dados);
            var uri = uriBuilder.path("/ponto/{id}").buildAndExpand(dadosBatida.getId()).toUri();
            repository.save(dadosBatida);
            return ResponseEntity.created(uri).body(dadosBatida);
        } else {
            // Atualiza o registro de ponto existente com base na data
            registroPonto.atualizaPonto(dados);
            repository.save(registroPonto);
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("/{login}")
    public ResponseEntity<Page<DadosListagemPonto>> listarRegistrosPorLogin(@PathVariable String login, 
    @PageableDefault(size = 30, sort = { "dataCompleta" }) Pageable paginacao) {
        var registrosPonto = repository.findByLogin(login,paginacao).map(DadosListagemPonto::new);    

        return ResponseEntity.ok(registrosPonto);

    }

}
