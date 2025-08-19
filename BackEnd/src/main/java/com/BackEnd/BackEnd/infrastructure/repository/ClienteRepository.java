package com.BackEnd.BackEnd.infrastructure.repository;

import com.BackEnd.BackEnd.infrastructure.entitys.Cliente;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClienteRepository extends CassandraRepository<Cliente, UUID> {

    Optional<Cliente> findById(UUID id);
    @Query("SELECT * FROM clientes WHERE cpf = ?0 or email = ?0 or nome = ?0 ALLOW FILTERING")
    List<Cliente> buscarPorCpfOuEmailOuNome(String valor);
}
