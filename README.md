# Space Mission Control

Aplicativo mobile cross-platform desenvolvido em **React Native com Expo** para simular uma central de monitoramento de missões espaciais.

O projeto foi desenvolvido para a **Global Solution** da disciplina **Cross-Platform Application Development**, com o objetivo de entregar uma interface funcional, visualmente temática e tecnicamente sólida, semelhante a um painel de controle de uma missão espacial real.

## Integrantes

* Taysir Fauzi Ali - RM: 564884
* Rafael de Medeiros Cordeiro - RM: 562167
* Caique Baptistella de Vicente Albertino - RM: 564747

## Descrição do Projeto

O **Space Mission Control** é um aplicativo que simula uma central de controle responsável pelo acompanhamento de uma missão espacial.

A aplicação permite monitorar dados operacionais como energia, temperatura, oxigênio, comunicação, estabilidade orbital e radiação. A partir desses dados, o sistema gera automaticamente avisos e alertas críticos quando os parâmetros ultrapassam os limites configurados.

O app também permite atualizar os dados da missão por meio de um formulário com validação e configurar os limiares de atenção e criticidade para cada parâmetro monitorado.

## Tecnologias Utilizadas

* React Native
* Expo
* Expo Router
* TypeScript
* Context API
* AsyncStorage
* React Native Components
* Expo Vector Icons

## Funcionalidades

* Dashboard com dados operacionais da missão
* Monitoramento de sensores em tempo real
* Alertas automáticos por nível de criticidade
* Diferenciação entre aviso de atenção e alerta crítico
* Formulário com validação de campos obrigatórios
* Validação de formatos e limites numéricos
* Configuração de limiares de atenção e criticidade
* Persistência local dos dados com AsyncStorage
* Gerenciamento global de estado com Context API
* Navegação entre telas com Expo Router
* Interface visual temática inspirada em centrais espaciais

## Telas do Aplicativo

### Home

Tela inicial com uma visão geral da missão, exibindo o nome da missão, operador responsável, energia disponível, comunicação, quantidade de alertas ativos e status geral da operação.

O status geral pode variar entre:

* Operação Normal
* Atenção Operacional
* Falha Crítica Iminente

### Dashboard

Tela responsável por exibir os principais sensores da missão:

* Energia
* Oxigênio
* Comunicação
* Estabilidade orbital
* Radiação
* Temperatura

Cada sensor apresenta valor atual, descrição, barra de progresso e status visual indicando se o parâmetro está normal, em atenção ou crítico.

### Alertas

Tela que lista os avisos e alertas críticos gerados automaticamente pelo sistema.

Os alertas são criados quando algum parâmetro atinge os limites configurados na aplicação. O app diferencia alertas de atenção, exibidos em amarelo, e alertas críticos, exibidos em vermelho.

### Missão

Tela com formulário para atualizar os dados operacionais da missão.

Campos disponíveis:

* Nome da missão
* Operador responsável
* Energia
* Temperatura
* Oxigênio
* Comunicação
* Estabilidade orbital
* Radiação

O formulário possui validações para campos obrigatórios, valores numéricos e limites permitidos.

### Configurações

Tela para gerenciamento dos alertas e parâmetros da missão.

Funcionalidades disponíveis:

* Ativar ou desativar alertas automáticos
* Configurar limites de atenção
* Configurar limites críticos
* Resetar os dados da missão
* Manter os dados persistidos localmente com AsyncStorage

## Regras de Alertas

O sistema trabalha com dois níveis de alerta:

### Atenção

Representa uma situação que ainda não é crítica, mas exige acompanhamento da central.

Exemplo:

* Energia abaixo ou igual a 40%
* Comunicação abaixo ou igual a 70%
* Temperatura acima ou igual a 32°C

### Crítico

Representa uma situação grave, que exige ação imediata.

Exemplo:

* Energia abaixo ou igual a 20%
* Comunicação abaixo ou igual a 50%
* Temperatura acima ou igual a 40°C

## Como Executar o Projeto

### 1. Clonar o repositório

bash
git clone https://github.com/Taysir-FIAP/space-mission-control.git


### 2. Acessar a pasta do projeto

bash
cd space-mission-control


### 3. Instalar as dependências

bash
npm install


### 4. Executar o projeto

bash
npx expo start


### 5. Abrir o aplicativo

Após iniciar o Expo, é possível abrir o projeto de algumas formas:

* Pressionar w para abrir no navegador
* Escanear o QR Code com o aplicativo Expo Go
* Executar em emulador Android ou iOS

## Estrutura do Projeto

```txt
space-mission-control/
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   └── (tabs)/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       ├── dashboard.tsx
│   │       ├── alerts.tsx
│   │       ├── mission.tsx
│   │       └── settings.tsx
│   ├── components/
│   │   ├── AlertCard.tsx
│   │   ├── MissionCard.tsx
│   │   └── SensorCard.tsx
│   ├── constants/
│   │   └── colors.ts
│   ├── context/
│   │   └── MissionContext.tsx
│   └── utils/
│       ├── alertRules.ts
│       └── validations.ts
├── assets/
├── app.json
├── package.json
├── package-lock.json
└── README.md
```


## Principais Arquivos

### MissionContext.tsx

Responsável pelo gerenciamento global dos dados da missão utilizando Context API.

Também realiza a persistência local dos dados com AsyncStorage, permitindo que as informações sejam mantidas mesmo após fechar e abrir o aplicativo novamente.

### alertRules.ts

Contém as regras responsáveis por gerar os alertas automáticos da missão.

As regras verificam os parâmetros da missão e retornam alertas de atenção ou alertas críticos de acordo com os limiares configurados.

### validations.ts

Contém as validações utilizadas no formulário da tela Missão.

As validações verificam campos obrigatórios, formatos numéricos e limites aceitos para cada parâmetro.

### colors.ts

Centraliza a paleta de cores utilizada no aplicativo, mantendo a identidade visual espacial e facilitando a padronização da interface.

## Requisitos Atendidos

* Desenvolvimento mobile com React Native e Expo
* Navegação entre telas utilizando Expo Router
* Dashboard com sensores, energia, comunicação e estabilidade orbital
* Alertas automáticos para parâmetros em atenção e críticos
* Formulário com validação de campos
* Persistência local com AsyncStorage
* Gerenciamento de estado global com Context API
* Design visual temático coerente com o contexto espacial
* Repositório com código-fonte completo
* README com descrição do projeto e integrantes
* Commits demonstrando evolução do desenvolvimento

## Link do Repositório

https://github.com/Taysir-FIAP/space-mission-control
