package com.lbe.sistemaponto.controller;

import com.lbe.sistemaponto.infra.authentication.DadosAutenticacao;
import com.lbe.sistemaponto.infra.security.DadosTokenJWT;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureJsonTesters
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
class AutenticacaoControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private JacksonTester<DadosAutenticacao> dadosJson;

    @Autowired
    private JacksonTester<DadosTokenJWT> dadosTokenJson;



    @Test
    @DisplayName("Teste de login - deveria devolver codigo http 200")
    void loginCenario1() throws Exception {

    }


    @Test
    @DisplayName("Teste de login - deveria devolver codigo http 400")
    void loginCenario2() throws Exception {
        var response = mvc.perform(post("/api/login")).andReturn().getResponse();
        assertThat(response.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }


}