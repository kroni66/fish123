import { DirectusStorage } from '../server/directus-storage.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const storage = new DirectusStorage();
    const categories = await storage.getCategories();
    res.json(categories);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    res.status(500).json({
      message: 'Failed to fetch categories',
      error: 'Categories collection not accessible'
    });
  }
}
