
# KingCola-ICG Official Website

KingCola-ICG 团队官网前端项目，基于 React + Vite 构建，包含首页视觉展示、项目展示、项目详情（Markdown 驱动）、活动页面、发展历程、技能页等内容模块。

## 1. 项目概述

- 项目名称: `kingcola-icg-official-website`
- 技术定位: 高视觉表现的团队官网（含 3D/动效）
- 运行方式: 静态前端站点（可部署到 Nginx、Vercel 等平台）

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
- `/envents` 活动页（沿用历史路径命名）
- `/development` 发展历程
- `/skills` 技能展示
- `*` 404 页面

## 4. 目录结构

```text
.
├─ deploy/                    # Nginx 配置模板
├─ public/                    # 静态公共资源
├─ scripts/
│  └─ compress-dist.mjs       # 构建后生成 .gz/.br 预压缩文件
├─ src/
│  ├─ assets/                 # 图片、3D 模型、Markdown、样式资源
│  ├─ components/             # 通用组件与视觉组件
│  ├─ constants/              # 结构化静态数据（项目、活动、发展等）
│  ├─ hooks/                  # 业务 Hook
│  ├─ pages/                  # 路由页面
│  ├─ App.jsx                 # 路由与全局布局入口
│  └─ main.jsx                # 应用入口
├─ index.html
├─ package.json
├─ vercel.json
└─ vite.config.js
```

## 5. 本地开发

### 5.1 环境要求

- Node.js `>= 18`（建议 LTS）
- npm `>= 9`

### 5.2 安装依赖

```bash
npm install
```

### 5.3 启动开发环境

```bash
npm run dev
```

默认端口来自 `vite.config.js`:

- `PORT` 或 `VITE_DEV_PORT`（默认 `8081`）
- `VITE_DEV_OPEN`（默认 `true`）

### 5.4 本地预览生产构建

```bash
npm run build
npm run serve
```

## 6. 构建说明

### 6.1 构建命令

- `npm run build:raw`: 仅执行 Vite 打包
- `npm run build`: Vite 打包 + 生成 `.gz/.br` 预压缩资源

### 6.2 预压缩机制

`scripts/compress-dist.mjs` 会遍历 `dist/` 下可压缩文件（如 `html/js/css/svg/json/map/wasm`）并生成:

- `*.gz`
- `*.br`

部署时若 Nginx 开启 `gzip_static on;` / `brotli_static on;`，可直接命中预压缩文件，提升传输性能。

## 7. 内容维护指南

## 7.1 项目数据（推荐）

项目列表和详情由 `src/assets/md/projects/*.md` 驱动，解析逻辑在 `src/constants/projectsData.js`。

可直接复制模板文件:

- `src/assets/md/projects/_template.md`

关键 Frontmatter 字段:

- `id`: 路由标识（对应 `/projects/:id`）
- `name`: 项目名称
- `description`: 项目简介
- `techStack`: 技术栈数组
- `keywords`: 关键词/成员标记
- `html_url`: 项目外链
- `order`: 排序权重（越小越靠前）

正文部分使用 Markdown，项目详情页会自动渲染标题、表格、代码块、图片等内容。

## 7.2 活动页内容

编辑 `src/constants/Events.js`:

- `EventsTop`: 顶部轮播
- `programs`: 活动时间线主内容

## 7.3 发展历程

编辑 `src/constants/developmentTimeline.js`，按年份维护团队历史与成果。

## 7.4 博客数据

编辑 `src/constants/Blogs/Articles.js`（当前为静态示例数据）。

## 8. 部署

## 8.1 Nginx 部署

可参考:

- `deploy/nginx.conf`（通用模板）
- `deploy/nginx.www.kingcola-icg.cn.conf`（域名版本示例）

SPA 需要保证:

- `try_files $uri $uri/ /index.html;`

并建议:

- `index.html` 关闭强缓存
- `assets` 使用长缓存 + `immutable`
- 启用 `gzip_static` / `brotli_static`（若模块可用）

## 8.2 Vercel 部署

项目包含 `vercel.json`，已配置 SPA rewrite 到 `/`。

## 8.3 GitHub Actions 自动部署到云服务器

仓库已提供工作流文件:

- `.github/workflows/deploy.yml`

触发方式:

- `push main` 自动触发
- 手动触发 `workflow_dispatch`

需要在 GitHub 仓库 `Settings -> Secrets and variables -> Actions` 中配置:

- `SERVER_HOST`: 云服务器公网 IP 或域名
- `SERVER_PORT`: SSH 端口（如 `22`）
- `SERVER_USER`: SSH 用户（建议专用 deploy 用户）
- `SERVER_SSH_KEY`: 私钥内容（建议 ED25519，需对应服务器公钥）
- `TARGET_DIR`: 站点目录（如 `/var/www/kingcola-icg`）
- `NGINX_RELOAD_COMMAND`（可选）: 如 `sudo systemctl reload nginx`

注意:

- 若你的默认分支不是 `main`，请修改 `deploy.yml` 中的分支名。
- 服务器用户需对 `TARGET_DIR` 有写权限。
- 若使用 `sudo` 重载 Nginx，请确保该用户具备免密 sudo 权限（至少对 reload 命令）。

## 9. 用户体验相关说明（已实现）

- 加载页避免长时间阻塞，弱网下提供兜底与重试
- 首屏内容显示后不重复弹出全屏加载
- 路由切换期间避免页脚闪现，待新页面 ready 后再显示
- 首页部分 3D 展示已做移动端兼容优化

## 10. 常见问题

## 10.1 刷新子路由出现 404

原因: Nginx 未正确配置 SPA 回退。  
处理: 确认已启用 `try_files $uri $uri/ /index.html;`。

## 10.2 新增项目后页面无变化

检查项:

- Markdown 文件是否放在 `src/assets/md/projects/`
- Frontmatter 是否包含有效 `id`
- `order` 是否合理
- 构建缓存是否清理

## 10.3 线上资源版本不一致

确认 `index.html` 禁止缓存，避免旧入口引用新旧哈希混用导致 404。

## 11. 开源与安全建议

- 不要提交真实密钥、证书、私钥、账号密码
- Nginx 示例建议使用占位域名与占位路径
- 提交前检查 `.env` 是否包含敏感信息

## 12. 贡献建议

- 提交前先本地运行 `npm run dev` 与 `npm run build`
- PR 描述建议包含: 改动范围、影响页面、验证方式、截图（如涉及 UI）
