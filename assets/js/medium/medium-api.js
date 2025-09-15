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
      
      const response = await fetch(this.feedUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (data.status !== 'ok') throw new Error('RSS feed fetch failed');

      // Extract just the data you want
      const articles = data.items.map(article => ({
        title: article.title,
        subtitle: this.extractSubtitle(article.description),
        publishDate: new Date(article.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        link: article.link
      }));

      console.log(`✅ Loaded ${articles.length} articles`);
      return articles;
      
    } catch (error) {
      console.error('❌ Error fetching articles:', error);
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
      const articles = await this.fetchArticles();
      const blogCards = document.querySelectorAll('.blog-card');

      if (blogCards.length === 0) {
        console.error('No blog cards found in the page');
        return;
      }

      // Fill up to 4 blog cards (matching your grid)
      const maxCards = Math.min(blogCards.length, articles.length, 4);

      for (let i = 0; i < maxCards; i++) {
        const article = articles[i];
        const card = blogCards[i];

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
      }

    } catch (error) {
      console.error('Error populating blog cards:', error);
      // Show error state
      const blogCards = document.querySelectorAll('.blog-card');
      if (blogCards.length > 0) {
        blogCards[0].innerHTML = `
          <div class="blog-card-content">
            <p style="color: var(--primary-cream); text-align: center; margin: auto;">
              Unable to load articles
            </p>
          </div>
        `;
      }
    }
  }
}

// Auto-initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  const blog = new MediumBlogIntegration('aashimajaiswal');
  blog.populateBlogCards();
});