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
    public ResponseEntity<DadosDetalhamentoAjuste> cadastrarSolicitacao(@RequestBody @Valid DadosSolicitacaoAjuste dados,
                                                                        UriComponentsBuilder uriBuilder){
    var solicitacaoAjuste = new SolicitacaoAjuste(dados);
    repository.save(solicitacaoAjuste);

    var uri = uriBuilder.path("/solicitacao/{id}").buildAndExpand(solicitacaoAjuste.getId()).toUri();

    return ResponseEntity.created(uri).body(new DadosDetalhamentoAjuste(solicitacaoAjuste));
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemSolicitacoes>> listarSolicitacoes(
            @PageableDefault(size = 30, sort = { "id" }) Pageable paginacao){
        var page = repository.findAllByAtivoTrue(paginacao).map(DadosListagemSolicitacoes::new);

        return ResponseEntity.ok(page);
    }

    @DeleteMapping
    public ResponseEntity<Object> finalizarSolicitacao(@PathVariable Long id){
        var solicitacao = repository.getReferenceById(id);
        solicitacao.finalizarSolicitacao();
        repository.save(solicitacao);
        return ResponseEntity.noContent().build();
    }



}
