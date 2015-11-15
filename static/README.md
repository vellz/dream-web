## 样式说明

  /base 目录：     包含通用级样式（重置、UI）

  /modules 目录：  包含模块样式（模块的子模块样式命名规则 "_模块-子模块.scss"；只有一个层级的文件为通用模块，如：_header.scss）

  /utils 目录：    包含各种mixins和function（mixins 通过_minxins.scss 统一输出）


  页面入口样式文件在style根目录下，import顺序：
  1. 全站通用样式
  2. 所需UI组件
  3. 所需页面模块


## 模板说明

  /根目录： 全站首页、404页面等

  /模块名： 某个模块关联页面目录

  /partials: 所有页面子模块（命名规则同样式modules, 不需要前缀下划线）


