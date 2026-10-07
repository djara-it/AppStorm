    // 1. ANIMACIÓN DE PANTALLA DE CARGA (SPLASH SCREEN: 1.6 SEGUNDOS)
    window.addEventListener('load', () => {
      setTimeout(() => {
        const splash = document.getElementById('as-splash');
        if (splash) {
          splash.classList.add('fade-out');
          setTimeout(() => { splash.style.display = 'none'; }, 500);
        }
      }, 1600);
    });

    // BASE DE DATOS DE APLICACIONES
    const apps = [
      { 
        id: 1, 
        icon: "▶", 
        name: "YouTube", 
        desc: "Streaming global en 4K, canales oficiales y shorts.", 
        cat: "Entretenimiento", 
        ver: "19.45", 
        size: "120MB", 
        rating: "4.8",
        mega: "https://www.youtube.com", 
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
        ver: "24.1", 
        size: "85MB", 
        rating: "4.7",
        mega: "https://picsart.com", 
        play: "https://play.google.com/store/apps/details?id=com.picsart.studio", 
        tags: ["fotos", "edición", "filtros"] 
      },
      { 
        id: 4, 
        icon: "♫", 
        name: "YouTube Music", 
        desc: "Música en alta calidad sincronizada con YouTube.", 
        cat: "Música", 
        ver: "6.51", 
        size: "45MB", 
        rating: "4.6",
        mega: "https://music.youtube.com", 
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
        ver: "3.8", 
        size: "22MB", 
        rating: "4.8",
        mega: "https://wallcraft.com", 
        play: "https://play.google.com/store/apps/details?id=com.wallcraft.app", 
        tags: ["fondos", "4k", "amoled"] 
      },
      { 
        id: 7, 
        icon: "⬡", 
        name: "Smart Launcher", 
        desc: "Launcher inteligente con organización rápida.", 
        cat: "Personalización", 
        ver: "6.3", 
        size: "19MB", 
        rating: "4.7",
        mega: "https://www.smartlauncher.net", 
        play: "https://play.google.com/store/apps/details?id=ginlemon.flowerpro", 
        tags: ["launcher", "personalización"] 
      },
      { 
        id: 8, 
        icon: "◻", 
        name: "PPCine", 
        desc: "Reproductor de contenido para series y películas.", 
        cat: "Entretenimiento", 
        ver: "2.1", 
        size: "31MB", 
        rating: "4.5",
        mega: "#", 
        play: "https://play.google.com", 
        tags: ["películas", "series", "cine"] 
      }
    ];

    // REPRODUCTOR DE MÚSICA - CARGA ASÍNCRONA DESDE PLAYLISTS.JSON
    let musicPlaylists = [];

    // Extrae el ID del vídeo y devuelve el enlace en formato /embed/
// Extrae el ID del vídeo y limpia la URL para el iframe
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
  
  // Incluimos enablejsapi=1 y rel=0 para evitar bloqueos del reproductor
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

    function handleModalOverlayClick(e) {
      if (e.target.id === 'app-modal-overlay') {
        closePanel();
      }
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

    // BÚSQUEDA EN TIEMPO REAL LIMPIA
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

    function limpiarBusqueda() {
      const inp = document.getElementById('hero-input');
      inp.value = '';
      buscarEnTiempoReal('');
      inp.focus();
    }

    // BÚSQUEDA POR TAGS POPULARES
    function buscarPorTag(tagKey) {
      const inp = document.getElementById('hero-input');
      let query = '';
      if (tagKey === 'Populares') {
        inp.value = '';
        renderGrid();
        document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
        return;
      } else if (tagKey === 'Cine') {
        query = 'cine';
        inp.value = 'Cine & Series';
      } else if (tagKey === 'Edición') {
        query = 'edición';
        inp.value = 'Edición IA';
      } else if (tagKey === 'Música') {
        query = 'música';
        inp.value = 'Música';
      } else if (tagKey === 'Optimización') {
        query = 'personalización';
        inp.value = 'Optimización';
      }
      
      const clearBtn = document.getElementById('clear-search-btn');
      if (clearBtn) clearBtn.style.display = 'block';

      const matches = apps.filter(a =>
        a.name.toLowerCase().includes(query) ||
        a.cat.toLowerCase().includes(query) ||
        a.desc.toLowerCase().includes(query) ||
        a.tags.some(t => t.toLowerCase().includes(query))
      );
      renderGrid(matches);
      document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
    }

    // GESTIÓN DEL MENÚ HAMBURGUESA MÓVIL
    function toggleMobileMenu(e) {
      if (e) e.stopPropagation();
      const menu = document.getElementById('mobile-menu');
      if (menu) menu.classList.toggle('open');
    }

    function closeMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      if (menu) menu.classList.remove('open');
    }

    function navigateMobile(targetId) {
      closeMobileMenu();
      if (targetId === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // GESTIÓN DEL DOCK FLOTANTE CONSOLIDADO (IA + MÚSICA)
    function toggleDock(e) {
      if (e) e.stopPropagation();
      const win = document.getElementById('dock-win');
      win.classList.toggle('open');
      if (win.classList.contains('open')) {
        const paneIa = document.getElementById('pane-ia');
        if (paneIa.classList.contains('active')) {
          document.getElementById('chat-in').focus();
        }
      }
    }

    function closeDock() {
      const win = document.getElementById('dock-win');
      if (win) win.classList.remove('open');
    }

    function switchDockTab(tab) {
      const btnIa = document.getElementById('tab-btn-ia');
      const btnMusic = document.getElementById('tab-btn-music');
      const paneIa = document.getElementById('pane-ia');
      const paneMusic = document.getElementById('pane-music');

      if (tab === 'ia') {
        btnIa.classList.add('active');
        btnMusic.classList.remove('active');
        paneIa.classList.add('active');
        paneMusic.classList.remove('active');
        document.getElementById('chat-in').focus();
      } else {
        btnMusic.classList.add('active');
        btnIa.classList.remove('active');
        paneMusic.classList.add('active');
        paneIa.classList.remove('active');
      }
    }

    // MÚSICA DENTRO DEL DOCK CON URL EMBED LIMPIA
    function getCleanYoutubeId(val) {
      if (!val) return 'V7q1jN7k5lg';
      const text = String(val).trim();
      if (/^[a-zA-Z0-9_-]{11}$/.test(text)) return text;
      const match = text.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : text;
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
      playerBox.innerHTML = `<iframe src="${finalUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
      now.innerHTML = `Reproduciendo: <strong>${titulo}</strong>`;
    }

    // CHAT DE IA DENTRO DEL DOCK
    function enviarChat() {
      const inp = document.getElementById('chat-in');
      const msgs = document.getElementById('chat-msgs');
      const q = inp.value.trim();
      if (!q) return;

      msgs.innerHTML += `<div class="as-msg user">${q}</div>`;
      inp.value = '';
      msgs.scrollTop = msgs.scrollHeight;

      const lower = q.toLowerCase();
      const typingId = 'typing-' + Date.now();
      msgs.innerHTML += `<div class="as-msg bot" id="${typingId}">...</div>`;
      msgs.scrollTop = msgs.scrollHeight;

      const matches = apps.filter(a =>
        a.tags.some(t => lower.includes(t)) ||
        a.cat.toLowerCase().includes(lower) ||
        a.name.toLowerCase().includes(lower)
      );

      setTimeout(() => {
        const typingEl = document.getElementById(typingId);
        if (typingEl) {
          if (matches.length > 0) {
            const app = matches[0];
            typingEl.innerHTML = `Te recomiendo <strong>${app.name}</strong> (${app.cat}). ${app.desc} <br><button onclick="openPanel(${app.id}); closeDock();" style="margin-top:6px; background:var(--primary); border:none; padding:4px 8px; border-radius:6px; font-weight:700; cursor:pointer; font-size:11px;">Ver ficha</button>`;
          } else if (lower.includes('música') || lower.includes('playlist')) {
            typingEl.innerHTML = `¡Puedes escuchar música directamente en la pestaña <strong>🎵 Música</strong> de este mismo botón! <button onclick="switchDockTab('music')" style="margin-top:4px; display:block; background:var(--secondary); border:none; color:#fff; padding:4px 8px; border-radius:6px; font-weight:600; cursor:pointer; font-size:11px;">Ir a Música</button>`;
          } else if (lower.includes('hola') || lower.includes('buenas')) {
            typingEl.textContent = '¡Hola! Pregúntame sobre cualquier aplicación o categoría (edición, fondos, juegos, reproductores) y te ayudaré a elegir.';
          } else {
            typingEl.textContent = 'No encontré una app exacta para esa búsqueda. Prueba con términos como "fotos", "video", "personalización" o "música".';
          }
        }
        msgs.scrollTop = msgs.scrollHeight;
      }, 500);
    }

    // CIERRE AL HACER CLIC FUERA Y CON TECLA ESCAPE
    document.addEventListener('click', (e) => {
      // Cerrar dock si está abierto
      const dock = document.getElementById('dock-win');
      const fabBtn = document.querySelector('.as-fab-main-btn');
      if (dock && dock.classList.contains('open')) {
        if (!dock.contains(e.target) && !fabBtn.contains(e.target)) {
          closeDock();
        }
      }

      // Cerrar menú móvil si está abierto
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburgerBtn = document.getElementById('hamburger-btn');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePanel();
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
    });