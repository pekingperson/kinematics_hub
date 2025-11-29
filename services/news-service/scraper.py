import feedparser
from typing import List, Dict, Any

# Example feeds (using some generic tech/robotics feeds or placeholders)
FEEDS = [
    "https://spectrum.ieee.org/feeds/topic/robotics.rss",
    "https://www.sciencedaily.com/rss/matter_energy/robotics.xml",
]

class NewsScraper:
    def get_news(self, limit: int = 20) -> List[Dict[str, Any]]:
        all_entries = []
        for url in FEEDS:
            try:
                feed = feedparser.parse(url)
                for entry in feed.entries:
                    all_entries.append({
                        "title": entry.title,
                        "link": entry.link,
                        "published": entry.get("published", ""),
                        "summary": entry.get("summary", ""),
                        "source": feed.feed.get("title", "Unknown Source")
                    })
            except Exception as e:
                print(f"Error parsing feed {url}: {e}")
        
        # Sort by published date (simple string sort for MVP, better to parse date)
        # all_entries.sort(key=lambda x: x['published'], reverse=True)
        return all_entries[:limit]
