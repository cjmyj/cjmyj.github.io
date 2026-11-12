(() => {
  const name = new URLSearchParams(window.location.search).get('name');
  const posts = JSON.parse(document.getElementById('posts-data').textContent);
  document.getElementById('category-title').textContent = name || '全部分类';
  const list = document.getElementById('article-list');
  const matches = posts.filter(p => !name || p.categories.includes(name));
  if (!matches.length) {
    list.textContent = '该分类暂无文章。';
    return;
  }
  for (const post of matches) {
    const item = document.createElement('div');
    item.className = 'post-item';
    const a = document.createElement('a');
    a.href = post.url;
    a.textContent = post.title;
    const time = document.createElement('time');
    time.textContent = post.date;
    item.append(a, time);
    list.appendChild(item);
  }
})();
