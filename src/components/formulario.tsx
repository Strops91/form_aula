import { useState, type ChangeEvent, type FormEvent } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function Formulario() {
  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nome || !cpf) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    // Criar objeto com os dados do usuário
    const usuario = {
      nome,
      cpf,
      dataCadastro: new Date().toISOString()
    };

    // Converter para JSON e salvar no localStorage
    localStorage.setItem('usuarioData', JSON.stringify(usuario));
    
    setMensagem(`Dados salvos com sucesso! Nome: ${nome}, CPF: ${cpf}`);
    
    // Limpar os campos após o envio (opcional)
    setNome('');
    setCpf('');
  };

  const handleNomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300, margin: 'auto', mt: 5 }}
    >
      <Typography variant="h5">Formulário</Typography>

      <TextField
        label="Nome"
        value={nome}
        onChange={handleNomeChange}
        required
      />

      <TextField
        label="CPF"
        value={cpf}
        onChange={handleCpfChange}
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Enviar
      </Button>

      {mensagem && <Typography>{mensagem}</Typography>}
    </Box>
  );
}