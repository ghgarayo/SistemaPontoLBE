package com.lbe.sistemaponto.controller;

import com.lbe.sistemaponto.domain.ponto.PontoRepository;
import com.lbe.sistemaponto.domain.solicitacao.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/solicitar-ajuste")
public class SolicitacaoAjusteController {

    @Autowired
    private SolicitacaoAjusteRepository repository;

    @Autowired
    private PontoRepository pontoRepository;


    @PostMapping
    @Transactional
    public ResponseEntity<DadosListagemSolicitacoes> cadastrarSolicitacao(@RequestBody @Valid DadosSolicitacaoAjuste dados,
                                                                        UriComponentsBuilder uriBuilder){
    var solicitacaoAjuste = new SolicitacaoAjuste(dados);
    System.out.println("Solicitacao de ajuste: " + solicitacaoAjuste);
    repository.save(solicitacaoAjuste);

    var uri = uriBuilder.path("/solicitacao/{id}").buildAndExpand(solicitacaoAjuste.getId()).toUri();

    return ResponseEntity.created(uri).body(new DadosListagemSolicitacoes(solicitacaoAjuste));
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemSolicitacoes>> listarSolicitacoes(
            @PageableDefault(size = 20, sort = { "id" }) Pageable paginacao){
        var page = repository.findAllByAtivoTrue(paginacao).map(DadosListagemSolicitacoes::new);

        return ResponseEntity.ok(page);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> finalizarSolicitacao(@PathVariable Long id, @RequestBody DadosResponstaSolicitacao dados){
        var solicitacao = repository.getReferenceById(id);
        solicitacao.finalizarSolicitacao(dados);
        repository.save(solicitacao);
        return ResponseEntity.noContent().build();
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<DadosListagemSolicitacoes> detalharPorId(@PathVariable Long id){
        System.out.println(id);
        var solicitacao = repository.getReferenceById(id);
        System.out.println(solicitacao);
        return ResponseEntity.ok(new DadosListagemSolicitacoes(solicitacao));

    }

}
