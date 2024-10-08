Curso - Licenciatura em Computação 2 Ano.
Materia - Introdução à Teoria da Computação

# Começando
Estamos aprendendo sobre automatos finitos

Para rodar esse codigo voce deve crirar arquivo_do_automato.aut e o arquivo_de_testes.in antes de executar.

### Exemplo
arquivo_do_automato.aut
```json
{
    "initial": 0,
    "final": [
        2
    ],
    "transitions": [
        {
            "from": "0",
            "to": "0",
            "read": "a"
        },
        {
            "from": "2",
            "to": "2",
            "read": "a"
        },
        {
            "from": "1",
            "to": "1",
            "read": "b"
        },
        {
            "from": "1",
            "to": "2",
            "read": "a"
        },
        {
            "from": "0",
            "to": "1",
            "read": "b"
        }
    ]
}
````
arquivo_de_testes.in
```csv
ba;1
aaaabbbbbaaaaa;1
abababab;0
bbbbbbbb;0
aaaaaaaaaaaa;0
aaaaabaaaaa;1
```

Rode o projeto usando `node index.js` ou use um arquivo reespectivo.
