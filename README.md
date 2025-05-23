# Projeto Marcação de Consultas Médicas - EC

## Estrutura do Projeto

```
marcacaoDeConsultasMedicas-EC/
├── backend/
│   ├── consultas-api/      # Código do backend Spring Boot
│   │   └── consultas-api/
│   │       └── src/main/java/com/fiap/eca/api_marcacao_consultas/ # Nova estrutura de pacotes
│   │           ├── config/         # Contém SecurityConfig.java (CORS global)
│   │           ├── controller/
│   │           ├── dto/
│   │           ├── enums/
│   │           ├── model/
│   │           ├── repository/
│   │           └── service/
│   └── sensor-api/         # (Backend anterior, baseado em instruções iniciais - ignorar)
├── src/                    # Código do frontend React Native
├── assets/
├── node_modules/           # (Gerado após npm install)
├── .gitignore
├── App.tsx
├── babel.config.js
├── package.json
├── tsconfig.json
└── README.md               # Este arquivo
```

## Funcionalidades

*   **Frontend (React Native):**
    *   Visualização da lista de consultas agendadas.
    *   Tela para agendar novas consultas.
    *   Seleção de médico e data/hora para agendamento.
    *   Integração com o backend para buscar e salvar dados.
    *   Interface de usuário com componentes estilizados.
*   **Backend (Spring Boot - `consultas-api`):**
    *   API REST para gerenciar consultas e médicos.
    *   Endpoints para criar, listar e buscar agendamentos.
    *   Endpoint para listar médicos.
    *   Persistência de dados usando Spring Data JPA e banco de dados H2 (em modo arquivo).
    *   Estrutura com Model, Repository, Service, Controller e DTOs no pacote `com.fiap.eca.api_marcacao_consultas`.
    *   **Configuração CORS global via Spring Security:** Implementada na classe `config/SecurityConfig.java` para permitir acesso do frontend, conforme solicitado na atividade.
    *   Spring Security adicionado como dependência.

## Como Executar o Projeto

Siga os passos abaixo para configurar e executar o frontend e o backend.

### 1. Configurar e Executar o Backend (`consultas-api`)

**Pré-requisitos:**
*   JDK 17 ou superior instalado.
*   Gradle (o projeto usa o Gradle Wrapper, então não é necessária instalação manual).

**Passos:**

1.  **Navegue até o diretório do backend:**
    ```bash
    cd backend/consultas-api/consultas-api
    ```
2.  **Compile e execute o projeto Spring Boot usando o Gradle Wrapper:**
    *   No Linux/macOS:
        ```bash
        ./gradlew bootRun
        ```
    *   No Windows:
        ```bash
        .\gradlew.bat bootRun
        ```
3.  O backend estará rodando em `http://localhost:8080`.
    *   O banco de dados H2 será criado no arquivo `./data/consultas.mv.db` dentro do diretório do backend.
    *   A configuração CORS está definida em `src/main/java/com/fiap/eca/api_marcacao_consultas/config/SecurityConfig.java` e permite acesso de qualquer origem (`*`) por padrão. Para produção, ajuste as `allowedOrigins` nesta classe.

### 2. Configurar e Executar o Frontend (React Native)

**Pré-requisitos:**
*   Node.js e npm/yarn instalados.
*   Expo CLI instalado (`npm install -g expo-cli`).
*   Emulador Android/iOS configurado ou dispositivo físico com o app Expo Go instalado.

**Passos:**

1.  **Navegue até o diretório raiz do projeto:**
    ```bash
    cd ../.. # Voltar para a raiz marcacaoDeConsultasMedicas-EC
    ```
2.  **Instale as dependências do Node.js:**
    ```bash
    npm install
    ```
3.  **Verifique a URL da API no frontend:**
    *   Abra o arquivo `src/services/api.ts`.
    *   Confirme se a constante `API_BASE_URL` está correta para o seu ambiente:
        *   Emulador Android: `http://10.0.2.2:8080/api` (padrão)
        *   Emulador iOS ou Dispositivo Físico: `http://SEU_IP_LOCAL:8080/api` (substitua `SEU_IP_LOCAL` pelo IP da sua máquina na rede local).
4.  **Inicie o aplicativo Expo:**
    ```bash
    npm start
    ```
    *   Isso abrirá o Metro Bundler no navegador.
5.  **Execute no Emulador/Dispositivo:**
    *   Pressione `a` no terminal para abrir no emulador Android.
    *   Pressione `i` para abrir no emulador iOS.
    *   Escaneie o QR Code com o app Expo Go no seu dispositivo físico.



