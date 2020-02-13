const express = require('express');

const app = express();

// 在当前express的实例app上设置变量
app.set('secret', 'qwe12e9u123jbsf');

app.use(require('cors')());
app.use(express.json());

// app.use('/', express.static(__dirname + '/admin'));
app.use('/uploads', express.static(__dirname + '/uploads'));

require('./plugins/db')(app);

require('./routes/admin')(app);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
