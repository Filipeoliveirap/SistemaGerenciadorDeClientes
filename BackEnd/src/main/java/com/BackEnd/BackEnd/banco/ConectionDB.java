package com.BackEnd.BackEnd.banco;

import com.datastax.astra.client.DataAPIClient;
import com.datastax.astra.client.Database;

public class ConectionDB {
    public static void main(String[] args) {
        String token = System.getenv("ASTRA_TOKEN");
        DataAPIClient client = new DataAPIClient(token);

        Database db = client.getDatabase("https://834d03fb-1849-4d28-8bcf-f712d1f11fb6-us-east1.apps.astra.datastax.com");
        System.out.println("Connected to AstraDB " + db.listCollectionNames());
    }
}
