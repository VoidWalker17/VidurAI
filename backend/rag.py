import json
import chromadb
from sentence_transformers import SentenceTransformer

# Load the model for converting text to vectors
model = SentenceTransformer('all-MiniLM-L6-v2')

# Setup ChromaDB — this is our local vector database
client = chromadb.Client()
collection = client.get_or_create_collection("gita")

def load_gita():
    """Load all Gita verses into ChromaDB if not already loaded"""
    if collection.count() > 0:
        return  # Already loaded, skip

    with open("gita.json", "r") as f:
        verses = json.load(f)

    documents = []
    embeddings = []
    ids = []
    metadatas = []

    for verse in verses:
        text = verse["text"]
        doc_id = f"ch{verse['chapter']}_v{verse['verse']}"
        embedding = model.encode(text).tolist()

        documents.append(text)
        embeddings.append(embedding)
        ids.append(doc_id)
        metadatas.append({
            "chapter": verse["chapter"],
            "verse": verse["verse"]
        })

    collection.add(
        documents=documents,
        embeddings=embeddings,
        ids=ids,
        metadatas=metadatas
    )
    print(f"Loaded {len(verses)} verses into ChromaDB")

def find_relevant_verses(query, n=3):
    """Find the most relevant Gita verses for a given question"""
    query_embedding = model.encode(query).tolist()
    
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n
    )

    verses = []
    for i, doc in enumerate(results["documents"][0]):
        meta = results["metadatas"][0][i]
        verses.append({
            "text": doc,
            "chapter": meta["chapter"],
            "verse": meta["verse"]
        })
    
    return verses