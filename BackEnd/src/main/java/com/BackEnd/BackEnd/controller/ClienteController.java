package com.BackEnd.BackEnd.controller;

import com.BackEnd.BackEnd.business.ClienteService;
import com.BackEnd.BackEnd.infrastructure.entitys.Cliente;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:5173")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public ResponseEntity<Cliente> salvarCliente(@RequestBody @Valid Cliente cliente){
        clienteService.salvarCliente(cliente);
        return ResponseEntity.ok().build();

    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarClientePorId(@PathVariable UUID id){
        return ResponseEntity.ok(clienteService.buscarClientePorId(id));
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Cliente>> buscarPorCpfOuEmailOuNome(@RequestParam String valor) {
        List<Cliente> clientes = clienteService.buscarPorCpfOuEmailOuNome(valor);
        return ResponseEntity.ok(clientes);
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> listarClientes() {
        List<Cliente> clientes = clienteService.listarClientes();
        return ResponseEntity.ok(clientes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable UUID id) {
        clienteService.excluirCliente(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarCliente(@PathVariable UUID id, @RequestBody @Valid Cliente cliente) {
        clienteService.atualizarCliente(id, cliente);
        return ResponseEntity.ok().build();
    }
}
