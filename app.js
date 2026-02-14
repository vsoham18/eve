const app = document.getElementById('app');
const USERS_API = 'https://jsonplaceholder.typicode.com/users';

const getToken = () => localStorage.getItem('auth_token');
const setToken = (value) => localStorage.setItem('auth_token', value);
const logout = () => {
  localStorage.removeItem('auth_token');
  location.hash = '#/login';
};

const defaultSettings = { fullName: 'Product Candidate', email: 'candidate@saasify.com', theme: 'light' };
const getSettings = () => JSON.parse(localStorage.getItem('settings') || JSON.stringify(defaultSettings));
const saveSettings = (next) => localStorage.setItem('settings', JSON.stringify(next));

function applyTheme() {
  document.documentElement.setAttribute('data-theme', getSettings().theme || 'light');
}

function navTemplate() {
  return `<header class="main-nav"><div class="container inner">
    <a class="brand" href="#/">SaaSify</a>
    <nav class="nav-links" aria-label="Main">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#testimonials">Testimonials</a>
      <a href="#/login" class="btn btn-ghost">Login</a>
      <a href="#/signup" class="btn btn-primary">Get Started</a>
    </nav>
  </div></header>`;
}

function landingPage() {
  app.innerHTML = `${navTemplate()}<main id="main-content">
    <section class="container hero">
      <div>
        <span class="badge">Best SaaS App of 2026</span>
        <h1>Build your business with a next-gen SaaS platform.</h1>
        <p>Scale your workflow, automate manual tasks, and manage your growth from one beautifully crafted dashboard.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#/signup">Start Free Trial</a>
          <a class="btn btn-ghost" href="#pricing">View Pricing</a>
        </div>
      </div>
      <div class="hero-card" aria-hidden="true">
        <div class="hero-blob"></div>
        <div class="mini-stats"><strong>+32%</strong><div class="muted">Monthly conversion growth</div></div>
      </div>
    </section>

    <section id="features" class="container">
      <div class="section-title"><span class="badge">Features</span><h2>Everything your team needs</h2><p>Fast onboarding, live analytics, and collaboration tools designed to save time every day.</p></div>
      <div class="grid-3">
        <article class="card"><h3>Smart Analytics</h3><p>Understand user behavior through charts and retention trends in real time.</p></article>
        <article class="card"><h3>Automated Workflows</h3><p>Replace repetitive tasks with automations and event-based triggers.</p></article>
        <article class="card"><h3>Team Collaboration</h3><p>Assign tasks, comment, and ship projects faster with shared views.</p></article>
      </div>
    </section>

    <section id="pricing" class="container">
      <div class="section-title"><span class="badge">Pricing</span><h2>Simple & transparent plans</h2></div>
      <div class="pricing">
        <article class="card price-card"><h3>Starter</h3><div class="price">$19</div><ul><li>Up to 5 members</li><li>Email support</li><li>Basic analytics</li></ul><button class="btn btn-ghost">Choose plan</button></article>
        <article class="card price-card featured"><h3>Pro</h3><div class="price">$49</div><ul><li>Up to 20 members</li><li>Priority support</li><li>Advanced analytics</li></ul><button class="btn btn-primary">Choose plan</button></article>
        <article class="card price-card"><h3>Enterprise</h3><div class="price">$99</div><ul><li>Unlimited members</li><li>Dedicated manager</li><li>Custom reports</li></ul><button class="btn btn-ghost">Choose plan</button></article>
      </div>
    </section>

    <section id="testimonials" class="container">
      <div class="section-title"><span class="badge">Testimonials</span><h2>Loved by modern product teams</h2></div>
      <div class="grid-3">
        <article class="card"><p>“Switching to SaaSify increased our delivery speed by 2x.”</p><strong>— Andrea, CTO</strong></article>
        <article class="card"><p>“The dashboard is clean and exactly what our ops team needed.”</p><strong>— Kevin, Operations Lead</strong></article>
        <article class="card"><p>“Excellent UX and incredibly fast support turnaround.”</p><strong>— Nour, Product Manager</strong></article>
      </div>
    </section>

    <section class="container"><div class="cta"><div><h2 style="margin:.2rem 0">Ready to grow faster?</h2><p style="margin:0;opacity:.9">Try SaaSify today and ship with confidence.</p></div><a class="btn" style="background:#fff;color:#4f46e5" href="#/signup">Start for free</a></div></section>
  </main>
  <footer class="footer">© ${new Date().getFullYear()} SaaSify. All rights reserved.</footer>`;
}

function authPage(type = 'login') {
  const isSignup = type === 'signup';
  app.innerHTML = `<main class="auth-shell" id="main-content"><form class="auth-card" id="authForm">
    <h1>${isSignup ? 'Create account' : 'Welcome back'}</h1>
    <p class="muted">${isSignup ? 'Sign up to continue' : 'Sign in to open your dashboard'}</p>
    ${isSignup ? '<div class="field"><label for="name">Full name</label><input id="name" required /></div>' : ''}
    <div class="field"><label for="email">Email</label><input id="email" type="email" required /></div>
    <div class="field"><label for="password">Password</label><input id="password" type="password" minlength="6" required /></div>
    <button class="btn btn-primary" style="width:100%" type="submit">${isSignup ? 'Sign up' : 'Login'}</button>
    <p class="muted">${isSignup ? 'Already have an account?' : "Don't have an account?"} <a href="#/${isSignup ? 'login' : 'signup'}" style="color:var(--primary)">${isSignup ? 'Login' : 'Sign up'}</a></p>
  </form></main>`;

  document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    setToken(`token-${Date.now()}`);
    location.hash = '#/dashboard';
  });
}

function appLayout(content, title = 'Dashboard') {
  app.innerHTML = `<div class="app-shell" id="main-content">
    <aside class="sidebar"><a class="brand" href="#/dashboard">SaaSify</a>
      <nav class="menu" aria-label="Dashboard menu">
        <a href="#/dashboard" class="${location.hash === '#/dashboard' ? 'active' : ''}">Dashboard</a>
        <a href="#/users" class="${location.hash.startsWith('#/users') ? 'active' : ''}">Users</a>
        <a href="#/settings" class="${location.hash === '#/settings' ? 'active' : ''}">Settings</a>
        <button class="btn btn-ghost" id="logoutBtn">Logout</button>
      </nav>
    </aside>
    <section>
      <div class="topbar"><h1 style="margin:0;font-size:1.3rem">${title}</h1><span class="muted">${getSettings().fullName}</span></div>
      <div class="main">${content}</div>
    </section>
  </div>`;
  document.getElementById('logoutBtn').addEventListener('click', logout);
}

async function dashboardPage() {
  appLayout('<p class="muted">Loading dashboard metrics...</p>', 'Dashboard');
  const root = document.querySelector('.main');
  try {
    const users = await fetch(USERS_API).then((r) => r.json());
    const companies = new Set(users.map((u) => u.company.name)).size;
    const cities = new Set(users.map((u) => u.address.city)).size;
    root.innerHTML = `<div class="kpi-grid">
      <article class="kpi"><p class="muted">Total Users</p><h2>${users.length}</h2></article>
      <article class="kpi"><p class="muted">Unique Companies</p><h2>${companies}</h2></article>
      <article class="kpi"><p class="muted">Cities Covered</p><h2>${cities}</h2></article>
    </div>
    <div class="card" style="margin-top:1rem"><h3>Overview</h3><p class="muted">This dashboard summarizes the connected users endpoint and provides quick access to search and inspect each user profile.</p></div>`;
  } catch {
    root.innerHTML = '<p class="error">Failed to load dashboard metrics. Please retry later.</p>';
  }
}

let usersCache = [];

async function usersPage() {
  appLayout('<p class="muted">Loading users...</p>', 'Users');
  const root = document.querySelector('.main');

  if (!usersCache.length) {
    try {
      const response = await fetch(USERS_API);
      if (!response.ok) throw new Error('bad response');
      usersCache = await response.json();
    } catch {
      root.innerHTML = '<p class="error">Could not fetch users from API.</p>';
      return;
    }
  }

  let page = 1;
  const size = 5;
  let sort = 'asc';
  let query = '';

  function render() {
    const filtered = usersCache
      .filter((u) => `${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => sort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

    const totalPages = Math.max(1, Math.ceil(filtered.length / size));
    page = Math.min(page, totalPages);
    const rows = filtered.slice((page - 1) * size, page * size)
      .map((u) => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.company.name}</td><td><button class="btn btn-ghost" data-user="${u.id}">View</button></td></tr>`)
      .join('');

    root.innerHTML = `<div class="toolbar">
      <input id="search" placeholder="Search name/email" value="${query}" aria-label="Search users" />
      <select id="sort" aria-label="Sort users"><option value="asc" ${sort === 'asc' ? 'selected' : ''}>A-Z</option><option value="desc" ${sort === 'desc' ? 'selected' : ''}>Z-A</option></select>
    </div>
    ${filtered.length ? `<div class="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Company</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>` : '<p class="muted">No users found for your search.</p>'}
    <div class="pagination"><button class="btn btn-ghost" id="prev" ${page <= 1 ? 'disabled' : ''}>Prev</button><span>Page ${page} of ${totalPages}</span><button class="btn btn-ghost" id="next" ${page >= totalPages ? 'disabled' : ''}>Next</button></div>
    <div class="modal" id="userModal" role="dialog" aria-modal="true"></div>`;

    document.getElementById('search')?.addEventListener('input', (e) => { query = e.target.value; page = 1; render(); });
    document.getElementById('sort')?.addEventListener('change', (e) => { sort = e.target.value; render(); });
    document.getElementById('prev')?.addEventListener('click', () => { page -= 1; render(); });
    document.getElementById('next')?.addEventListener('click', () => { page += 1; render(); });

    root.querySelectorAll('[data-user]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const user = usersCache.find((u) => String(u.id) === btn.dataset.user);
        const modal = document.getElementById('userModal');
        modal.className = 'modal open';
        modal.innerHTML = `<div class="modal-card"><h3>${user.name}</h3><p class="muted">@${user.username}</p><p><strong>Email:</strong> ${user.email}</p><p><strong>Phone:</strong> ${user.phone}</p><p><strong>Website:</strong> ${user.website}</p><p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p><button class="btn btn-primary" id="closeModal">Close</button></div>`;
        document.getElementById('closeModal').addEventListener('click', () => modal.className = 'modal');
      });
    });
  }

  render();
}

function settingsPage() {
  const settings = getSettings();
  appLayout(`<form id="settingsForm" class="card" style="max-width:580px">
    <h3>Profile Settings</h3>
    <div class="field"><label for="fullName">Full name</label><input id="fullName" value="${settings.fullName}" required /></div>
    <div class="field"><label for="email">Email</label><input id="email" type="email" value="${settings.email}" required /></div>
    <div class="field"><label for="theme">Theme</label><select id="theme"><option value="light" ${settings.theme === 'light' ? 'selected' : ''}>Light</option><option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>Dark</option></select></div>
    <button class="btn btn-primary">Save settings</button>
    <p class="muted" id="savedMsg" aria-live="polite"></p>
  </form>`, 'Settings');

  document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const next = {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      theme: document.getElementById('theme').value,
    };
    saveSettings(next);
    applyTheme();
    document.getElementById('savedMsg').textContent = 'Settings saved successfully.';
  });
}

function route() {
  applyTheme();
  const hash = location.hash || '#/';
  const protectedRoute = ['#/dashboard', '#/users', '#/settings'].includes(hash);

  if (protectedRoute && !getToken()) {
    location.hash = '#/login';
    return;
  }

  if (hash === '#/' || hash.startsWith('#features') || hash.startsWith('#pricing') || hash.startsWith('#testimonials')) return landingPage();
  if (hash === '#/login') return authPage('login');
  if (hash === '#/signup') return authPage('signup');
  if (hash === '#/dashboard') return dashboardPage();
  if (hash === '#/users') return usersPage();
  if (hash === '#/settings') return settingsPage();

  app.innerHTML = `<main class="container" style="padding:4rem 0"><h1>404</h1><p>Page not found.</p><a href="#/" class="btn btn-primary">Go Home</a></main>`;
}

window.addEventListener('hashchange', route);
route();
