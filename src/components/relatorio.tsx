import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, List, ListItem, ListItemText } from '@mui/material';

interface UsuarioData {
  nome: string;
  cpf: string;
  dataCadastro: string;
}

export default function ExibirDadosUsuario() {
  const [usuario, setUsuario] = useState<UsuarioData | null>(null);
  const [mensagem, setMensagem] = useState<string>('');

  // Carrega os dados do localStorage quando o componente é montado
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    const dadosSalvos = localStorage.getItem('usuarioData');
    
    if (dadosSalvos) {
      try {
        const usuarioData: UsuarioData = JSON.parse(dadosSalvos);
        setUsuario(usuarioData);
        setMensagem('Dados carregados com sucesso!');
      } catch (error) {
        setMensagem('Erro ao ler os dados do localStorage.');
      }
    } else {
      setMensagem('Nenhum dado de usuário encontrado no localStorage.');
    }
  };

  const limparDados = () => {
    localStorage.removeItem('usuarioData');
    setUsuario(null);
    setMensagem('Dados removidos do localStorage.');
  };

  return (
    <Box sx={{ width: 300, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Dados do Usuário</Typography>
      
      {usuario ? (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <List>
            <ListItem>
              <ListItemText primary="Nome" secondary={usuario.nome} />
            </ListItem>
            <ListItem>
              <ListItemText primary="CPF" secondary={usuario.cpf} />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Data de Cadastro" 
                secondary={new Date(usuario.dataCadastro).toLocaleString()} 
              />
            </ListItem>
          </List>
        </Paper>
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Nenhum dado disponível
        </Typography>
      )}
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={carregarDados}
        >
          Recarregar Dados
        </Button>
        
        {usuario && (
          <Button 
            variant="outlined" 
            color="error" 
            onClick={limparDados}
          >
            Limpar Dados
          </Button>
        )}
      </Box>
      
      {mensagem && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {mensagem}
        </Typography>
      )}
    </Box>
  );
}