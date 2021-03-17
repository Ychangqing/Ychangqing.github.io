---
title: 组件库规范
date: 2020-03-01
categories: [组件库]
---





目录：

[TOC]





## UI设计规范

- 支持Less
- 自有主题覆盖antd默认主题  优先级最高
- 每个组件可以自定义样式   优先级比较低
- UI设计规范：https://docs.zenlayer.net/pages/viewpage.action?pageId=6820012
- 所有样式变量请参考colors.less，不得随意修改变量
- [主题切换](https://zhuanlan.zhihu.com/p/32422584),色值计算





## 代码规范

> 组件问题记录、进度追踪全部依赖 **jira**

- 基础语言选择 `React` `TS`
- ESLint 参考 `.eslintrc.js`



#### 组件负责人工作内容

组件负责人需要在每个sprint周期内负责以下工作：

- **及时进行 PR Reveiew 的分配和合并操作**。（不要合并 `In Progress` `WIP` 的 PR）
- 定位、分配、跟踪需要解决的 jira。
- 关闭已解决或无法解决的 jira。
- 按时进行新版本发布。



#### 组件测试

> 使用jest，每个组件都需要写测试用例

每次发布前，都会使用Jenkins脚本配置，测试全部覆盖并且通过了以后，才允许自动构建



## 组件开发、版本发布流程

> 组件仓库，master分支只能由负责人合并代码，严格遵守组件合并、升级策略
>
> 每个研发人员需要fork一份代码到本地，不能将本地分支合并到主仓库，确保主仓库所有的分支都是可控的

##### 1. Sprint开始

- 创建Jira任务，调整优先级，分配相应开发人员
- 创建Jira任务时，应尽量描述问题出现在哪里，如何复现，最好带上链接，或者[codesandbox](https://codesandbox.io/s/czsfy?file=/index.js)例子，方便开人员定位
- 研发人员领取对应Jira任务后，统一从`master`分支拉代码，开发时在自己本地的仓库开发

##### 2. 代码提交

- 首先研发人员将自己的代码提交到自己的`master`分支上，确保CI全部通过
- 然后提交PR到主仓库`feature`分支
- 负责人进行**PR Reveiew** 后，才可以合并代码到主仓库的`feature`分支

##### 3.版本发布（依赖lerna）

> 后期可能要写一个自动生成、编辑CHANGELOG的页面，自动抓取PR提交记录

- 确认本Sprint分配的Jira任务完成情况和代码是否合并
- 确认各项 CI 和检查是绿的。
- 归纳整理本次开发的改动，将有价值的改动如实填写，无感知的改动建议（文档修补、微小的样式优化、代码风格重构等等）不要提及，保持 CHANGELOG 的内容有效性。
- CHANGELOG中要带有本次 PR 的链接，方便问题回溯
- 代码全部检查完毕、CHANGELOG填写完毕后，合并`feature`到`master`，Jenkins触发自动构建，更新文档
- 手动执行 `npm run pub` 发布新的版本

> 版本发布相关问题：
>
> 如何保证所有项目的组件版本，我觉得应该后端配合，做一个项目管理，配置每个项目的组件版本
>
> 所有的前端项目在客户端加载的时候，请求获取当前项目的组件版本的接口，根据版本号动态的将js文件加载进来
>
> 1.0/min.js



## 构建

- 组件和文档分别打包

- 一次build，支持三种打包模式：umd、es、commonJS

- > **es6：**
  >
  > - 导出：export ...
  > - 导入：import {} from './es.js'
  >
  > 
  >
  > **commenJS:**
  >
  > - 导出：module.exports.fun
  > - 导入：require('./commen.js')
  >
  > 
  >
  > 参考：https://segmentfault.com/a/1190000006232697

- 支持lib包，只编译，不打包，为了支持项目中可以按需加载

- 支持npm link tool 开发调试



## 生态

- 表单可视化工具
- oss-cli项目管理
- 模版及字段管理平台
- [codesandbox](https://codesandbox.io/s/czsfy) 组件在线编译器



## 项目文件概要

---

```
├── components    # react 源码和示例、测试代码
├── docs          # 文档
├── scripts       # 一些部署、发布、打包相关脚本
├── site          # 组件文档
└── package.json
```