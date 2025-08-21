import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    email: "",
    cpf: "",
    dataNascimento: "",
  });
  const [busca, setBusca] = useState("");
  const [clienteAtualizar, setClienteAtualizar] = useState(null); // Para editar

  // Buscar clientes do backend
  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = () => {
    axios.get("http://localhost:8080/clientes").then((response) => {
      setClientes(response.data);
    });
  };

  //buscar cliente por filtro
  const buscarCliente = () => {
    if (busca.trim() === "") {
      carregarClientes();
    } else {
      axios
        .get(`http://localhost:8080/clientes/buscar?valor=${busca}`)
        .then((response) => {
          setClientes(response.data);
        });
    }
  };

  const buscarPorId = (id) => {
    axios.get(`http://localhost:8080/clientes/${id}`).then((response) => {
      setClientes([response.data]);
    });
  };

  const handleShow = (cliente = null) => {
    setClienteAtualizar(cliente);
    setNovoCliente(
      cliente
        ? {
            nome: cliente.nome,
            email: cliente.email,
            cpf: cliente.cpf,
            dataNascimento: cliente.dataNascimento,
          }
        : { nome: "", email: "", cpf: "", dataNascimento: "" }
    );
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setClienteAtualizar(null);
    setNovoCliente({ nome: "", email: "", cpf: "", dataNascimento: "" });
  };

  const handleChange = (e) => {
    setNovoCliente({ ...novoCliente, [e.target.name]: e.target.value });
  };

  // Salvar ou atualizar cliente
  const handleSalvar = () => {
    if (clienteAtualizar && clienteAtualizar.id) {
      // Atualizar
      axios
        .put(
          `http://localhost:8080/clientes/${clienteAtualizar.id}`,
          novoCliente
        )
        .then(() => {
          carregarClientes();
          handleClose();
        });
    } else {
      // Criar novo
      axios.post("http://localhost:8080/clientes", novoCliente).then(() => {
        carregarClientes();
        handleClose();
      });
    }
  };

  // Excluir cliente
  const handleExcluir = (id) => {
    if (window.confirm("Deseja realmente excluir este cliente?")) {
      axios.delete(`http://localhost:8080/clientes/${id}`).then(() => {
        carregarClientes();
      });
    }
  };

  // Filtragem da tabela
  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.email.toLowerCase().includes(busca.toLowerCase()) ||
      c.cpf.includes(busca)
  );

  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background:
          "linear-gradient(135deg, rgb(0, 123, 255), rgb(255, 0, 150))",
        color: "white",
        padding: "20px",
      }}
    >
      <h1 className="mb-4">Gerenciamento de Clientes</h1>

      {/* Campo de busca */}

      <Form.Control
        type="text"
        placeholder="Buscar por nome, email ou CPF..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          maxWidth: "400px",
          marginBottom: "20px",
          borderRadius: "10px",
          padding: "10px",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            buscarCliente();
          }
        }}
      />

      {/* Tabela */}
      <Table
        striped
        bordered
        hover
        variant="dark"
        style={{ maxWidth: "900px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.dataNascimento}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    setClienteAtualizar(cliente);
                    setNovoCliente({
                      nome: cliente.nome,
                      email: cliente.email,
                      cpf: cliente.cpf,
                      dataNascimento: cliente.dataNascimento,
                    });
                    setShowModal(true);
                  }}
                >
                  Atualizar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleExcluir(cliente.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Botão cadastrar */}
      <Button
        variant="light"
        style={{
          marginTop: "20px",
          borderRadius: "10px",
          padding: "10px 20px",
        }}
        onClick={() => handleShow(null)}
      >
        Cadastrar Cliente
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {clienteAtualizar ? "Atualizar Cliente" : "Cadastrar Novo Cliente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={novoCliente.nome}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={novoCliente.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                name="cpf"
                value={novoCliente.cpf}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="text"
                name="dataNascimento"
                value={novoCliente.dataNascimento}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSalvar}>
            {clienteAtualizar ? "Atualizar" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
