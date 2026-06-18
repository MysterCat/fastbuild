# 更新日志

## 0.3.5 (2026-06-18)

### 🐛 修复 bug

- 🐛修复`scope`记录格式错误，修复默认步骤记录错误 ([c88fa5d](https://github.com/2815261401/fastbuild/commit/c88fa5dc7e5643fc9adcf85684167e20bee1130b))

## 0.3.4 (2026-06-18)

### 🐛 修复 bug

- 🐛修复保存配置的错误格式 ([ce2cee6](https://github.com/2815261401/fastbuild/commit/ce2cee6596f4ea26b855d8258b8f90aec180a743))
- 🐛修复效验函数导致返回按钮无法使用 ([837be91](https://github.com/2815261401/fastbuild/commit/837be91382a06558dff9530f095e7e1f5ee840dd))

## 0.3.3 (2026-06-18)

### 🐛 修复 bug

- ✨修复推送信息的监听，新增自动推送选项 ([f04ab58](https://github.com/2815261401/fastbuild/commit/f04ab58e83e11c15f3ee1c6c2d7345e7bcbd4048))

## 0.3.2 (2026-06-18)

### 🐛 修复 bug

- 🐛启用`release-it`严格语义版本 ([77a01dc](https://github.com/2815261401/fastbuild/commit/77a01dc86b5c27799a1a267b7b0f83b395866627))
- 🐛修复`COMMIT_EDITMSG`重复添加消息的错误 ([96a99bc](https://github.com/2815261401/fastbuild/commit/96a99bc650bba16afad4dc2c1ad81133a9e93795))

## 0.3.1 (2026-06-18)

### 📦 构建系统变更

- 🐛修复`pnpm`导致的依赖路径错误 ([cb4187b](https://github.com/2815261401/fastbuild/commit/cb4187bab73f81c68ee2a6a458ea589d61982fb7))

## 0.3.0 (2026-06-18)

### ⚠ 💥 重大变更

- - 改变了配置名，设置文件需要更新
  - 删除了除了`quick-command`以外的所有功能

### 🐛 修复 bug

- ⬆️升级依赖 ([c1add93](https://github.com/2815261401/fastbuild/commit/c1add93893c115eca9dcdbb525cd769cb7b26303))
- 修复无法读取工作区配置 ([5276dd7](https://github.com/2815261401/fastbuild/commit/5276dd7f88427a911048bd664c8bed60aba6be8e))

### ♻️ 代码重构

- ⚡️`约定式提交`完成重构 ([6bcb8be](https://github.com/2815261401/fastbuild/commit/6bcb8beda09c4ad827f32e42526aba89869e4435))
- 💥`快速执行命令`进行重构 ([c28b494](https://github.com/2815261401/fastbuild/commit/c28b494da74a231ae33b384379d4e3401331fd84))

## 0.2.13 (2025-12-10)

### 🐛 修复 bug

- 修复`commitlint.config`默认配置读取错误 ([8e8297b](https://github.com/2815261401/fastbuild/commit/8e8297b371a3dc4bc55dd2e719f1f5911c96ae55))
- 修复`type`的空格丢失 ([57e6a36](https://github.com/2815261401/fastbuild/commit/57e6a369632ed0ece4378d47a87bb114e8b73532))

### 🔧 其他变更

- **release:** 🔖0.2.13 ([4f15c77](https://github.com/2815261401/fastbuild/commit/4f15c777cc2252b9dfa99e180480137381ef649b))

## 0.2.12 (2025-12-09)

### 🐛 修复 bug

- 修复`emoji`丢失的空格 ([a9c3697](https://github.com/2815261401/fastbuild/commit/a9c369719050df5695994d0bdc6018399e78599f))
- 用户不存在`commitlint.config`时，使用默认的配置 ([5df7e7b](https://github.com/2815261401/fastbuild/commit/5df7e7b17a07634ec1a13222e23c6bc2b6ebbfb2))

### 🔧 其他变更

- **release:** 🔖0.2.12 ([88799e6](https://github.com/2815261401/fastbuild/commit/88799e6a00103408e43bcac880a8e16801f6a85f))

## 0.2.11 (2025-12-09)

### ✨ 新增功能

- ✨根据配置来确定是否启用`emoji` ([690ce22](https://github.com/2815261401/fastbuild/commit/690ce2285a0466a18a1dbb11937e07a477a5a4d5))
- 调整`commitlint`配置文件，以支持`emoji` ([c2b5861](https://github.com/2815261401/fastbuild/commit/c2b5861f07331d1624105ad19d1b18b74600f8dd))
- 调整`release-it`的配置，`changelog`支持`emoji` ([ace8aae](https://github.com/2815261401/fastbuild/commit/ace8aae41b45d2c3ac7347362cc84f62021b07e0))

### 🔧 其他变更

- ⬆️升级依赖 ([a57eea9](https://github.com/2815261401/fastbuild/commit/a57eea9edc2ae7f864248099f10f39c575010790))
- **release:** 🔖0.2.11 ([8fb2f7d](https://github.com/2815261401/fastbuild/commit/8fb2f7d33a252e7b884b66c129160893ae974b60))

## 0.2.10 (2025-12-08)

### ✨ 新增功能

- ✨新增快速命令记忆功能 ([1ffd320](https://github.com/2815261401/fastbuild/commit/1ffd32009ea45b5c052c787b61373da029a16488))

### 🐛 修复 bug

- 🐛修复错误依赖，错误的`release-it`的插件 ([76bfffe](https://github.com/2815261401/fastbuild/commit/76bfffe703ea1f6a4f68281d9cccb22cf90c6018))

### 🔧 其他变更

- ⬆️升级依赖 ([3b22bf7](https://github.com/2815261401/fastbuild/commit/3b22bf723fdfd31821981c6ffea7cfb853137482))
- 🐛调整忽略的文件夹 ([3e14a02](https://github.com/2815261401/fastbuild/commit/3e14a0247899d8855501dc00bf164c8166a83c8e))
- **release:** 🔖0.2.10 ([2fce0fe](https://github.com/2815261401/fastbuild/commit/2fce0fe23dcadfff2c083b68df8414d3c7e62691))

## 0.2.9 (2025-12-05)

### ⚠ 💥 重大变更

- 调整`release`脚本的实现方式，使用`pnpm`的`Catalogs`

### ✨ 新增功能

- ✨`约定式提交`支持`emoji` ([fb0ab92](https://github.com/2815261401/fastbuild/commit/fb0ab92d8e3fdac6ef0af33bec988ba1fc665842))

### 🔧 其他变更

- ⬆️升级依赖 ([40c24ac](https://github.com/2815261401/fastbuild/commit/40c24ac137c489db39bdacb0d084bab23f6191ff))
- 💥升级依赖 ([f49e42e](https://github.com/2815261401/fastbuild/commit/f49e42e4c4de56335d858b68394d780a55041b54))
- **release:** 🔖0.2.9 ([8abe98e](https://github.com/2815261401/fastbuild/commit/8abe98e0e446e45368475ce9d10a7bec3a8890c3))

## 0.2.8 (2025-12-03)

### ✨ 新增功能

- ✨快速执行命令支持修改命令 ([1562f92](https://github.com/2815261401/fastbuild/commit/1562f92916de1981ac6dda519cb821bf2f52e7cc))

### 🔧 其他变更

- ⬆️升级依赖 ([ce16cee](https://github.com/2815261401/fastbuild/commit/ce16cee132bb4ac646a2cffc73387c84fc953604))
- **release:** 🔖0.2.8 ([416e1f7](https://github.com/2815261401/fastbuild/commit/416e1f7fbcea8108f4eba41bd98393cc48045340))

## 0.2.7 (2025-11-28)

### ✨ 新增功能

- ✨使用`tsdown`替代`vite`，执行`快速命令`时需要选择终端 ([bce6eba](https://github.com/2815261401/fastbuild/commit/bce6eba88bc7e5f14a4198491c072dad69161c09))

### 🐛 修复 bug

- 🐛修正调用终端的地址，默认选择最后一个，`git`的特殊处理 ([fbde3b8](https://github.com/2815261401/fastbuild/commit/fbde3b81b5932e6ca839d46fe9c8ab356ba5844c))

### 📃 文档变更

- 📝修改文档 ([a9107c9](https://github.com/2815261401/fastbuild/commit/a9107c9f7464d35459c2c88fb606de6a540c7d7d))

### 🔧 其他变更

- ⬆️升级依赖 ([3fed3d7](https://github.com/2815261401/fastbuild/commit/3fed3d71f0cf2d4401448039e12972bb279fd223))
- ⬆️升级依赖 ([de1fdc7](https://github.com/2815261401/fastbuild/commit/de1fdc761b740a4d80c4576efadfde7d553948a4))
- ⬇️降级`@types/vscode`到指定版本 ([88be949](https://github.com/2815261401/fastbuild/commit/88be949c572b244164da1b8f064b7461a3356e0d))
- **release:** 🔖0.2.7 ([3766cf9](https://github.com/2815261401/fastbuild/commit/3766cf9b1703926d12c56968b26977521f0ae776))

## 0.2.6 (2025-09-19)

### 🐛 修复 bug

- 🐛修复提交数据获取错误 ([49d8462](https://github.com/2815261401/fastbuild/commit/49d84623791a8e7b5abe987e37c9f3bfdef5e1a3))

### 🔧 其他变更

- ⬆️升级 release-it ([b502149](https://github.com/2815261401/fastbuild/commit/b502149973a8ed0db4ddfc2f6607c3ad78ae9232))
- 📌锁定 vscode 的版本 ([4b9eb53](https://github.com/2815261401/fastbuild/commit/4b9eb5376da04557ab8645db6a6fdf28acbb7a96))
- **release:** 🔖0.2.6 ([fc09a22](https://github.com/2815261401/fastbuild/commit/fc09a227bd8c5b0351fe74daf27d4770c0674c2d))

## 0.2.5 (2025-09-19)

### ✨ 新增功能

- ✨快速命令增强 ，支持按分支或 Commit Hash 进行选择 ([3d35aa2](https://github.com/2815261401/fastbuild/commit/3d35aa2859fa0216c50e626e7def676090c268a0))

### 🐛 修复 bug

- 🐛修复 记忆步骤 默认值读取错误 ([65ea385](https://github.com/2815261401/fastbuild/commit/65ea3857a306d6a5d7cdbfe7587b01835283fad8))
- 🐛修复 release-it 配置 ([3f622d6](https://github.com/2815261401/fastbuild/commit/3f622d6cdaf6a120e28aaeea151ed99885287f6c))

### 🔧 其他变更

- ⬆️升级依赖 ([e2eb9ee](https://github.com/2815261401/fastbuild/commit/e2eb9ee585b19756b4035e71677af845767aa274))
- 👷更新版本控制脚本, 减少语义误导 ([70809a3](https://github.com/2815261401/fastbuild/commit/70809a3bf45abd77b82da7b194b0b68021646d3d))
- 📌锁定 node 版本 ([1b6d258](https://github.com/2815261401/fastbuild/commit/1b6d258bacfe5d1655944ce2732af688736e03a5))
- **release:** 🔖0.2.4 ([0ffb0a9](https://github.com/2815261401/fastbuild/commit/0ffb0a9e66afb8d5172f41ff346cc890cff164c4))
- **release:** 🔖0.2.5 ([b4ef10b](https://github.com/2815261401/fastbuild/commit/b4ef10b7a87885120e83e399a22e33b895f29403))

## 0.2.3 (2025-07-15)

### 🐛 修复 bug

- 🚑️修复不填充作用域导致的返回上一步 ([61b0643](https://github.com/2815261401/fastbuild/commit/61b06435f066a1037783d457044801922cd04dda))

### 🔧 其他变更

- **release:** 🔖0.2.3 ([7bc639a](https://github.com/2815261401/fastbuild/commit/7bc639ab7f024f3a39ce0072f08679ff141a30ee))

## 0.2.2 (2025-07-15)

### 🐛 修复 bug

- 🐛禁止创建重复作用域 ([4db11b1](https://github.com/2815261401/fastbuild/commit/4db11b14519765495938d4a3a8abb01490e076de))
- 🐛修复提交步骤未记忆 ([4342fcc](https://github.com/2815261401/fastbuild/commit/4342fcc2fb2db45fba570db5ac93e5c287343ae7))
- 🐛修复新建作用域返回上一级定位错误 ([887641e](https://github.com/2815261401/fastbuild/commit/887641ec86601dbdb3e239c8eeccbf742bf07cc6))

### 🔧 其他变更

- 🐛修复 .editorconfig 大小写错误 ([e7704bc](https://github.com/2815261401/fastbuild/commit/e7704bcdf9a04f9e67c02fc4e518e03bd824b475))
- **release:** 🔖0.2.2 ([c82ac88](https://github.com/2815261401/fastbuild/commit/c82ac88761b4e8b579eab0dfc5e37838d282679c))

## 0.2.1 (2025-07-14)

### ✨ 新增功能

- ✨添加是否更新 gitmoji 的选项 ([3b23a21](https://github.com/2815261401/fastbuild/commit/3b23a215daf750ceaa5f68705c2e9af0e158410d))

### 🐛 修复 bug

- 🐛修复tsconfig无法读取导致的错误 ([5934dce](https://github.com/2815261401/fastbuild/commit/5934dceccbb113ce44d94f8e2dda19a2ea9c5bf2))

### 🔧 其他变更

- 🔥移除未使用的函数 ([60c4dbc](https://github.com/2815261401/fastbuild/commit/60c4dbce6eb5aedfcfb1be8896efa0f7168416ec))
- **release:** 🔖0.2.1 ([1f081cf](https://github.com/2815261401/fastbuild/commit/1f081cf6883d3ee2c827302fa9ff6b332227760c))

## 0.2.0 (2025-07-14)

### ⚠ 💥 重大变更

- 改变了配置的名称, 之前的配置失效

  分支: alpha

- 改变了配置的名称, 之前的配置失效

  分支: alpha

- 改变了配置的名称, 之前的配置失效

  分支: alpha

### ♻️ 代码重构

- ♻️完成 保存为模板, 使用模板 的重构 ([7195e7d](https://github.com/2815261401/fastbuild/commit/7195e7d248478116b7e139a25e8bfd70d461d016))
- ♻️完成 快速执行命令 的重构 ([eaa7909](https://github.com/2815261401/fastbuild/commit/eaa7909265e4164f7b7a88b06558286478ef03ab))
- ♻️完成 约定式提交 的功能重构 ([6605688](https://github.com/2815261401/fastbuild/commit/66056888b668f8622f64758b922db23bf74c459c))

### 🔧 其他变更

- ⬆️更新依赖 ([1e1bf12](https://github.com/2815261401/fastbuild/commit/1e1bf12a819c4188ba795f2abdb88f4c14f77022))
- **release:** 🔖0.2.0 ([f7b7e5c](https://github.com/2815261401/fastbuild/commit/f7b7e5cf5c89ebef46590c845687718a261a539f))

## 0.1.8 (2025-06-04)

### ✨ 新增功能

- ✨修复自定义参数未聚焦, 支持在编辑器上下文显示命令 ([4cf0666](https://github.com/2815261401/fastbuild/commit/4cf066627de16315653938aa1cae8139b38f3990))

### 🌈 代码格式变更

- 🎨调整代码格式 ([d216f9d](https://github.com/2815261401/fastbuild/commit/d216f9d21c23d13e015b1824d9a74505f17e7181))

### 📦 构建系统变更

- ♻️将 xe-utils 替换为 radashi ([57c5ae9](https://github.com/2815261401/fastbuild/commit/57c5ae9a8cda5ffd1f22c455ab20929a22aef222))

### 🔧 其他变更

- ⬆️更新依赖 ([10e02b0](https://github.com/2815261401/fastbuild/commit/10e02b0feabedf186f563e0f5e0f32972f152247))
- 📝修改插件名称, 订正文档 ([9205f65](https://github.com/2815261401/fastbuild/commit/9205f65e873efcd1c458ba0b5164b01ed6c5567a))
- **release:** 🔖0.1.8 ([0346ab5](https://github.com/2815261401/fastbuild/commit/0346ab529972b7f0a4df2562fd436b845f3c490c))

## 0.1.7 (2025-05-26)

### 🐛 修复 bug

- 🐛修复 => 不是必填项无法继续下一步 ([f46836a](https://github.com/2815261401/fastbuild/commit/f46836a253621ae33d15561c3979a077bac4be9a))

### 🔧 其他变更

- **release:** 🔖0.1.7 ([fb0c68b](https://github.com/2815261401/fastbuild/commit/fb0c68b960a85edf037d272fb722f43794b56061))

## 0.1.6 (2025-05-16)

### ✨ 新增功能

- ✨约定式提交返回上一步保留默认值 ([a280123](https://github.com/2815261401/fastbuild/commit/a28012321362efbf292872f9fba0dd73ab68f6a2))

### 🔧 其他变更

- **release:** 🔖0.1.6 ([b796510](https://github.com/2815261401/fastbuild/commit/b796510a4bbd46f0426a146d5fa58d4205d46509))

## 0.1.5 (2025-05-15)

### ⚠ 💥 重大变更

- 模板正则调整匹配规则

  分支: master

### ✨ 新增功能

- 🐛修复commit格式错误 ([9f15898](https://github.com/2815261401/fastbuild/commit/9f15898391115f0e7d5e2e9be5dc2495f2f58476))

### 🐛 修复 bug

- 🐛修复更新版本导致的打包错误 ([539c6f5](https://github.com/2815261401/fastbuild/commit/539c6f5e02a5a683b4f40b26f90c35e6e0048f87))
- 🐛修复工作区快速命令启动文件夹位置,修复上次使用步骤警告问题,添加快速命令终端上限 ([e8254bc](https://github.com/2815261401/fastbuild/commit/e8254bc1d1e656e97c96ac1abefbe5ee967cfe85))

### ♻️ 代码重构

- 🚨调整eslint配置, 配置文件采用esm格式, 重构模板相关模块 ([b20883f](https://github.com/2815261401/fastbuild/commit/b20883f33e73b139201e6de572ac70bac87df2ec))

### 🔧 其他变更

- ✨使用 release-it 进行版本控制 ([0a1626e](https://github.com/2815261401/fastbuild/commit/0a1626eadd1e47a54d4fdb2a7462db225460d699))
- ⬆️更新依赖 ([633f361](https://github.com/2815261401/fastbuild/commit/633f361b9bb75a42d72844e1ba283ac93ef572c9))
- **release:** 🔖0.1.5 ([45d7731](https://github.com/2815261401/fastbuild/commit/45d77315600c82f49499a8e34d9110b0a67d2aca))

## 0.1.3 (2024-08-09)

### ✨ 新增功能

- ✨重新调整命令 ([c291b0b](https://github.com/2815261401/fastbuild/commit/c291b0b690a72843e953a3beb419a20bc904c486))

### 📦 构建系统变更

- ⬆️更新依赖 ([acd2c5e](https://github.com/2815261401/fastbuild/commit/acd2c5e6792e26cfdf818b3960efc6a57ef2c861))
- 🔧更新eslint,prettier的配置 ([507480e](https://github.com/2815261401/fastbuild/commit/507480eaaadb3bd4c542c0cd18830a41d921d3f7))

### 🔧 其他变更

- 💄通过eslint调整代码格式 ([d0910fa](https://github.com/2815261401/fastbuild/commit/d0910faa8a6d9b3da3cee468688932a8c75dbecd))
- 📝更新CHANGELOG ([f5a9813](https://github.com/2815261401/fastbuild/commit/f5a98134f6892336c6129ff9de5357a058ab032d))
- 🔨新增生成CHANGELOG的命令 ([3d32ee3](https://github.com/2815261401/fastbuild/commit/3d32ee3c4fa8b44dadaee8717e341dece65c64a3))

## 0.1.2 (2024-06-13)

### 🐛 修复 bug

- 🐛修复配置覆盖问题,支持配置默认值 ([b408880](https://github.com/2815261401/fastbuild/commit/b40888065877d5ed402d86a11e64ff51f52dd2d8))

## 0.1.1 (2024-06-13)

### ✨ 新增功能

- ✨新增配置项,支持配置生成的文件位置,文件所在工作区,工作区的模板根据下标进行隔离 ([3993c58](https://github.com/2815261401/fastbuild/commit/3993c58eddfe6d859526ba2563c475694ede35e1))

### 🐛 修复 bug

- 🐛修复关于vscode.git的报错 ([ee39dfd](https://github.com/2815261401/fastbuild/commit/ee39dfd946ad8cca6ba314ded4ec00520eb00c8f))

## 0.1.0 (2024-06-12)

### ⚠ 💥 重大变更

- 更改了模版的实现方式,历史方法不在支持

  分支: master

### ✨ 新增功能

- ✨重新实现模版功能 ([1bc15ec](https://github.com/2815261401/fastbuild/commit/1bc15ec59acbd9940e2e2d77b49438e9dbe730a0))

## 0.0.14 (2024-05-17)

### 🐛 修复 bug

- 🐛修复设置缓存 ([2450977](https://github.com/2815261401/fastbuild/commit/24509772833f3d441cdee909f440a37b5f53bc9f))

## 0.0.13 (2024-05-17)

### ✨ 新增功能

- ✨新增快速执行命令的命令 ([1fad214](https://github.com/2815261401/fastbuild/commit/1fad2145ded1b3e080d3a025cda191d9dae21523))
- 新增cz-customizable提交功能 ([da80ada](https://github.com/2815261401/fastbuild/commit/da80adab67b4e3a4ce70fea4071d64fd9a7c2718))
- 修复读取模板配置文件的错误。 新增创建gitCommit的配置文件。 修复取消提交仍继续执行的bug。 从命令模板移除部分命令。 ([0c59115](https://github.com/2815261401/fastbuild/commit/0c591152df56572155f9f1ab8f0f1d995101ac74))
- 原有功能保持,大部分更改 ([ec70e0c](https://github.com/2815261401/fastbuild/commit/ec70e0cd711849b646dc60c71fe3f596292a69d5))
- 自动添加配置到暂存区 ([ddfc1ae](https://github.com/2815261401/fastbuild/commit/ddfc1ae0448e480a21ca8f97521a6ea2f1abfcba))
- **commit:** :sparkles: 更新commit方式 ([18f1351](https://github.com/2815261401/fastbuild/commit/18f13513c9ceb76d85b888ae68eaa712687097c4))

### 🐛 修复 bug

- 🐛调整获取参数的方法,防止缓存数据 ([701590d](https://github.com/2815261401/fastbuild/commit/701590d876992ce5300da2eeac4a581bd57aeaca))
- 🐛修复表情数据重复请求 ([e8276a8](https://github.com/2815261401/fastbuild/commit/e8276a81e45e4a3a15732d7a8b253d373c2e549c))
- 🐛修复未输入footer不带注脚 ([c8ead3d](https://github.com/2815261401/fastbuild/commit/c8ead3d15279b2066552ff7f790a62830ffcb3fd))
- 🐛修复commitlint.config.cjs文件丢失 ([f3d5475](https://github.com/2815261401/fastbuild/commit/f3d5475d6b45425380e513bc2a1c629a5ba0d8f4))
- 🔥移除无效命令 ([59a732e](https://github.com/2815261401/fastbuild/commit/59a732e0f25b25661139bef226fce7f0f2039f1d))
- 修复读取配置报错的bug ([bff3116](https://github.com/2815261401/fastbuild/commit/bff3116f4e5de1d2d0de9845fe933e8ff45c8399))
- 修复读取配置文件出现的路径错误 ([ba6bea0](https://github.com/2815261401/fastbuild/commit/ba6bea07156f98d3550dcf22a42ae76d34e607c9))
- 修复读取配置文件出现的路径错误 ([b75f853](https://github.com/2815261401/fastbuild/commit/b75f8539bc1267c8ea9a1fcb724d4ec0244db81f))

### 📃 文档变更

- **README:** 💬移除部分描述 ([b23dfec](https://github.com/2815261401/fastbuild/commit/b23dfeccbef0e8335e34f2daabd38e6789f57ebd))

### ♻️ 代码重构

- 逻辑优化,减少重复代码量 ([183a8fc](https://github.com/2815261401/fastbuild/commit/183a8fc7bc55c0b878b5df85ea2b87cb33778859))
