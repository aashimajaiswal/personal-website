// js/medium/medium-api.js
// Medium RSS integration for Aashima's portfolio

class MediumBlogIntegration {
  constructor(username) {
    this.username = username;
    this.feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`;
  }

  async fetchArticles() {
    try {
      console.log('📖 Fetching Medium articles...');
      console.log('🔗 Feed URL:', this.feedUrl);

      // Add timeout and better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(this.feedUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });

      clearTimeout(timeoutId);

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 API Response:', data);

      if (data.status !== 'ok') {
        throw new Error(`RSS feed fetch failed: ${data.message || 'Unknown error'}`);
      }

      if (!data.items || data.items.length === 0) {
        console.warn('⚠️ No articles found in RSS feed');
        return [];
      }

      // Extract just the data you want
      const articles = data.items.slice(0, 4).map(article => ({
        title: article.title || 'Untitled',
        publishDate: new Date(article.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        link: article.link || '#'
      }));

      console.log(`✅ Loaded ${articles.length} articles:`, articles);
      return articles;

    } catch (error) {
      console.error('❌ Error fetching articles:', error);
      console.error('❌ Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      return [];
    }
  }

  extractSubtitle(description) {
    // Clean HTML and get first sentence as subtitle
    const cleanText = description.replace(/<[^>]*>/g, '').trim();
    const firstSentence = cleanText.split('.')[0];
    return firstSentence.length > 80 ? firstSentence.substring(0, 80) + '...' : firstSentence + '.';
  }

  async populateBlogCards() {
    try {
      console.log('🎯 Starting blog card population...');

      const blogCards = document.querySelectorAll('.blog-card');
      console.log(`🎴 Found ${blogCards.length} blog cards`);

      if (blogCards.length === 0) {
        console.error('❌ No blog cards found in the page');
        return;
      }

      const articles = await this.fetchArticles();
      console.log(`📝 Retrieved ${articles.length} articles`);

      if (articles.length === 0) {
        console.warn('⚠️ No articles available, showing fallback message');
        this.showFallbackMessage(blogCards);
        return;
      }

      // Fill up to 4 blog cards (matching your grid)
      const maxCards = Math.min(blogCards.length, articles.length, 4);
      console.log(`🔢 Will populate ${maxCards} cards`);

      for (let i = 0; i < maxCards; i++) {
        const article = articles[i];
        const card = blogCards[i];

        console.log(`📄 Populating card ${i + 1} with: "${article.title}"`);

        card.innerHTML = `
          <div class="blog-card-content">
            <div class="blog-card-header">
              <h3 class="blog-card-title">${article.title}</h3>
              <time class="blog-card-date">${article.publishDate}</time>
            </div>
            <a href="${article.link}" target="_blank" rel="noopener" class="blog-card-link">
              Read More →
            </a>
          </div>
        `;

        // Make the entire card clickable
        card.addEventListener('click', (e) => {
          if (e.target.tagName !== 'A') {
            window.open(article.link, '_blank');
          }
        });

        // Add cursor pointer style
        card.style.cursor = 'pointer';
      }

      // If there are fewer articles than cards, hide empty cards
      for (let i = maxCards; i < blogCards.length; i++) {
        blogCards[i].style.display = 'none';
        console.log(`🙈 Hiding empty card ${i + 1}`);
      }

      console.log('✅ Blog card population completed successfully');

    } catch (error) {
      console.error('❌ Error populating blog cards:', error);
      this.showFallbackMessage(document.querySelectorAll('.blog-card'));
    }
  }

  showFallbackMessage(blogCards) {
    if (blogCards.length > 0) {
      blogCards[0].innerHTML = `
        <div class="blog-card-content" style="display: flex; align-items: center; justify-content: center; text-align: center;">
          <div>
            <p style="color: var(--primary-cream); margin: 0 0 1rem 0; font-size: 1rem;">
              ✍️ Check out my latest articles
            </p>
            <a href="https://medium.com/@aashimajaiswal" target="_blank" style="color: var(--primary-cream); text-decoration: underline;">
              Visit Medium →
            </a>
          </div>
        </div>
      `;

      // Hide other cards
      for (let i = 1; i < blogCards.length; i++) {
        blogCards[i].style.display = 'none';
      }
    }
  }
}

// Auto-initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  const blog = new MediumBlogIntegration('aashimajaiswal');
  blog.populateBlogCards();
});