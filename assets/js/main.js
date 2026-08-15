document.addEventListener('DOMContentLoaded', () => {
  // ===== Tema întunecată / luminoasă =====
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    updateThemeIcon(savedTheme);
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }

  // ===== Detectare pagină =====
  const isHome = document.getElementById('posts-container');
  const isPost = document.getElementById('post-content');
  const isArchive = document.getElementById('archive-posts');

  if (isHome) {
    renderFilters();
    renderPosts(sortPostsByDate(POSTS));
    setupSearch();
  }

  if (isPost) {
    renderPostPage();
  }

  if (isArchive) {
    renderArchive();
  }
});

/* ===== Funcții utilitare ===== */
function sortPostsByDate(posts) {
  return [...posts].sort((a, b) => new Date(b.data) - new Date(a.data));
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getCategories() {
  return [...new Set(POSTS.map(p => p.categorie))];
}

/* ===== Carduri ===== */
function createCard(post) {
  const cover = post.cover
    ? `<img src="${post.cover}" alt="${post.titlu}" class="card-cover" loading="lazy">`
    : `<div class="card-cover placeholder">⚗️</div>`;
  const tags = post.taguri.map(t => `<span class="tag">#${t}</span>`).join('');
  return `
    <article class="card">
      <a href="post.html?slug=${post.slug}" class="card-link">
        ${cover}
        <div class="card-body">
          <span class="card-category">${post.categorie}</span>
          <h2 class="card-title">${post.titlu}</h2>
          <p class="card-date">${formatDate(post.data)}</p>
          <p class="card-excerpt">${post.extras}</p>
          <div class="card-tags">${tags}</div>
        </div>
      </a>
    </article>
  `;
}

function renderPosts(posts) {
  const container = document.getElementById('posts-container');
  if (!container) return;
  if (posts.length === 0) {
    container.innerHTML = '<p class="no-results">Nicio postare găsită.</p>';
    return;
  }
  container.innerHTML = posts.map(post => createCard(post)).join('');
}

/* ===== Filtre și căutare pe pagina principală ===== */
function renderFilters() {
  const container = document.getElementById('filter-buttons');
  const categories = getCategories();
  let html = '<button class="filter-btn active" data-category="toate">Toate</button>';
  categories.forEach(cat => {
    html += `<button class="filter-btn" data-category="${cat}">${cat}</button>`;
  });
  container.innerHTML = html;
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterPosts();
    });
  });
}

function filterPosts() {
  const activeCat = document.querySelector('.filter-btn.active')?.dataset.category || 'toate';
  const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
  let filtered = sortPostsByDate(POSTS);
  if (activeCat !== 'toate') {
    filtered = filtered.filter(p => p.categorie === activeCat);
  }
  if (searchTerm) {
    filtered = filtered.filter(p =>
      p.titlu.toLowerCase().includes(searchTerm) ||
      p.extras.toLowerCase().includes(searchTerm) ||
      p.taguri.some(t => t.toLowerCase().includes(searchTerm))
    );
  }
  renderPosts(filtered);
}

function setupSearch() {
  const input = document.getElementById('search-input');
  if (input) input.addEventListener('input', filterPosts);
}

/* ===== Pagina individuală de postare ===== */
function getSlugFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug');
}

function renderPostPage() {
  const slug = getSlugFromURL();
  const post = POSTS.find(p => p.slug === slug);
  const container = document.getElementById('post-content');
  if (!post) {
    container.innerHTML = '<p>Postarea nu a fost găsită.</p>';
    return;
  }
  document.title = post.titlu + ' | ChimieBlog';

  // Avertismente de siguranță (dacă există)
  let warningsHtml = '';
  if (post.avertismente && post.avertismente.length > 0) {
    warningsHtml = '<div class="warnings-container">' +
      post.avertismente.map(w =>
        `<div class="avertisment"><strong>🔥 Avertisment:</strong> ${w}</div>`
      ).join('') + '</div>';
  }

  const cover = post.cover
    ? `<img src="${post.cover}" alt="${post.titlu}" class="post-cover">`
    : '';
  const tags = post.taguri.map(t => `<span class="tag">#${t}</span>`).join('');

  container.innerHTML = `
    <header class="post-header">
      <span class="card-category">${post.categorie}</span>
      <h1>${post.titlu}</h1>
      <p class="post-date">${formatDate(post.data)}</p>
      <div class="post-tags">${tags}</div>
      ${cover}
    </header>
    ${warningsHtml}
    <div class="post-body">
      ${post.continut}
    </div>
  `;

  // Navigare Previous/Next în aceeași categorie
  const sameCat = sortPostsByDate(POSTS.filter(p => p.categorie === post.categorie));
  const currentIndex = sameCat.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? sameCat[currentIndex - 1] : null;
  const nextPost = currentIndex < sameCat.length - 1 ? sameCat[currentIndex + 1] : null;

  const prevLink = document.getElementById('prev-post');
  const nextLink = document.getElementById('next-post');

  if (prevPost) {
    prevLink.href = `post.html?slug=${prevPost.slug}`;
    prevLink.textContent = `← ${prevPost.titlu}`;
  } else {
    prevLink.style.visibility = 'hidden';
  }

  if (nextPost) {
    nextLink.href = `post.html?slug=${nextPost.slug}`;
    nextLink.textContent = `${nextPost.titlu} →`;
  } else {
    nextLink.style.visibility = 'hidden';
  }

  setupShare(post);
}

/* ===== Buton share ===== */
function setupShare(post) {
  const btn = document.getElementById('share-btn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const url = window.location.href;
    const shareData = {
      title: post.titlu,
      text: post.extras,
      url: url
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // utilizatorul a anulat
      }
    } else {
      navigator.clipboard.writeText(url).then(() => {
        btn.textContent = '✅ Link copiat!';
        setTimeout(() => { btn.textContent = '🔗 Distribuie'; }, 2000);
      });
    }
  });
}

/* ===== Pagina de arhivă ===== */
function renderArchive() {
  const params = new URLSearchParams(window.location.search);
  const categorie = params.get('categorie');
  const title = document.getElementById('archive-title');
  let posts = sortPostsByDate(POSTS);

  if (categorie) {
    posts = posts.filter(p => p.categorie === categorie);
    title.textContent = `Arhivă: ${categorie}`;
  } else {
    title.textContent = 'Toate postările';
  }

  const container = document.getElementById('archive-posts');
  if (posts.length === 0) {
    container.innerHTML = '<p class="no-results">Nicio postare în această categorie.</p>';
    return;
  }
  container.innerHTML = posts.map(post => createCard(post)).join('');
}

/* ===== Iconiță temă ===== */
function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
}