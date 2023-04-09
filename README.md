# Mini Instagram

## O que o usuário pode fazer

- Fazer login
- Fazer cadastro
- Ver os dados do seu perfil
- Editar os dados do seu perfil
- Ver postagens de outras pessoas
    - Ver quatidade de curtidas numa postagem
    - Ver os comentários em uma postagem
- Curtir postagens de outras pessoas
- Comentar em postagens

## O que não será possível fazer

- Ver a localização de uma postagem
- Ver pessoas que curtiram uma postagem
- Curtir um comentário
- Comentar em outros comentários

## Endpoints

### POST - Login

#### Dados enviados
- username
- senha

#### Dados retornados
- sucesso / erro
- token

#### Objetivos Gerais

- Validar username e a senha
- Buscar o usuario no banco de dados
- Verificar se a senha informada está correta
- Gerar token de autenticação
- Retornar os dados do usuario

---

### POST - Cadastro

#### Dados enviados
- username
- senha

#### Dados retornados
- sucesso / erro

#### Objetivos Gerais

- Validar username e a senha
- Verificar se username já existe no banco de dados
- Criptografar a senha
- Cadastrar usuario no banco de dados

---

### GET - Perfil

#### Dados enviados
- token (que terá id ou username)

#### Dados retornados
- URL da foto
- Nome
- Username
- Site
- Bio
- Email
- Telefone
- Genero

#### Objetivos Gerais

- Receber token no header e validar
- Buscar o cadastro do usuario através do token (info do token)
- Retornar os dados do usuario

---

### POST - Perfil - ATUALIZAR

#### Dados enviados
- token (que terá id ou username)
- URL da foto
- Nome
- Username
- Site
- Bio
- Email
- Telefone
- Genero

#### Dados retornados
- Sucesso ou erro

#### Objetivos Gerais

- Receber token no header e validar
- Buscar o cadastro do usuario através do token (info do token)
- Exigir ao menos um campo para ser atualizado
- Criptografar nova senha se for informada
- Verificar se já existe username e email, caso queira altera-los

---

### GET - Postagens

#### Dados enviados
- token
- offset (páginação)

#### Dados retornados
- Postagens []
    - id
    - foi curtido por mim
    - Usuario
        - URL da foto
        - username
        - é perfil oficial
    - Fotos []
    - quatidade de curtidas
    - Comentários []
        - username
        - texto
    - Data

#### Objetivos Gerais

- Receber token no header e validar
- Buscar o cadastro do usuario através do token (info do token)
- Retornar postagens de outras pessoas

---

### POST - Postagens - Postar fotos

#### Dados enviados
- token
- texto
- array com fotos

#### Dados retornados
- Sucesso ou erro

#### Objetivos Gerais

- Receber token no header e validar
- Buscar o cadastro do usuario através do token (info do token)
- Exigir que seja enviado ao menos uma foto
- Cadastrar postagem para o usuario logado
- Cadastro das fotos da postagem (tabela de fotos)

### POST - Curtir

#### Dados enviados
- token (contem username ou id do usuario)
- id da postagem

#### Dados retornados
- sucesso ou erro

#### Objetivos Gerais

- Receber token no header e validar
- Buscar o cadastro do usuario através do token (info do token)
- Buscar o cadastro da postagem com o id informado
- Verificar se o usuario já curtiu a postagem (não duplicar o registro)
- Cadastrar curtida (tabela curtidas)

---

### POST - Comentar

#### Dados enviados
- token (contem username ou id do usuario)
- id da postagem
- texto

#### Dados retornados
- sucesso ou erro

#### Objetivos Gerais

- Receber token no header e validar
- Buscar o cadastro do usuario através do token (info do token)
- Validar se foi enviado texto
- Buscar a postagem pelo id informado
- Cadastrar comentario