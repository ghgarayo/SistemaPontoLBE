package com.lbe.sistemaponto.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.lbe.sistemaponto.domain.funcionario.*;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/funcionarios")
@SecurityRequirement(name = "bearer-key")
public class FuncionarioController {

    @Autowired
    private FuncionarioRepository repository;

    private BCryptPasswordEncoder encoder;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoFuncionario> cadastrar(@RequestBody @Valid DadosCadastroFuncionario dados,
            UriComponentsBuilder uriBuilder) {

        /*
         * Código 201 devolve no corpo da resposta:
         * os dados do novo recurso/registro criado
         * cabeçalho protocolo HTTP (Location)
         * A URI criada representa o endereço e cabe ao Spring criar o cabeçalho
         * location
         * path() recebe o complemento da URL.
         * buildAndExpand() recebe o id recem criado no banco de dados.
         * toUri() cria o objeto URI.
         * body() a informação que será devolvida no corpo da resposta, neste caso o
         * DTO.
         * 
         */

        var encryptedPassword = encoder.encode(dados.senha());
        var funcionario = new Funcionario(dados);
        funcionario.setSenha(encryptedPassword);
        repository.save(funcionario);

        var uri = uriBuilder.path("/funcionario/{id}").buildAndExpand(funcionario.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosDetalhamentoFuncionario(funcionario));
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemFuncionario>> listar(
            @PageableDefault(size = 30, sort = { "id" }) Pageable paginacao) {

        /*
         * Para paginação, passa-se um Pageable e o retorno será uma Page. FindAll agora
         * tem uma sobrecarga que recebe a paginacao como atributo, e o Page já possui o
         * .map() como metodo.
         * Nao é necessário usar o toList()
         * 
         * USANDO PAGINAÇÃO E ORDENAÇÃO NA URL DA API
         * 
         * -=-=-= Paginação =-=-=-
         * /funcionarios?size=[x]&page=[y]
         * onde X controla o numero de registro por página e Y controla qual página está
         * sendo acessada
         * 
         * -=-=-= Ordenação =-=-=-
         * /funcionarios?sort=[z],[j]
         * onde Z é o atributo que será utilizado para ordenar a lista e J define se é
         * ascendente (asc) ou descendente (desc)
         */

        var page = repository.findAllByAtivoTrue(paginacao).map(DadosListagemFuncionario::new);

        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoFuncionario> atualizar(
            @RequestBody @Valid DadosAtualizacaoFuncionario dados) {
        var funcionario = repository.getReferenceById(dados.id());
        funcionario.atualizarInformacoes(dados);
        return ResponseEntity.ok(new DadosDetalhamentoFuncionario(funcionario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> inativar(@PathVariable Long id) {
        var funcionario = repository.getReferenceById(id);
        funcionario.inativar();
        repository.save(funcionario);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoFuncionario> detalhar(@PathVariable Long id) {
        var funcionario = repository.getReferenceById(id);
        return ResponseEntity.ok(new DadosDetalhamentoFuncionario(funcionario));
    }

}
