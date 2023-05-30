package com.lbe.sistemaponto.domain.funcionario;

import com.lbe.sistemaponto.domain.endereco.DadosEndereco;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record DadosCadastroFuncionario( 

    @NotBlank
    String nome,
    @NotBlank
    @Email 
    String email,
    @NotBlank 
    String senha, 
    @NotBlank
    @Pattern(regexp = "\\d{10,11}")
    String telefone, 
    @NotBlank
    @Pattern(regexp = "\\d{11}")
    String cpf, 
    @NotBlank
    String rg,
    @Valid
    DadosEndereco endereco) {

}