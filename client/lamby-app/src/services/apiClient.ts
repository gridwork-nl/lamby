import { IMatch } from '../interfaces/interfaces'
const base_url: string = 'http://localhost:3001'

async function getMatch (): Promise<IMatch> {
  return await fetchRequest('/next-match')
}

// Helper function for fetching
async function fetchRequest (path: string, options?: object): Promise<any> {
  return await fetch(base_url + path, options)
    .then(res => res.status < 400 ? res : Promise.reject())
    .then(res => res.status === 204 ? res : res.json())
    .catch(error => console.log(`Error fetching ${path}:`, error))
}

export const api = {
  getMatch
}
