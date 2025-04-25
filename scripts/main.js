fetch('./stories/index.json')
  .then((res) => res.json())
  .then((stories) => {
    const container = document.getElementById('story-list');
    stories.forEach((story) => {
      const card = document.createElement('div');
      card.className = 'story-card';
      card.innerHTML = `<h2>${story.title}</h2><p>${story.date}</p>`;
      card.onclick = () =>
        (window.location.href = `story-template.html?slug=${story.slug}`);
      container.appendChild(card);
    });
  });
