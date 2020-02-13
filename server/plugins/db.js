module.exports = app => {
  const mongoose = require('mongoose');

  try {
    mongoose.connect(
      'mongodb+srv://brad123:brad123@bootcamp-suun9.mongodb.net/vue?retryWrites=true&w=majority',
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
