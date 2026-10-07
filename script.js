// 1. ANIMACIÓN Y OCULTAMIENTO DE PANTALLA DE CARGA (SPLASH SCREEN)
window.addEventListener('load', () => {
  const loader = document.getElementById('as-splash') || document.getElementById('as-splash-screen') || document.getElementById('as-loader');
  if (loader) {
    loader.style.transition = 'opacity 0.4s ease';
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 400);
  }
});

// BASE DE DATOS DE APLICACIONES
const apps = [
  { 
    id: 1, 
    icon: "▶", 
    name: "YouTube", 
    desc: "Streaming global en 4K, canales oficiales y shorts.", 
    cat: "Entretenimiento", 
    ver: "21.36.45", 
    size: "131MB", 
    rating: "4.8",
    mega: "https://mega.nz/file/WxRjTDhL#UIA3BlBYnMqwn3BOqyMPW4S4z_ghaoF-UDgbTLr5v7M", 
    play: "https://play.google.com/store/apps/details?id=com.google.android.youtube", 
    tags: ["vídeo", "streaming", "shorts"] 
  },
  { 
    id: 2, 
    icon: "✂", 
    name: "CapCut", 
    desc: "Editor de vídeo con efectos IA y plantillas virales.", 
    cat: "Edición", 
    ver: "11.2", 
    size: "98MB", 
    rating: "4.9",
    mega: "https://www.capcut.com", 
    play: "https://play.google.com/store/apps/details?id=com.lemon.lvoverseas", 
    tags: ["edición", "vídeo", "reels"] 
  },
  { 
    id: 3, 
    icon: "◑", 
    name: "PicsArt", 
    desc: "Editor de fotos con filtros IA, stickers y diseño.", 
    cat: "Fotografía", 
    ver: "30.8.4", 
    size: "91.7MB", 
    rating: "4.7",
    mega: "https://mega.nz/file/mlgUwJZS#6XDf-hKiCKpYXZVZKKuuGOSPk056n8w3WE86Go1Dh1w", 
    play: "https://play.google.com/store/apps/details?id=com.picsart.studio", 
    tags: ["fotos", "edición", "filtros"] 
  },
  { 
    id: 4, 
    icon: "♫", 
    name: "YouTube Music", 
    desc: "Música en alta calidad sincronizada con YouTube.", 
    cat: "Música", 
    ver: "9.35.54", 
    size: "73.8MB", 
    rating: "4.6",
    mega: "https://mega.nz/file/GlIzyarC#P3NbcdfiRcYMfexHfrk09OzCh67c5utuTTLwTbaiKXM", 
    play: "https://play.google.com/store/apps/details?id=com.google.android.apps.youtube.music", 
    tags: ["música", "streaming"] 
  },
  { 
    id: 5, 
    icon: "●", 
    name: "Spotify", 
    desc: "Líder en música y podcasts con playlists únicas.", 
    cat: "Música", 
    ver: "8.9", 
    size: "38MB", 
    rating: "4.9",
    mega: "https://spotify.com", 
    play: "https://play.google.com/store/apps/details?id=com.spotify.music", 
    tags: ["música", "podcasts"] 
  },
  { 
    id: 6, 
    icon: "◈", 
    name: "Wallcraft", 
    desc: "Fondos de pantalla 4K, 8K y paralaje AMOLED.", 
    cat: "Personalización", 
    ver: "3.94.01", 
    size: "97.4MB", 
    rating: "4.8",
    mega: "https://mega.nz/file/rgBCiTyY#USliKvTVig19SKqzJvfcklKewZ-FWU_s9WWlKgFCLqA", 
    play: "https://play.google.com/store/apps/details?id=com.wallcraft.app", 
    tags: ["fondos", "4k", "amoled"] 
  },
  { 
    id: 7, 
    icon: "⬡", 
    name: "Smart Launcher", 
    desc: "Launcher inteligente con organización rápida.", 
    cat: "Personalización", 
    ver: "6.7 build 027", 
    size: "26.5MB", 
    rating: "4.7",
    mega: "https://mega.nz/file/j5JBnSgC#XXBSGiwBqYia4grC7PT0Ajj8CHxnzzvBkWMVABQicC4", 
    play: "https://play.google.com/store/apps/details?id=ginlemon.flowerpro", 
    tags: ["launcher", "personalización"] 
  },
  { 
    id: 8, 
    icon: "◻", 
    name: "PPCine", 
    desc: "Reproductor de contenido para series y películas.", 
    cat: "Entretenimiento", 
    ver: "v3.0.0", 
    size: "106.1MB", 
    rating: "4.5",
    mega: "https://mega.nz/file/yshWmZCa#LLBbjltjkpeItdrOI5wKaraaY-ZtSM115asuoZ_DU-Q", 
    play: "https://play.google.com", 
    tags: ["películas", "series", "cine"] 
  }
];

// BASE DE DATOS DE GUÍAS
const guiasData = [
  {
    id: 1,
    title: "Instalación Segura de APKs",
    img: "https://via.placeholder.com/400x200?text=Instalacion+APK",
    steps: [
      "Descarga el archivo APK desde tu servidor o fuente confiable.",
      "Ve a Ajustes > Seguridad > Orígenes desconocidos.",
      "Concede permiso solo a la aplicación o gestor necesario."
    ]
  },
  {
    id: 2,
    title: "Ahorro de Batería y RAM",
    img: "https://via.placeholder.com/400x200?text=Ahorro+Bateria",
    steps: [
      "Restringe las aplicaciones en segundo plano que no uses.",
      "Desactiva las animaciones desde Opciones de desarrollador.",
      "Ajusta el brillo automático y activa el modo oscuro."
    ]
  },
  {
    id: 3,
    title: "Personalización Minimalista",
    img: "https://via.placeholder.com/400x200?text=Personalizacion",
    steps: [
      "Instala un launcher ligero como Smart Launcher.",
      "Aplica fondos de pantalla AMOLED o 4K adaptativos.",
      "Configura un paquete de iconos limpios y widgets mínimos."
    ]
  }
];

// REPRODUCTOR DE MÚSICA - CARGA ASÍNCRONA
let musicPlaylists = [];

function obtenerUrlEmbed(url) {
  if (!url) return '';
  let videoId = '';
  
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1].split('&')[0];
  } else if (url.includes('embed/')) {
    videoId = url.split('embed/')[1].split('?')[0];
  } else {
    videoId = url.trim();
  }
  
  return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`;
}

async function cargarPlaylists() {
  try {
    const respuesta = await fetch("playlists.json");
    if (!respuesta.ok) throw new Error("No se pudo leer playlists.json");
    const datos = await respuesta.json();
    
    musicPlaylists = datos.map(p => ({
      ...p,
      url: obtenerUrlEmbed(p.url)
    }));
    
    renderDockPlaylists();
  } catch (e) {
    console.error("Error al cargar playlists desde JSON:", e);
  }
}

// FAVORITOS CON LOCALSTORAGE
let favoritos = [];
try {
  favoritos = JSON.parse(localStorage.getItem('appstorm_favs')) || [];
} catch (e) {}

function updateFavBadge() {
  const el = document.getElementById('fav-count');
  if (el) el.textContent = favoritos.length;
}

function toggleFav(id, ev) {
  if (ev) ev.stopPropagation();
  const index = favoritos.indexOf(id);
  if (index > -1) {
    favoritos.splice(index, 1);
  } else {
    favoritos.push(id);
  }
  try {
    localStorage.setItem('appstorm_favs', JSON.stringify(favoritos));
  } catch (e) {}
  updateFavBadge();
  renderGrid();
  if (currentActivePanelId === id) {
    updatePanelFavButton(id);
  }
}

let currentActivePanelId = null;

// RENDERIZAR HISTORIAS (STORIES)
function renderStories() {
  const row = document.getElementById('stories-row');
  if (!row) return;
  row.innerHTML = apps.map(a => `
    <div class="as-story" onclick="openPanel(${a.id})" title="${a.name}">
      <div class="as-story-ring">
        <div class="as-story-inner">${a.icon}</div>
      </div>
      <div class="as-story-label">${a.name}</div>
    </div>
  `).join('');
}

// ABRIR Y CERRAR PANEL DE DETALLE MODAL
function openPanel(id) {
  const a = apps.find(x => x.id === id);
  if (!a) return;
  currentActivePanelId = id;
  const overlay = document.getElementById('app-modal-overlay');
  
  const allStories = document.querySelectorAll('.as-story');
  allStories.forEach((s, idx) => {
    if (apps[idx] && apps[idx].id === id) {
      s.classList.add('active');
    } else {
      s.classList.remove('active');
    }
  });

  document.getElementById('panel-icon').textContent = a.icon;
  document.getElementById('panel-name').textContent = a.name;
  document.getElementById('panel-desc').textContent = a.desc;
  
  document.getElementById('panel-meta').innerHTML = `
    <span class="as-badge highlight">${a.cat}</span>
    <span class="as-badge">⭐ ${a.rating}</span>
    <span class="as-badge">v${a.ver}</span>
    <span class="as-badge">${a.size}</span>
    ${a.tags.map(t => `<span class="as-badge">#${t}</span>`).join('')}
  `;

  const btnMega = document.getElementById('panel-mega');
  const btnPlay = document.getElementById('panel-play');

  btnMega.onclick = () => {
    if (a.mega === "#") {
      alert(`Descarga para ${a.name} disponible en servidor AppStorm. (Peso: ${a.size})`);
    } else {
      window.open(a.mega, '_blank');
    }
  };

  btnPlay.onclick = () => {
    window.open(a.play, '_blank');
  };

  updatePanelFavButton(id);
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePanel() {
  const overlay = document.getElementById('app-modal-overlay');
  if (overlay) overlay.classList.remove('open');
  document.querySelectorAll('.as-story').forEach(s => s.classList.remove('active'));
  currentActivePanelId = null;
  document.body.style.overflow = '';
}

function updatePanelFavButton(id) {
  const btn = document.getElementById('panel-fav-btn');
  if (!btn) return;
  const isFav = favoritos.includes(id);
  btn.innerHTML = isFav ? '❤️ En favoritos' : '🤍 Guardar';
  btn.style.color = isFav ? '#f43f5e' : '#fda4af';
}

function togglePanelFav() {
  if (currentActivePanelId !== null) {
    toggleFav(currentActivePanelId);
  }
}

// FUNCIONES DEL MODAL DE GUÍAS
function openGuiaPanel(id) {
  const g = guiasData.find(x => x.id === id);
  if (!g) return;

  const titleEl = document.getElementById('guia-panel-title');
  const imgEl = document.getElementById('guia-panel-img');
  const stepsEl = document.getElementById('guia-panel-steps');
  const overlay = document.getElementById('guia-modal-overlay');

  if (titleEl) titleEl.textContent = g.title;
  if (imgEl) imgEl.src = g.img;
  
  if (stepsEl) {
    stepsEl.innerHTML = g.steps
      .map((step, idx) => `<li><strong>Paso ${idx + 1}:</strong> ${step}</li>`)
      .join('');
  }

  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeGuiaPanel() {
  const overlay = document.getElementById('guia-modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// RENDERIZAR GRID COMPACTO
function renderGrid(customList = null) {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  const list = customList !== null ? customList : apps;

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: var(--text-dim);">
        <p style="font-size: 26px; margin-bottom: 6px;">🔍</p>
        <p style="font-size: 14px; color: #fff;">No se encontraron aplicaciones con ese criterio.</p>
        <button onclick="limpiarBusqueda()" style="margin-top: 10px; background: var(--primary); border: none; padding: 6px 14px; border-radius: 8px; color: #070814; font-weight: 700; cursor: pointer; font-size:12px;">Restablecer catálogo</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(a => {
    const isFav = favoritos.includes(a.id);
    return `
      <div class="as-card" onclick="openPanel(${a.id})">
        <div>
          <div class="as-card-top-row">
            <div class="as-card-icon">${a.icon}</div>
            <button class="as-card-fav-btn ${isFav ? 'active' : ''}" onclick="toggleFav(${a.id}, event)" title="${isFav ? 'Quitar' : 'Guardar'}">
              ${isFav ? '❤️' : '🤍'}
            </button>
          </div>
          <h4>${a.name}</h4>
          <p>${a.desc}</p>
        </div>
        <div class="as-card-footer">
          <span class="as-card-tag">${a.cat}</span>
          <span class="as-card-size">⭐ ${a.rating} • ${a.size}</span>
        </div>
      </div>
    `;
  }).join('');
}

function mostrarFavoritos() {
  const favList = apps.filter(a => favoritos.includes(a.id));
  renderGrid(favList);
  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}

// BÚSQUEDA EN TIEMPO REAL Y POR TAGS
function buscarEnTiempoReal(texto) {
  const q = texto.trim().toLowerCase();
  const clearBtn = document.getElementById('clear-search-btn');
  if (clearBtn) {
    clearBtn.style.display = q ? 'block' : 'none';
  }

  if (!q) {
    renderGrid();
    return;
  }

  const matches = apps.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.cat.toLowerCase().includes(q) ||
    a.desc.toLowerCase().includes(q) ||
    a.tags.some(t => t.toLowerCase().includes(q))
  );
  renderGrid(matches);
}

function buscarPorTag(tag) {
  const inp = document.getElementById('hero-input');
  if (inp) inp.value = tag;
  buscarEnTiempoReal(tag);
  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}

function limpiarBusqueda() {
  const inp = document.getElementById('hero-input');
  if (inp) inp.value = '';
  buscarEnTiempoReal('');
  if (inp) inp.focus();
}

// NAVEGACIÓN MÓVIL
function toggleMobileMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('open');
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.remove('open');
}

function navigateMobile(sectionId) {
  closeMobileMenu();
  if (sectionId === 'inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

// GESTIÓN DOCK (PESTAÑAS Y FLOTANTE)
function toggleDock(e) {
  if (e) e.stopPropagation();
  const win = document.getElementById('dock-win');
  if (win) win.classList.toggle('open');
}

function closeDock() {
  const win = document.getElementById('dock-win');
  if (win) win.classList.remove('open');
}

function switchDockTab(tab) {
  const tabIa = document.getElementById('tab-btn-ia');
  const tabMusic = document.getElementById('tab-btn-music');
  const paneIa = document.getElementById('pane-ia');
  const paneMusic = document.getElementById('pane-music');

  if (tab === 'ia') {
    if (tabIa) tabIa.classList.add('active');
    if (tabMusic) tabMusic.classList.remove('active');
    if (paneIa) paneIa.classList.add('active');
    if (paneMusic) paneMusic.classList.remove('active');
  } else {
    if (tabMusic) tabMusic.classList.add('active');
    if (tabIa) tabIa.classList.remove('active');
    if (paneMusic) paneMusic.classList.add('active');
    if (paneIa) paneIa.classList.remove('active');
  }
}

function renderDockPlaylists() {
  const box = document.getElementById('dock-playlist-list');
  if (!box) return;

  box.innerHTML = musicPlaylists.map(p => `
    <div class="as-dock-track" onclick="playDockMusic('${p.url}', '${p.titulo}')">
      <div>
        <div class="as-dock-track-title">${p.titulo}</div>
        <div class="as-dock-track-sub">${p.genero}</div>
      </div>
      <span class="as-dock-track-play">▶</span>
    </div>
  `).join('');
}

function playDockMusic(embedUrl, titulo) {
  let finalUrl = embedUrl;
  if (!finalUrl.startsWith('http')) {
    finalUrl = 'https://www.youtube.com/embed/' + finalUrl;
  }
  const playerBox = document.getElementById('dock-player-box');
  const now = document.getElementById('dock-now-playing');
  if (playerBox) playerBox.innerHTML = `<iframe src="${finalUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  if (now) now.innerHTML = `Reproduciendo: <strong>${titulo}</strong>`;
}

// CHAT ASISTENTE IA
function enviarChat() {
  const input = document.getElementById('chat-in');
  const msgs = document.getElementById('chat-msgs');
  if (!input || !msgs) return;

  const text = input.value.trim();
  if (!text) return;

  // Mensaje usuario
  msgs.innerHTML += `<div class="as-msg user">${text}</div>`;
  input.value = '';
  msgs.scrollTop = msgs.scrollHeight;

  // Respuesta automática del Bot
  setTimeout(() => {
    let response = "Puedes explorar las aplicaciones en el catálogo o usar el buscador superior.";
    const lower = text.toLowerCase();
    
    if (lower.includes('editor') || lower.includes('video') || lower.includes('foto')) {
      response = "Para edición te sugiero **CapCut** (vídeo con IA) o **PicsArt** (fotografía y filtros).";
    } else if (lower.includes('musica') || lower.includes('cancion') || lower.includes('podcast')) {
      response = "En la sección de música te recomiendo **YouTube Music** y **Spotify**.";
    } else if (lower.includes('fondo') || lower.includes('personaliz')) {
      response = "Prueba **Wallcraft** para fondos 4K o **Smart Launcher** para un escritorio limpio.";
    }

    msgs.innerHTML += `<div class="as-msg bot">${response}</div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }, 500);
}

// Manejadores para cerrar modales al hacer clic en el fondo oscuro
function handleModalOverlayClick(e) {
  const overlay = document.getElementById('app-modal-overlay');
  if (e.target === overlay) {
    closePanel();
  }
}

function handleGuiaOverlayClick(e) {
  const overlay = document.getElementById('guia-modal-overlay');
  if (e.target === overlay) {
    closeGuiaPanel();
  }
}

// EVENTOS GLOBALES Y CIERRES AL HACER CLIC FUERA
document.addEventListener('click', (e) => {
  const appOverlay = document.getElementById('app-modal-overlay');
  if (e.target === appOverlay) closePanel();

  const guiaOverlay = document.getElementById('guia-modal-overlay');
  if (e.target === guiaOverlay) closeGuiaPanel();

  const dock = document.getElementById('dock-win');
  const fabBtn = document.querySelector('.as-fab-main-btn');
  if (dock && dock.classList.contains('open')) {
    if (!dock.contains(e.target) && (!fabBtn || !fabBtn.contains(e.target))) {
      closeDock();
    }
  }

  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    if (!mobileMenu.contains(e.target) && (!hamburgerBtn || !hamburgerBtn.contains(e.target))) {
      closeMobileMenu();
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePanel();
    closeGuiaPanel();
    closeDock();
    closeMobileMenu();
  }
});

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  renderStories();
  renderGrid();
  renderDockPlaylists();
  updateFavBadge();
  cargarPlaylists();

  // Forzar oculta de pantalla de carga al iniciar
  const loader = document.getElementById('as-splash') || document.getElementById('as-splash-screen') || document.getElementById('as-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => { loader.style.display = 'none'; }, 400);
    }, 600);
  }
});