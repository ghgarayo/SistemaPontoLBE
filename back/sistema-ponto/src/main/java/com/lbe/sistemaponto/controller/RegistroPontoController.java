package com.lbe.sistemaponto.controller;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<Object> registrarBatidaPonto(@RequestBody @Valid DadosBatidaPonto dados,
            UriComponentsBuilder uriBuilder) {

        Ponto registroPonto = repository.findByIdFuncionarioAndDataCompleta(dados.idFuncionario(),dados.dataCompleta());

        if (registroPonto == null || registroPonto.getIdFuncionario() != dados.idFuncionario()) {
            var dadosBatida = new Ponto(dados);
            var uri = uriBuilder.path("/ponto/{id}").buildAndExpand(dadosBatida.getId()).toUri();
            repository.save(dadosBatida);
            return ResponseEntity.created(uri).body(dadosBatida);
        } else {
            // Atualiza o registro de ponto existente com base na data
            registroPonto.atualizaPonto(dados);
            repository.save(registroPonto);
            return ResponseEntity.ok(registroPonto);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosListagemPonto> listarRegistroPorId(@PathVariable Long id){
        var registroPonto = repository.getReferenceById(id);
        return ResponseEntity.ok(new DadosListagemPonto(registroPonto));
    }


    @GetMapping("/{idFuncionario}/{ano}/{mes}")
    public ResponseEntity<Object> listarRegistrosPorLogin(@PathVariable Long idFuncionario,
            @PathVariable int ano, @PathVariable int mes,
            @PageableDefault(size = 30, sort = { "dataCompleta" }) Pageable paginacao) {
        var registrosPonto = repository.findByIdFuncionario(idFuncionario, paginacao).map(DadosListagemPonto::new).getContent();
        var registrosFiltrados = filtrarRegistrosPorAnoEMes(registrosPonto, ano, mes);

        return ResponseEntity.ok(registrosFiltrados);
    }

    private List<DadosListagemPonto> filtrarRegistrosPorAnoEMes(List<DadosListagemPonto> registros, int ano, int mes) {
        return registros.stream().filter(registro -> {
                    YearMonth data = YearMonth.from(registro.dataCompleta());
                    return data.getYear() == ano && data.getMonthValue() == mes;
                }).collect(Collectors.toList());
    }

}


