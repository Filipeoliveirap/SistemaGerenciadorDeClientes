package com.BackEnd.BackEnd.business;

import com.BackEnd.BackEnd.infrastructure.entitys.Cliente;
import com.BackEnd.BackEnd.infrastructure.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository repository;

   public void salvarCliente(Cliente cliente) {
       cliente.setId(UUID.randomUUID());
       repository.save(cliente);
   }
}
