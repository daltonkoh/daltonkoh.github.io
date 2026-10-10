'use strict';
const dialog = document.querySelector('#media-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const content = document.querySelector('#dialog-content');
const videos = {
  echoes: { title: 'Echoes Below — gameplay', file: 'echoes', text: 'A 57-second excerpt from the team game: menu, sound settings and early underwater gameplay. My contributions focus on engine audio, script bindings, menus and scene transitions.' },
  beyond: { title: 'Beyond Us — gameplay', file: 'beyond', text: 'The team game showcase: multiplayer lobbies, ship exploration, collecting scrap, building and repairing towers, and manned cannons. This is prototype footage.' },
  fish: { title: 'Flow fields & boids', file: 'fish', text: 'A 45-second excerpt showing the cave simulation and its flow-field visualisation. This recording focuses on behaviour and debugging views.' }
};
const images = {
  nookified: { title: 'Nookified — room planner', file: 'nookified.jpg', alt: 'Nookified running in a browser, with a 3D room and furniture catalogue', text: 'A screenshot of the working Unity web prototype. Products, prices and the catalogue are illustrative demo content.' },
  props: { title: 'Blender — prop studies', file: 'props.png', alt: 'Crates, shelving and a container in the Blender viewport', text: 'Low-poly prop studies, shown in the Blender viewport.' },
  shopkeeper: { title: 'Blender — shopkeeper', file: 'shopkeeper.png', alt: 'Round shopkeeper character with an antenna and teal features', text: 'Character study shown in the Blender viewport.' },
  design: { title: 'Level design — planning the journey', file: 'design-process.png', alt: 'A page from Dalton’s design document, with an RPG map, pacing curve and branching flow diagram', text: 'A school level-design study using RPG Map Editor. The map, pacing curve and flow diagram show how I plan challenge and progression.' }
};
const cases = {
  echoes: { title: 'GrapeEngine / Echoes Below', intro: 'A team-built C++ game engine and the underwater game made with it. My work spans the audio layer of the engine and the C# scripts that use it.', heading: 'Audio from engine to experience', bullets: ['Integrated FMOD playback, mixer buses, fades, low-pass filtering and spatial audio into GrapeEngine.', 'Exposed engine audio controls to C# scripts so game logic could manage sound.', 'Implemented audio management, menus and scene crossfades in Echoes Below.'], context: 'Team engine and game project. The footage demonstrates the whole team’s game; the contribution list describes my work.', tags: ['C++', 'C#', 'FMOD'], outcome: 'Engine audio controls are available to game scripts, connecting sound playback and transitions to the game’s state.' },
  nookified: { title: 'Nookified', intro: 'An interactive Unity room-planning prototype built as a team project. It lets users shape a room, position furniture and try finishes.', heading: 'Room editing and interaction', bullets: ['Developed polygon room editing, including curved corners and pillar cut-outs.', 'Implemented grid snapping and camera-relative furniture movement for positioning room contents.', 'Worked on room finishes and product-information interfaces.'], context: 'Team prototype. The furniture, vendors, prices and checkout are demonstrations; this is not a live shopping service.', tags: ['Unity', 'C#', '3D interaction'], outcome: 'Users can create custom room layouts and position and customise items within them.' },
  beyond: { title: 'Beyond Us', intro: 'A team-built multiplayer Godot space-survival prototype with resource collection, ship repairs and tower defence. I focused on connecting environmental changes to feedback and progression.', heading: 'World-state feedback', bullets: ['Implemented destruction tracking and progressive scene effects to communicate environmental damage.', 'Connected world-state changes to an event-driven ending.', 'Integrated player action and NPC idle animations, scene collisions and audio feedback.'], context: 'Team game project. The footage demonstrates the whole team’s game; the contribution list describes my work.', tags: ['Godot', 'Animation integration'], outcome: 'Changes to the world drive visible effects and the ending event, while animation and audio communicate actions during play.' }
};
function openDialog(title) {
  dialogTitle.textContent = title;
  content.replaceChildren();
  document.body.classList.add('modal-open');
  if (!dialog.open) dialog.showModal();
}
function paragraph(text, className) {
  const p = document.createElement('p'); p.textContent = text;
  if (className) p.className = className;
  return p;
}
function showVideo(key) {
  const data = videos[key]; if (!data) return;
  openDialog(data.title);
  const video = document.createElement('video');
  video.controls = true; video.playsInline = true; video.preload = 'metadata';
  video.poster = `assets/${data.file}-poster.jpg`;
  video.src = `assets/${data.file}.mp4`;
  video.setAttribute('aria-label', data.title);
  content.append(video, paragraph(data.text, 'dialog-description'));
  video.play().catch(() => {});
}
function showImage(key) {
  const data = images[key]; if (!data) return;
  openDialog(data.title);
  const img = new Image(); img.src = `assets/${data.file}`; img.alt = data.alt; img.className = 'lightbox-image';
  content.append(img, paragraph(data.text, 'dialog-description'));
}
function showCase(key) {
  const data = cases[key]; if (!data) return;
  openDialog(data.title);
  const grid = document.createElement('div'); grid.className = 'case-content';
  const main = document.createElement('div');
  const heading = document.createElement('h3'); heading.textContent = data.heading;
  const list = document.createElement('ul');
  data.bullets.forEach(text => { const li = document.createElement('li'); li.textContent = text; list.append(li); });
  const outcomeHeading = document.createElement('h3'); outcomeHeading.textContent = 'What this enables';
  main.append(paragraph(data.intro), heading, list, outcomeHeading, paragraph(data.outcome));
  const aside = document.createElement('aside'); aside.className = 'case-aside';
  const tags = document.createElement('ul'); tags.className = 'tags';
  data.tags.forEach(text => { const li = document.createElement('li'); li.textContent = text; tags.append(li); });
  aside.append(paragraph('PROJECT CONTEXT', 'eyebrow'), paragraph(data.context), tags);
  grid.append(main, aside); content.append(grid);
}
document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => showVideo(button.dataset.video)));
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => showImage(button.dataset.image)));
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => showCase(button.dataset.case)));
document.querySelector('[data-gallery]').addEventListener('click', () => {
  openDialog('Blender — asset studies');
  const gallery = document.createElement('div'); gallery.className = 'gallery-content';
  [['props.png', 'Props and furniture'], ['crystal-table.png', 'Crystal-accented table'], ['partition.png', 'Modular partition'], ['shopkeeper.png', 'Shopkeeper character']].forEach(([file, label]) => {
    const figure = document.createElement('figure'); const img = new Image(); img.src = `assets/${file}`; img.alt = label;
    const caption = document.createElement('figcaption'); caption.textContent = label;
    figure.append(img, caption); gallery.append(figure);
  });
  content.append(gallery);
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { content.querySelectorAll('video').forEach(video => { video.pause(); video.removeAttribute('src'); video.load(); }); content.replaceChildren(); document.body.classList.remove('modal-open'); });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter; let count = 0;
  document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  document.querySelectorAll('.experiment').forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; if (!card.hidden) count++; });
  document.querySelector('#filter-status').textContent = `Showing ${count} playground ${count === 1 ? 'project' : 'projects'}.`;
}));
document.querySelector('#year').textContent = new Date().getFullYear();
