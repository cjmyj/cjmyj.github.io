---
layout: page
title: Blog
permalink: /blog/
---

<section class="hero">
  <h1 class="hero-title">All Posts</h1>
  <p class="hero-tagline"><em>全部文章，按时间倒序</em></p>
</section>

<ul class="post-list">
  {% for post in paginator.posts %}
    <li class="post-item">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

{% if paginator.total_pages > 1 %}
<nav class="pagination">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path | relative_url }}">← 上一页</a>
  {% endif %}
  <span>{{ paginator.page }} / {{ paginator.total_pages }}</span>
  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path | relative_url }}">下一页 →</a>
  {% endif %}
</nav>
{% endif %}
