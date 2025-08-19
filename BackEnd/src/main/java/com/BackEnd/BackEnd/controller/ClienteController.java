package com.BackEnd.BackEnd.controller;

import com.BackEnd.BackEnd.business.ClienteService;
import com.BackEnd.BackEnd.infrastructure.entitys.Cliente;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public ResponseEntity<Void> salvarCliente(@RequestBody @Valid Cliente cliente){
        clienteService.salvarCliente(cliente);
        return ResponseEntity.ok().build();

    }
}
