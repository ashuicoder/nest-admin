# 项目介绍

基于`nest.js`开发的RBAC权限系统。

# 使用

确保安装了`nodejs18+`、 `mysql8.0+`

# 配置修改

在项目根目录`.env`修改为自己电脑相应得配置。

配置默认账号有两种方式：

1. 使用请使用数据库工具导入根目录的`admin.sql`文件，默认账号为`amdin`，密码为`123456`
2. 将`src/user/user.controller.ts`中的add方法的`@Public()`注释打开，使用postman等工具手动创建账号。

# 运行

```bash
pnpm i
```

```bash
pnpm start:dev
```

# 接口文档

运行后，访问`http://localhost:3000/api`即可查看接口文档。
