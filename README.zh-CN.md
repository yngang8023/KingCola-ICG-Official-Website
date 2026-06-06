<div align="right">
  <a href="./README.md">English</a> | <a href="./README.zh-CN.md">简体中文</a>
</div>

# KingCola-ICG Official Website

KingCola-ICG 团队官网前端项目，基于 React + Vite 构建，包含首页视觉展示、项目展示、项目详情、活动页面、发展历程与技能展示等内容模块。

<table align="center">
  <tr>
    <td align="center"><strong>Vercel</strong></td>
    <td align="center"><strong>EdgeOne Pages 国际版</strong></td>
    <td align="center"><strong>EdgeOne Pages 国内版</strong></td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyngang8023%2FKingCola-ICG-Official-Website&project-name=kingcola-icg-official-website&repository-name=KingCola-ICG-Official-Website&root-directory=.&build-command=npm%20run%20build&output-directory=dist">
        <img src="https://vercel.com/button" alt="Deploy with Vercel" />
      </a>
    </td>
    <td align="center">
      <a href="https://edgeone.ai/pages/new?repository-url=https%3A%2F%2Fgithub.com%2Fyngang8023%2FKingCola-ICG-Official-Website&project-name=kingcola-icg-official-website&build-command=npm%20run%20build&install-command=npm%20install&output-directory=dist&root-directory=.">
        <img src="https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg" alt="Deploy with EdgeOne Pages Global" height="32" />
      </a>
    </td>
    <td align="center">
      <a href="https://console.cloud.tencent.com/edgeone/pages/new?repository-url=https%3A%2F%2Fgithub.com%2Fyngang8023%2FKingCola-ICG-Official-Website&project-name=kingcola-icg-official-website&build-command=npm%20run%20build&install-command=npm%20install&output-directory=dist&root-directory=.">
        <img src="https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg" alt="Deploy with EdgeOne Pages China Mainland" height="32" />
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <img alt="React 18" src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=061a23" />
  <img alt="Vite 6" src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff" />
  <img alt="React Router 6" src="https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=ffffff" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=ffffff" />
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer_Motion-Animation-0055FF?style=for-the-badge&logo=framer&logoColor=ffffff" />
  <img alt="Three.js" src="https://img.shields.io/badge/Three.js-3D-111111?style=for-the-badge&logo=threedotjs&logoColor=ffffff" />
  <img alt="Markdown" src="https://img.shields.io/badge/Markdown-Content-000000?style=for-the-badge&logo=markdown&logoColor=ffffff" />
  <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub_Pages-Auto_Deploy-222222?style=for-the-badge&logo=githubpages&logoColor=ffffff" />
</p>

## 1. 项目概述

- 项目名称: `kingcola-icg-official-website`
- 技术定位: 高视觉表现的团队官网，包含 3D 与动效内容
- 运行方式: 静态前端站点，当前适配 GitHub Pages、EdgeOne Pages、Nginx 与 Vercel

## 项目预览

### 首页首屏

![KingCola-ICG 首页首屏](docs/img/1.png)

### 首页内容区

![KingCola-ICG 首页内容展示](docs/img/2.png)

### 页脚与整体氛围

![KingCola-ICG 页脚与底部展示](docs/img/3.png)

## 2. 技术栈

- `React 18`
- `Vite 6`
- `React Router DOM 6`
- `Tailwind CSS`
- `Framer Motion`
- `@react-three/fiber` + `@react-three/drei` + `three`
- `React Markdown` + `remark-gfm`

## 3. 页面路由

当前路由定义位于 `src/App.jsx`:

- `/` 首页
- `/projects` 项目列表
- `/projects/:id` 项目详情
- `/envents` 活动页
- `/development` 发展历程
- `/skills` 技能展示
- `*` 404 页面

## 4. 目录结构

```text
.
├─ docs/
│  └─ img/                   # README 预览图与说明文档配图
├─ deploy/                   # Nginx 配置模板
├─ public/                   # 静态公共资源
├─ scripts/
│  └─ compress-dist.mjs      # 构建后生成 .gz/.br 预压缩资源
├─ src/
│  ├─ assets/                # 图片、3D 模型、Markdown、样式资源
│  ├─ components/            # 通用组件与视觉组件
│  ├─ constants/             # 结构化静态数据
│  ├─ hooks/                 # 业务 Hook
│  ├─ pages/                 # 路由页面
│  ├─ App.jsx                # 路由与全局布局入口
│  └─ main.jsx               # 应用入口
├─ index.html
├─ package.json
├─ README.en.md
├─ README.zh-CN.md
├─ vercel.json
└─ vite.config.js
```

## 5. 本地开发

### 5.1 环境要求

- Node.js `>= 18`
- npm `>= 9`

### 5.2 安装依赖

```bash
npm install
```

### 5.3 启动开发环境

```bash
npm run dev
```

开发端口来自 `vite.config.js`:

- `PORT` 或 `VITE_DEV_PORT`，默认 `8081`
- `VITE_DEV_OPEN`，默认 `true`

### 5.4 本地预览生产构建

```bash
npm run build
npm run serve
```

## 6. 构建说明

### 6.1 构建命令

- `npm run build:raw`: 仅执行 Vite 打包
- `npm run build`: Vite 打包并生成预压缩资源

### 6.2 预压缩机制

`scripts/compress-dist.mjs` 会扫描 `dist/` 并生成:

- `*.gz`
- `*.br`

若 Nginx 配置了 `gzip_static on;` 与 `brotli_static on;`，可直接命中这些文件以提升传输性能。

## 7. 内容维护指南

### 7.1 项目内容

项目列表和详情由 `src/assets/md/projects/*.md` 驱动，解析逻辑位于 `src/constants/projectsData.js`。

模板文件:

- `src/assets/md/projects/_template.md`

关键 Frontmatter 字段:

- `id`: 对应 `/projects/:id` 的路由标识
- `name`: 项目名称
- `description`: 项目简介
- `techStack`: 技术栈数组
- `keywords`: 关键词与成员标记
- `order`: 排序权重，值越小越靠前

Markdown 正文会自动渲染到项目详情页。

### 7.2 活动页内容

编辑 `src/constants/Events.js`:

- `EventsTop`: 顶部轮播
- `programs`: 活动时间线与主内容

### 7.3 发展历程

编辑 `src/constants/developmentTimeline.js`。

### 7.4 博客数据

编辑 `src/constants/Blogs/Articles.js`。

## 8. 部署

### 一键部署

- 部署到 Vercel：点击上方按钮后，会进入 Vercel 官方创建项目流程，并自动带入当前仓库地址
- 部署到 EdgeOne Pages 国际版：点击对应按钮后，会进入 EdgeOne Pages 国际站官方导入流程，并自动带入当前仓库地址与构建参数
- 部署到 EdgeOne Pages 国内版：点击对应按钮后，会进入腾讯云中国站官方导入流程，并自动带入当前仓库地址与构建参数

当前仓库默认部署参数:

- 安装命令: `npm install`
- 构建命令: `npm run build`
- 输出目录: `dist`
- EdgeOne Pages Node.js 版本: `20.18.0`，已在 `edgeone.json` 中声明

### 8.1 GitHub Pages 自动部署

仓库已内置 GitHub Pages 工作流:

- `.github/workflows/deploy.yml`

触发方式:

- `push main` 自动触发
- 手动触发 `workflow_dispatch`

工作流会自动完成:

- 安装依赖
- 执行 `npm run build:raw`
- 上传 `dist/` 为 Pages Artifact
- 发布到 GitHub Pages

使用要求:

- 在 GitHub 仓库 `Settings -> Pages` 中启用 `GitHub Actions`
- 如果默认分支不是 `main`，请同步修改 `.github/workflows/deploy.yml` 中的分支名

说明:

- 当前工作流不再依赖云服务器、SSH 私钥或远程目录配置
- 部署鉴权由 GitHub 官方 Pages Actions 自动处理

### 8.2 EdgeOne Pages 部署

当前站点也可直接部署到 `EdgeOne Pages`，适合静态托管、全球 CDN 加速与边缘分发。

建议配置:

- 构建命令: `npm run build`
- 安装命令: `npm install`
- 输出目录: `dist`
- 路由回退: 所有子路由回退到 `/index.html`

仓库中已补充:

- `edgeone.json`，用于约定 EdgeOne Pages 默认构建配置
- 已预填参数的国际版一键部署按钮，便于直接导入当前仓库
- 基于腾讯云官方部署按钮文档补充的国内版一键部署按钮，便于直接导入当前仓库

### 8.3 Nginx 部署

可参考:

- `deploy/nginx.conf` 通用模板
- `deploy/nginx.www.kingcola-icg.cn.conf` 域名示例模板

SPA 需保证:

- `try_files $uri $uri/ /index.html;`

缓存建议:

- `index.html` 不做强缓存
- 哈希资源使用长缓存与 `immutable`
- 可用时开启 `gzip_static` 与 `brotli_static`

### 8.4 Vercel 部署

项目保留了 `vercel.json`，并已配置 SPA rewrite。

仓库中已补充:

- 已预填参数的一键部署按钮，可直接跳转到 Vercel 导入当前仓库
- 与静态前端部署方式兼容的默认输出配置

## 9. 用户体验说明

- 加载态针对弱网场景提供超时提示、重试与返回首页兜底
- 首屏进入与 tab 切换阶段均采用全屏加载过渡，减少割裂感
- 路由切换期间统一隐藏导航与页脚，待页面完全 ready 后再整体显示
- 首页 3D 展示已做移动端兼容优化

## 10. 常见问题

### 10.1 刷新子路由出现 404

原因: 宿主环境未正确配置 SPA 回退。  
处理: 确认已启用 `try_files $uri $uri/ /index.html;` 或等价 rewrite 规则。

### 10.2 新增项目后页面无变化

检查项:

- Markdown 文件是否位于 `src/assets/md/projects/`
- Frontmatter 中 `id` 是否有效
- `order` 是否设置正确
- 构建缓存或 CDN 缓存是否已刷新

### 10.3 线上资源版本不一致

确认 `index.html` 未被强缓存，避免旧入口引用新旧哈希资源混用。

## 11. 开源与安全建议

- 不要提交真实密钥、证书、私钥、账号密码
- 对外展示的 Nginx 示例建议使用占位域名与路径
- 提交前检查 `.env` 是否含敏感信息

## 12. 贡献建议

建议先阅读完整贡献说明:

- [CONTRIBUTING.md](./CONTRIBUTING.md)

推荐协作规范:

- 从 `main` 拉取新分支开发
- 一个 PR 只处理一个主题，避免把无关修改混在一起
- 提交前至少运行 `npm run dev` 与 `npm run build`
- 如果改动影响页面展示，请附上截图或录屏
- 如果改动涉及 `.github/workflows`、`public`、路由、资源路径或部署配置，请在 PR 中明确说明影响范围

推荐分支命名:

- `feat/<简短说明>`
- `fix/<简短说明>`
- `docs/<简短说明>`
- `refactor/<简短说明>`

PR 描述建议包含:

- 改了什么
- 为什么要改
- 影响了哪些页面或模块
- 本地做了哪些验证
- UI 改动对应的截图或录屏
- 已知风险、后续待办或限制说明
