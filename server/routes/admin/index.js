module.exports = app => {
  const express = require('express');
  const multer = require('multer');
  const jwt = require('jsonwebtoken');
  const assert = require('http-assert');
  const AdminUser = require('../../models/AdminUser');
  const router = express.Router({
    mergeParams: true
  });

  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({
      success: true
    });
  });

  // 资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent';
    }
    const items = await req.Model.find()
      .setOptions(queryOptions)
      .limit(10);
    res.send(items);
  });

  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  // 登陆校验中间件
  const authMiddleware = require('../../middleware/auth');

  // 通用CRUD资源中间件
  const resourceMiddleware = require('../../middleware/resource');

  app.use(
    '/admin/api/rest/:resource',
    authMiddleware(),
    resourceMiddleware(),
    router
  );

  // 上传新建物品的图标
  const upload = multer({ dest: __dirname + '/../../uploads' });
  app.post(
    '/admin/api/upload',
    authMiddleware(),
    upload.single('file'),
    async (req, res) => {
      console.log(req.file);
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    // 1. 根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password');

    // 使用了http-assert这个第三方库
    // 若错误直接抛出异常，然后在后面写个错误处理函数，把错误返回给前端
    // 前端在axios的响应拦截器里拦截到错误
    assert(user, 422, '用户不存在');

    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   });
    // }
    // 2. 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password);
    assert(isValid, 422, '密码错误');
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   });
    // }
    // 3. 返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'));
    return res.send({ token });
  });

  // 错误处理函数，四个参数的就表示错误处理中间件
  // 后端返回错误，前端的http响应拦截器拦截到后端这边返回的错误
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
};
