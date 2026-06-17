# 快速工具

## 快速执行命令

- `$path` 右击的文件(夹)路径
- `$file` 右击的文件路径，只对文件生效
- `$dir` 右击的文件夹路径，如果是文件，则会使用文件所在的文件夹路径
- `$custom` 自定义参数，通过输入框输入参数
- `$custom<text>` 自定义参数，`text`为默认值
- `$branch` 分支名称，选择当前仓库的分支名称
- `$branch<text>` 分支名称，`text`为默认值
- `$commit` 提交哈希，选择当前仓库的提交哈希

## 约定式提交

- `header` 提交头，格式为 `type(scope): subject`
  - 必填（不能为空）
  - 无法换行
  - 当`type`可选择时，无法自定义提交头
- `type` 提交类型，优先读取`commitlint.config`文件中的类型，否则使用默认值
  - `feat`
  - `fix`
  - `docs`
  - `style`
  - `refactor`
  - `perf`
  - `test`
  - `build`
  - `ci`
  - `chore`
  - `revert`
- `scope` 提交范围，可自定义
- `gitmoji` 主题图标
- `subject` 提交主题
  - 必填（不能为空）
  - 无法换行
- `body` 提交描述
  - 非必填（可为空）
  - 可换行
- `footer` 提交脚注
  - 非必填（可为空）
  - 可换行
- `breaking` 重大变更
  - 非必填（可为空）
  - 可换行
- `issues` 问题
  - 非必填（可为空）
  - 无法换行
