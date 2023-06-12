package com.lbe.sistemaponto.controller;

import com.lbe.sistemaponto.domain.solicitacao.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/solicitar-ajuste")
@SecurityRequirement(name = "bearer-key")
public class SolicitacaoAjusteController {

    @Autowired
    private SolicitacaoAjusteRepository repository;

   @Autowired
    private SolicitacaoAjusteService solicitacaoAjusteService;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoSolicitacaoAjuste> criarSolicitacao(@RequestBody @Valid DadosSolicitacaoAjuste dados){
    var solicitacaoAjuste = solicitacaoAjusteService.criar(dados);

    return ResponseEntity.ok(solicitacaoAjuste);
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemSolicitacoes>> listarSolicitacoes(
            @PageableDefault(size = 20, sort = { "id" }) Pageable paginacao){
        var page = repository.findAllByAtivoTrue(paginacao).map(DadosListagemSolicitacoes::new);

        return ResponseEntity.ok(page);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> finalizarSolicitacao(@PathVariable Long id, @RequestBody @Valid DadosRespostaSolicitacao dados){
        solicitacaoAjusteService.finalizarSolicitacao(id, dados);

        return ResponseEntity.noContent().build();
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<DadosListagemSolicitacoes> detalharPorId(@PathVariable Long id){
        var solicitacao = solicitacaoAjusteService.detalhar(id);
        
        return ResponseEntity.ok(solicitacao);
    }

}
