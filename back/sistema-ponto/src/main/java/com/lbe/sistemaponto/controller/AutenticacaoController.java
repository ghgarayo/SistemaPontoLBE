package com.lbe.sistemaponto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lbe.sistemaponto.domain.funcionario.Funcionario;
import com.lbe.sistemaponto.infra.authentication.DadosAutenticacao;
import com.lbe.sistemaponto.infra.security.DadosTokenJWT;
import com.lbe.sistemaponto.infra.security.TokenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/login")
public class AutenticacaoController {

    @Autowired
    /*
     * Atributo da classe AuthenticantionManager do Spring que dispara o processo de
     * autenticacao.
     */
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity login(@RequestBody @Valid DadosAutenticacao dados) {

        /*
         * UsernamePasswordAuthenticationToken é DTO proprio do Spring que recebe o usuario e a senha.
         */

        var authToken = new UsernamePasswordAuthenticationToken(dados.login(), dados.senha());
        var authentication = manager.authenticate(authToken); // dispara o processo de autenticação.
        var tokenJWT = tokenService.gerarToken((Funcionario) authentication.getPrincipal());
        return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
    }

}
