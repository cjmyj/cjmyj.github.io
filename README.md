# Linux Kernel Notes - GitHub Pages 博客模板

一个不依赖 Chirpy 主题源码的独立 Jekyll 博客：深色首页、分类卡片、文章列表、Markdown 自动发布。

## 0. 重要：先检查仓库

- 建议先备份现有 `cjmjy.github.io` 仓库，尤其是 `_posts` 和自定义域名 `CNAME`。
- 本模板是**替代**之前 Chirpy 开发仓库配置的独立站点。不要把旧的 `Gemfile`、`.gemspec`、`_config.yml` 或旧的 Actions 工作流混用。
- 目标仓库名应为 `cjmjy.github.io`，默认分支为 `main`。若用户名不同，修改 `_config.yml` 的 `url`。
- 上传时必须把本压缩包内的文件放在**仓库根目录**，不能多套一层 `kernel-blog-starter/` 文件夹。

## 1. Windows + Git Bash：最小安装

只需要 **Git for Windows**（含 Git Bash）、浏览器、GitHub 账号。GitHub Actions 云端自动安装 Ruby、Bundler、Jekyll 依赖；**不需要在 Windows 安装 Ruby、Bundler、Jekyll、Node.js 或 Meson**。

1. 下载 Git for Windows：https://git-scm.com/downloads/win
2. 打开 Git Bash：`git --version`
3. 在 GitHub 创建或使用 `cjmjy.github.io` 仓库，设置默认分支 `main`。
4. 将本压缩包**内部内容**解压至本地仓库根目录。
5. 如原仓库包含 Chirpy 工作流，请移除旧的 `.github/workflows/*.yml`，仅保留 `deploy.yml`（注意不要误删其他自己需要的工作流）。
6. 执行：

```bash
git add -A
git commit -m "Initialize Jekyll kernel blog"
git push origin main
```

7. GitHub 仓库 `Settings -> Pages -> Build and deployment -> Source` 选择 **GitHub Actions**。
8. 到 `Actions -> Deploy Jekyll Blog` 查看 build 和 deploy 是否都成功。随后访问 https://cjmjy.github.io/ 。

**注意**：GitHub Actions 的 RubyGems 下载需要网络；若账号或仓库的 Actions/Pages 权限受限，需要先在仓库设置中开启。

## 2. 以后只上传 Markdown

在 `_posts/` 新建文件，名称必须为 `YYYY-MM-DD-slug.md`，例如 `_posts/2026-11-12-iommu.md`：

```markdown
---
layout: post
title: "IOMMU 驱动学习"
date: 2026-11-12 12:00:00 +0800
categories: [ARM-SMMU]
tags: [Linux, IOMMU]
---

# IOMMU 驱动学习

正文内容。
```

然后：

```bash
git add _posts/
git commit -m "Add IOMMU post"
git push origin main
```

Actions 自动生成 HTML 和分类统计。`categories` 的第一个值决定首页分类卡片，分类名称建议统一。未来日期的文章可能默认不发布。

## 3. 可选：Windows 本地预览

如果需要离线写作时本地预览，安装 RubyInstaller+Devkit：https://rubyinstaller.org/downloads/ ，安装 MSYS2 组件后重新打开 Git Bash：

```bash
ruby -v
gem install bundler
bundle -v
bundle install
bundle exec jekyll serve --livereload
```

浏览器访问 http://127.0.0.1:4000/ 。Windows 上 Ruby 原生依赖安装可能需要 Devkit/MSYS2；如果不需要本地预览，完全可以跳过。项目没有预置 `Gemfile.lock`，GitHub Actions 的 `ruby/setup-ruby` 会安装依赖并在云端解析版本；若需固定版本，推荐在 Linux 环境生成锁文件并提交。

## 4. 文件说明

- `_config.yml`：站点标题、URL、插件、文章路径
- `Gemfile`：Jekyll 和插件依赖
- `.github/workflows/deploy.yml`：GitHub Actions 自动构建、发布
- `_posts/`：Markdown 文章（未来主要维护这个目录）
- `_layouts/`：页面模板
- `index.html`：分类卡片首页，自动统计文章数
- `blog.html`：全部文章
- `categories.html` + `assets/js/categories.js`：分类过滤
- `assets/css/style.css`：深色样式

## 5. 常见问题

- 404：检查仓库名、默认分支、Pages Source、Actions deploy 是否成功。
- 依赖失败：检查是否混用了旧 Chirpy 的 `Gemfile.lock`、`.gemspec` 或旧工作流。
- 样式丢失：用户主页仓库 `baseurl` 应为 `""`；`url` 与仓库地址对应。
- Markdown 不显示：检查文件名、YAML Front Matter、日期是否在未来。
- 首页没有分类：需要至少一篇有效的 `_posts` 文章，并填写 `categories`。
