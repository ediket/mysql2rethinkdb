[![npm version](https://badge.fury.io/js/mysql2rethinkdb.svg)](https://badge.fury.io/js/mysql2rethinkdb)

# What is it

Migrate mysql tables into rethinkdb.

# Dependencies

https://github.com/seamusabshere/mysql2xxxx

```
gem install mysql2xxxx
gem install mysql
gem install iconv
```

# Usage

__Command-Line__

```bash
npm install -g mysql2rethinkdb;
mysql2rethinkdb -u [user] -p [password] -h [host] -P [port] -D [database]
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
});
```

# Related Links

- https://github.com/seamusabshere/mysql2xxxx
- https://rethinkdb.com/docs/importing/
- https://github.com/calder/Methink
