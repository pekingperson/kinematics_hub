import requests
from typing import List, Dict, Any

SEMANTIC_SCHOLAR_API_URL = "https://api.semanticscholar.org/graph/v1"

class SemanticScholarClient:
    def search_papers(self, query: str, limit: int = 10) -> List[Dict[str, Any]]:
        params = {
            "query": query,
            "limit": limit,
            "fields": "title,authors,year,abstract,url"
        }
        try:
            response = requests.get(f"{SEMANTIC_SCHOLAR_API_URL}/paper/search", params=params)
            response.raise_for_status()
            data = response.json()
            return data.get("data", [])
        except Exception as e:
            print(f"Error fetching papers: {e}")
            return []

    def get_paper_details(self, paper_id: str) -> Dict[str, Any]:
        params = {
            "fields": "title,authors,year,abstract,url,citations"
        }
        try:
            response = requests.get(f"{SEMANTIC_SCHOLAR_API_URL}/paper/{paper_id}", params=params)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error fetching paper details: {e}")
            return {}
