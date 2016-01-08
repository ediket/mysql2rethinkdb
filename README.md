[![npm version](https://badge.fury.io/js/mysql2rethinkdb.svg)](https://badge.fury.io/js/mysql2rethinkdb)

# What is it

Migrate mysql tables into rethinkdb.

# Usage

Before use command, Check [Rethinkdb python driver](http://www.rethinkdb.com/docs/install-drivers/python/) is installed. Because `rethinkdb import` command is implemented by python.

__Command-Line__

```bash
npm install -g mysql2rethinkdb;
mysql2rethinkdb -u [user] -p [password] -h [host] -P [port] -D [database] -t [tables]
```

__Source Code__

```bash
npm install -S mysql2rethinkdb;
```

```js
var mysql2rethinkdb = require('mysql2rethinkdb');

mysql2rethinkdb({
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'test',
  tables: ['user', 'post']
});
```

# Related Links

- https://rethinkdb.com/docs/importing/
