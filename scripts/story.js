const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');

if (slug) {
  fetch(`./stories/${slug}.md`)
    .then((res) => res.text())
    .then((md) => {
      const html = marked.parse(md);
      document.getElementById('story-content').innerHTML = html;

      const index = Math.floor(Math.random() * 12) + 1; // 1 to 12
      const imagePath = `./assets/images/creepy-${index}.jpg`;

      document.body.style.backgroundImage = `url('${imagePath}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundAttachment = 'fixed'; // This keeps the background still
    });
}
(function () {
  const isLaptop = window.innerWidth > 768;

  if (isLaptop) {
    setTimeout(() => {
      let message =
        '💀 SYSTEM BREACH DETECTED!\n\n🚨 Unauthorized access detected.\n\n⚡ Press F12 IMMEDIATELY to initiate security protocols.\n\n🔒 Time is critical. Protect your system!';
      let i = 0;
      let finalMessage = '';

      // Create dark overlay
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.background = 'rgba(0, 0, 0, 0.85)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = '9998';

      // Create modal
      const modal = document.createElement('div');
      modal.style.background = 'black';
      modal.style.color = 'lime';
      modal.style.fontFamily = 'monospace';
      modal.style.fontSize = '1rem';
      modal.style.padding = '25px';
      modal.style.border = '2px solid lime';
      modal.style.borderRadius = '8px';
      modal.style.maxWidth = '450px';
      modal.style.maxHeight = '80vh';
      modal.style.overflowY = 'auto';
      modal.style.position = 'relative';
      modal.style.boxShadow = '0 0 25px lime';

      // Create close button
      const closeButton = document.createElement('div');
      closeButton.innerHTML = '&times;';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '10px';
      closeButton.style.right = '15px';
      closeButton.style.cursor = 'pointer';
      closeButton.style.fontSize = '1.8rem';
      closeButton.style.color = 'red';
      closeButton.title = 'Close';

      closeButton.onclick = () => {
        document.body.removeChild(overlay);
      };

      // Create message area
      const messageDiv = document.createElement('div');
      messageDiv.style.whiteSpace = 'pre-wrap'; // <--- This line handles spaces & \n properly

      modal.appendChild(closeButton);
      modal.appendChild(messageDiv);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      function typeOut() {
        if (i < message.length) {
          const char = message.charAt(i);
          if (char === '\n') {
            finalMessage += '\n'; // We can keep \n now because pre-wrap will handle it
          } else {
            finalMessage += char;
          }
          messageDiv.innerText = finalMessage;
          i++;
          setTimeout(typeOut, 45); // typing speed
        }
      }

      typeOut();
    }, 10000); // 10 sec delay
  }
})();
