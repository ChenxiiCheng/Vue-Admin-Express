module.exports = app => {
  const mongoose = require('mongoose');

  try {
    mongoose.connect(
      'xxxxxxxxxxxxx',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    );

    console.log('数据库连接成功!!');
  } catch (err) {
    console.log('数据库连接失败....');
  }
};
