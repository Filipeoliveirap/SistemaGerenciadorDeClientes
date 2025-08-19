package com.BackEnd.BackEnd.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.cassandra.core.CassandraTemplate;
import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;

import com.datastax.oss.driver.api.core.CqlSession;

import java.net.InetSocketAddress;
@Configuration
@EnableCassandraRepositories(basePackages = "com.BackEnd.repository")
public class CassandraConfig {
    private static final String CONTACT_POINT = "127.0.0.1";
    private static final int PORT = 9042;
    private static final String LOCAL_DATACENTER = "datacenter1";
    private static final String KEYSPACE = "test_keyspace";
    private static final String USERNAME = "cassandra";
    private static final String PASSWORD = "cassandra";

    @Bean
    public CqlSession session() {
        return CqlSession.builder()
                .addContactPoint(new InetSocketAddress(CONTACT_POINT, PORT))
                .withLocalDatacenter(LOCAL_DATACENTER)
                .withAuthCredentials(USERNAME, PASSWORD)
                .withKeyspace(KEYSPACE)
                .build();
    }

    @Bean
    public CassandraTemplate cassandraTemplate(CqlSession session) {
        return new CassandraTemplate(session);
    }
}
