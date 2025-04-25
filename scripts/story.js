const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');

if (slug) {
  fetch(`./stories/${slug}.md`)
    .then((res) => res.text())
    .then((md) => {
      const html = marked.parse(md);
      document.getElementById('story-content').innerHTML = html;

      const index = Math.floor(Math.random() * 12) + 1; // 1 to 12
      const imagePath = `./assets/images/creepy-${index}.jpg`; // change to .png if needed

      document.body.style.backgroundImage = `url('${imagePath}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    });
}
