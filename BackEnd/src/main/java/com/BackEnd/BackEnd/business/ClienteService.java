package com.BackEnd.BackEnd.business;

import com.BackEnd.BackEnd.infrastructure.entitys.Cliente;
import com.BackEnd.BackEnd.infrastructure.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository repository;

   public void salvarCliente(Cliente cliente) {
       cliente.setId(UUID.randomUUID());
       repository.save(cliente);
   }

   public Cliente buscarClientePorId(UUID id) {
       return repository.findById(id).orElseThrow(
               () -> new RuntimeException("Cliente não encontrado")
       );
   }
   public List<Cliente> listarClientes() {
       return repository.findAll();
   }
}
