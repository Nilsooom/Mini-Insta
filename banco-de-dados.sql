-- Banco de dados: mini_insta

-- Tabela de usuarios:
create table usuarios (
    id serial primary key,
    nome text,
    imagem text,
    username text not null unique,
    email text unique,
    site text,
    bio text,
    telefone text,
    genero text,
    senha text not null,
    verificado boolean default false
);

-- Tabelas referente a postagens
create table postagens (
    id serial primary key,
    usuario_id int not null, -- precisa pegar os dados do usuario
    data timestamptz default now(), --Cria horario atual
    texto text, -- Legenda
    foreign key (usuario_id) references usuarios (id) -- Faz a referencia de tabelas
);

-- Fotos
create table postagem_fotos (
    id serial primary key,
    postagem_id int not null, -- Referencia da postagem (quem postou)
    imagem text not null, -- URL da imagem
    foreign key (postagem_id) references postagens (id)
);

-- Comentario das fotos
create table postagem_comentarios (
    id serial primary key,
    texto text not null, --Comentario
    data timestamptz default now(),
    usuario_id int not null, --Usuario responsavel pelo comentario
    postagem_id int not null, -- referencia da postagem que foi comentada
    foreign key (postagem_id) references postagens (id),
    foreign key (usuario_id) references usuarios (id) -- Faz a referencia de tabelas
);

-- Curtidas (Usuario não pode curtir duas vezes a msm postagem portanto não necessita de ID)
create table postagem_curtidas (
usuario_id int not null,
postagem_id int not null,
data timestamptz default now(), -- caso queira usar futuramente
foreign key (postagem_id) references postagens (id),
foreign key (usuario_id) references usuarios (id)
);