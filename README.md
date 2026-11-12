# Jekyll 技术博客（GitHub Pages 自定义主题）

一套对齐参考图风格的 Jekyll 博客：深蓝灰背景、顶部导航、首页 3 列分类卡片（emoji 图标 + 金棕标题 + 描述 + 自动统计文章数）。
**日常只需要往 `_posts/` 目录上传 Markdown 文件，推送到 GitHub 后由 Actions 自动构建成静态网页，无需本地打包。**

---

## 一、目录结构

```
jekyll-blog/
├── _config.yml              # 站点信息、导航、首页分类卡片配置
├── Gemfile                  # Jekyll 与插件依赖
├── index.html               # 首页（分类卡片网格，文章数自动统计）
├── _layouts/                # 页面骨架：default / post / page / category
│   ├── default.html
│   ├── post.html            # 文章页
│   ├── page.html            # 普通页面（about/life/cv）
│   └── category.html        # 分类文章列表页
├── _includes/               # 可复用片段：head / header / footer
├── assets/
│   ├── css/style.css        # 全站样式（配色、卡片、代码高亮）
│   └── img/                 # 文章图片放这里
├── _posts/                  # ★ 你写的 Markdown 文章都放这里
├── categories/              # 每个分类一个列表页（新增分类时同步加）
├── about.md / blog.md / life.md / cv.md
├── .github/workflows/jekyll.yml   # 推送后自动构建部署
└── README.md
```

---

## 二、一次性上线步骤

### 1. 新建 GitHub 仓库

- 登录 GitHub，New repository。
- 仓库名必须取 **`你的用户名.github.io`**（例如 `wangxiaolei12.github.io`），这样访问地址就是 `https://你的用户名.github.io/`。
  - 若用普通仓库名（如 `blog`），需要在 `_config.yml` 里把 `baseurl` 改成 `/blog`。
- 设为 **Public**，不要初始化 README。

### 2. 把本目录内容推上去

```bash
cd jekyll-blog
git init
git add .
git commit -m "init jekyll blog"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

### 3. 开启 GitHub Pages（用 Actions 构建）

1. 进入仓库 **Settings → Pages**。
2. **Build and deployment → Source** 选择 **GitHub Actions**（不要选 Deploy from a branch）。
3. 推送后 Actions 标签页会自动跑 `Deploy Jekyll site to Pages`，绿色完成后即可访问 `https://你的用户名.github.io/`。

### 4. 修改站点信息

编辑 `_config.yml`：

```yaml
title: "你的博客名"
tagline: "一句话副标题"
author: "你的名字"
url: "https://你的用户名.github.io"
```

改完推送，Actions 重新构建即生效。

---

## 三、日常写文章（只上传 Markdown）

### 1. 新建文章文件

文件放在 `_posts/`，命名格式固定为 **`YYYY-MM-DD-英文标题-slug.md`**：

```
_posts/2026-11-12-kernel-module-basics.md
```

### 2. 文件开头写 Front Matter（必填）

```markdown
---
title: "内核模块基础：编写与加载"
date: 2026-11-12
category: system-internals      # 必须与 _config.yml 里某个卡片 slug 一致
tags: [Linux, kernel, module]
description: "模块的编译、加载、卸载与常用接口。"
---

正文从这里开始，标准 Markdown 语法……
```

字段说明：

| 字段 | 是否必填 | 说明 |
| --- | --- | --- |
| `title` | 必填 | 文章标题，显示在文章页和列表 |
| `date` | 必填 | `YYYY-MM-DD`，决定排序与文件名解析 |
| `category` | 必填 | 对应首页卡片的 `slug`，用于归类和计数 |
| `tags` | 可选 | 标签数组 |
| `description` | 可选 | 摘要 / SEO 描述 |

> `category` 可选项就是 `_config.yml → category_cards` 里的 `slug`：
> `camera-media`、`system-internals`、`drm-gpu`、`arm-arch`、`mm`、`network`、`scheduler`、`userspace-tools`、`interview`。

### 3. 支持的 Markdown 元素

- 标题 `##` / `###`、列表、表格、引用块 `>`
- 代码块：```` ```c ````、```` ```asm ````、```` ```bash ````，Rouge 高亮
- 图片：把图片放 `assets/img/`，正文用 `![描述](/assets/img/xxx.png)`
- 公式 / Mermaid 可按需在 `_config.yml` 与布局中扩展

### 4. 上传方式（二选一）

- **网页端**：仓库 `_posts/` 目录 → Add file → Create new file，粘贴内容，Commit。
- **本地**：写好后 `git add _posts/新文章.md && git commit && git push`。

推送后 1~3 分钟，首页对应卡片的"X 篇文章"和分类列表自动更新。

---

## 四、新增 / 修改分类卡片

首页卡片完全由 `_config.yml → category_cards` 驱动。

### 修改已有卡片
直接改对应项的 `icon` / `title` / `desc`。

### 新增一个分类
1. 在 `category_cards` 里追加一项：

```yaml
- slug: usb
  icon: "🔌"
  title: "USB"
  desc: "USB 主机/设备驱动、gadget、枚举与传输类型"
```

2. 在 `categories/` 目录新建 `usb.md`：

```markdown
---
layout: category
title: usb
cat_slug: usb
permalink: /categories/usb/
---
```

3. 之后文章 `category: usb` 即可归入该卡片。

---

## 五、本地预览（可选，非必须）

线上由 Actions 构建；想在本地先看效果：

```bash
# 安装依赖（需 Ruby 3.x）
bundle install

# 启动本地服务，默认 http://127.0.0.1:4000/
bundle exec jekyll serve

# 改代码后浏览器自动刷新；--livereload 可加实时刷新
```

> 本地若 `github-pages` 安装慢或版本冲突，可在 `Gemfile` 改用 `gem "jekyll"` 并保留插件组，线上 Actions 用的是独立 Ruby 环境，不受影响。

---

## 六、常见问题

**Q：推送后首页文章数没变？**
确认文章文件名日期格式正确、`category` 拼写与卡片 `slug` 完全一致，并检查 Actions 是否绿色成功。

**Q：文章 404？**
检查 `_posts` 文件名是否为 `YYYY-MM-DD-xxx.md`；`permalink` 默认 `/posts/:title/`。

**Q：图片不显示？**
用绝对路径 `/assets/img/xxx.png`；若 `baseurl` 非空，写成 `{{ '/assets/img/xxx.png' | relative_url }}`。

**Q：想换深色/浅色配色？**
改 `assets/css/style.css` 顶部 `:root` 里的颜色变量即可。

**Q：不想用 Actions，想用分支直接发布？**
仓库 Settings → Pages → Source 选 `Deploy from a branch`，并在本地 `bundle exec jekyll build` 后把 `_site` 内容推到 `gh-pages` 分支；但本项目默认走 Actions，最省心。
