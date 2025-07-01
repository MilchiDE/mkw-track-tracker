(() => {
  'use strict';

  const images = [
    "Acorn Heights.png",
    "Airship Fortress.png",
    "Boo Cinema.png",
    "Bowser's Castle.png",
    "Cheep Cheep Falls.png",
    "Choco Mountain.png",
    "Crown City.png",
    "Dandelion Depths.png",
    "Desert Hills.png",
    "Dino Dino Jungle.png",
    "DK Pass.png",
    "DK Spaceport.png",
    "Dry Bones Burnout.png",
    "Faraway Oasis.png",
    "Great Question Block Ruins.png",
    "Koopa Troopa Beach.png",
    "Mario Bros. Circuit.png",
    "Mario Circuit.png",
    "Moo Moo Meadows.png",
    "Peach Beach.png",
    "Peach Stadium.png",
    "Rainbow Road.png",
    "Salty Salty Speedway.png",
    "Shy Guy Bazaar.png",
    "Sky-High Sundae.png",
    "Starview Peak.png",
    "Toad's Factory.png",
    "Wario Stadium.png",
    "Wario's Galleon.png",
    "Whistlestop Summit.png"
  ];

  const gallery = document.getElementById('gallery');
  const searchInput = document.getElementById('search');
  const modeToggleBtn = document.getElementById('modeToggle');

  let crossedOut = new Set();

  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      modeToggleBtn.textContent = '☀️';
    } else {
      document.body.classList.remove('dark');
      modeToggleBtn.textContent = '🌙';
    }
  }

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  modeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // 🔥 Fix: Remove focus so style resets immediately
  modeToggleBtn.blur();
}


  function renderGallery(filter = '') {
    gallery.innerHTML = '';
    const normalizedFilter = filter.toLowerCase().trim();

    const filteredImages = images.filter(name =>
      normalizedFilter === '' || name.toLowerCase().includes(normalizedFilter)
    );

    if (filteredImages.length === 0) {
      const noResult = document.createElement('p');
      noResult.textContent = 'No tracks found.';
      noResult.style.textAlign = 'center';
      noResult.style.color = 'var(--text)';
      gallery.appendChild(noResult);
      return;
    }

    filteredImages.forEach(filename => {
      const item = document.createElement('article');
      item.classList.add('image-item');
      item.tabIndex = 0;
      if (crossedOut.has(filename)) item.classList.add('strikethrough');

      item.setAttribute('role', 'button');
      item.setAttribute('aria-pressed', crossedOut.has(filename).toString());
      item.setAttribute('aria-label', `Toggle strikethrough for ${filename}`);

      const img = document.createElement('img');
      img.src = `Images/${filename}`;
      img.alt = filename;

      item.appendChild(img);

      function toggleCross() {
        const isStruck = crossedOut.has(filename);
        if (isStruck) {
          crossedOut.delete(filename);
          item.classList.remove('strikethrough');
        } else {
          crossedOut.add(filename);
          item.classList.add('strikethrough');
        }
        item.setAttribute('aria-pressed', (!isStruck).toString());
      }

      item.addEventListener('click', toggleCross);
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCross();
        }
      });

      gallery.appendChild(item);
    });
  }

  searchInput.addEventListener('input', () => renderGallery(searchInput.value));
  modeToggleBtn.addEventListener('click', toggleTheme);

  loadTheme();
  renderGallery();
})();
