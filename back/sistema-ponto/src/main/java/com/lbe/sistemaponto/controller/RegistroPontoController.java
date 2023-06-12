package com.lbe.sistemaponto.controller;

import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

import com.lbe.sistemaponto.domain.ponto.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/registro-ponto")
@SecurityRequirement(name = "bearer-key")
public class RegistroPontoController {

    @Autowired
    private PontoRepository repository;

    @Autowired
    private RegistroPontoService registroPontoService;

    @PostMapping
    @Transactional
    public ResponseEntity<Object> registrarBatidaPonto(@RequestBody @Valid DadosBatidaPonto dados) {
        var registro = registroPontoService.registrar(dados);
        return ResponseEntity.ok(registro);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosListagemCompletaPonto> listarRegistroPorId(@PathVariable Long id) {
        var registroPonto = repository.getReferenceById(id);
        return ResponseEntity.ok(new DadosListagemCompletaPonto(registroPonto));
    }

    @GetMapping("/{idFuncionario}/{ano}/{mes}")
    public ResponseEntity<Object> listarRegistrosPorLogin(@PathVariable Long idFuncionario,
            @PathVariable int ano, @PathVariable int mes,
            @PageableDefault(size = 30, sort = { "dataCompleta" }) Pageable paginacao) {
        var registrosPonto = repository.findByIdFuncionario(idFuncionario, paginacao)
                .map(DadosListagemCompletaPonto::new)
                .getContent();
        var registrosFiltrados = filtrarRegistrosPorAnoEMes(registrosPonto, ano, mes);

        return ResponseEntity.ok(registrosFiltrados);
    }

    private List<DadosListagemCompletaPonto> filtrarRegistrosPorAnoEMes(List<DadosListagemCompletaPonto> registros,
            int ano, int mes) {
        return registros.stream().filter(registro -> {
            YearMonth data = YearMonth.from(registro.dataCompleta());
            return data.getYear() == ano && data.getMonthValue() == mes;
        }).collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> ajustePonto(@PathVariable Long id, @RequestBody DadosAjustePonto dados) {
        var ajuste = registroPontoService.ajustar(dados);
        return ResponseEntity.ok(ajuste);
    }
}
