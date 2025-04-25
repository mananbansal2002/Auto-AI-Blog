const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

const API_KEY = ''; // 🔐 Replace with env var in prod
const storyDir = path.join(__dirname, '../stories');
const indexPath = path.join(storyDir, 'index.json');

// Hash the content for unique ID
function hashContent(content) {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 6);
}

// Slugify the title
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

function slugExists(slug) {
  return fs.existsSync(path.join(storyDir, `${slug}.md`));
}

async function generateStory() {
  const today = new Date().toISOString().split('T')[0];

  const prompt = `Write a dark and terrifying short story involving cybercrime, a sinister hacker, or an internet anomaly. Make it feel real, deeply unsettling, and immersive. Use raw narration, disturbing visuals, and eerie mood. Avoid sections or headers. Just a creepy, blog-style story. Title it properly.`;

  const response = await axios.post(
    'https://api.mistral.ai/v1/chat/completions',
    {
      model: 'mistral-small',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.95,
      max_tokens: 1024,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const storyText = response.data.choices[0].message.content.trim();

  const lines = storyText.split('\n');
  const rawTitle =
    lines[0].replace(/^#+\s*/, '').trim() || 'Untitled Dark Tale';
  const body = lines.slice(1).join('\n').trim();
  const baseSlug = slugify(rawTitle);
  const hash = hashContent(storyText);
  let slug = `${baseSlug}-${hash}`;
  let counter = 1;

  while (slugExists(slug)) {
    slug = `${baseSlug}-${hash}-${counter++}`;
  }

  const fullContent = `# ${rawTitle}\n\n${body}`;
  fs.writeFileSync(path.join(storyDir, `${slug}.md`), fullContent, 'utf8');

  // === DYNAMIC METADATA GENERATION ===
  const keywords = [
    'hacking',
    'AI',
    'surveillance',
    'deep web',
    'murder',
    'haunted',
    'darknet',
    'ritual',
    'lost footage',
    'anomaly',
  ];
  const perspectives = [
    'first-person',
    'third-person',
    'omniscient',
    'journal entry',
  ];
  const triggers = [
    'disturbing imagery',
    'paranoia',
    'loss of control',
    'identity crisis',
    'disappearance',
    'glitch loops',
  ];
  const soundtracks = [
    'low droning static',
    'abandoned warehouse rain',
    'modem distortion',
    'anxious heartbeats',
    'corrupted lullaby',
  ];

  const estimateReadTime = Math.ceil(body.split(' ').length / 200); // 200 wpm

  const metadata = {
    title: rawTitle,
    date: today,
    estimatedReadTime: `${estimateReadTime} min`,
    narrativePerspective:
      perspectives[Math.floor(Math.random() * perspectives.length)],
    creepFactor: `${Math.floor(Math.random() * 4) + 7}/10`,
    keywords: keywords.sort(() => 0.5 - Math.random()).slice(0, 3),
    triggerWarning: triggers[Math.floor(Math.random() * triggers.length)],
    ambientSound: soundtracks[Math.floor(Math.random() * soundtracks.length)],
  };

  // Save metadata as JSON
  const metaPath = path.join(storyDir, `${slug}.meta.json`);
  fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2), 'utf8');

  // Update index
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  const imageUrl = `https://source.unsplash.com/featured/?dark,cyberpunk,horror,${encodeURIComponent(
    rawTitle
  )}`;

  index.unshift({
    title: rawTitle,
    slug,
    date: today,
    image: imageUrl,
  });

  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');

  console.log(`✅ Story saved as: ${slug}.md`);
}

generateStory().catch((err) => {
  console.error('❌ Failed to generate story:', err.message);
});
