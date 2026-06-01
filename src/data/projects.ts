export type ProjectSlide = {
  id: string
  image: string
  title?: string
  subtitle?: string
}

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  date: string
  location: string
  client: string
  services: string[]
  slides: ProjectSlide[]
}

export const projects: Project[] = [
  {
    id: 'summer-festival',
    title: 'Summer Festival 2025',
    subtitle: 'Live music · Night market · Community',
    description:
      'Full-day coverage of a city summer festival — stage performances, food stalls, and crowd energy from golden hour through night.',
    date: 'July 2025',
    location: 'Ho Chi Minh City',
    client: 'City Events Co.',
    services: ['Event photography', 'Social content', 'Highlight reel'],
    slides: [
      {
        id: 'sf-1',
        image:
          'https://images.unsplash.com/photo-1533174072545-7a4b6ecd7ba0?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'sf-2',
        image:
          'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'sf-3',
        image:
          'https://images.unsplash.com/photo-1459749411176-04bf1e2f9a0c?auto=format&fit=crop&w=2400&q=80',
      },
    ],
  },
  {
    id: 'brand-launch',
    title: 'Aurora Brand Launch',
    subtitle: 'Product reveal · Press · Pop-up experience',
    description:
      'Launch event for Aurora skincare — minimalist set design, product hero shots, and candid moments with press and guests.',
    date: 'March 2025',
    location: 'District 1, HCMC',
    client: 'Aurora Beauty',
    services: ['Brand launch', 'Product shots', 'Press kit'],
    slides: [
      {
        id: 'bl-1',
        image:
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'bl-2',
        image:
          'https://images.unsplash.com/photo-1505373877841-8d25f0024713?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'bl-3',
        image:
          'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2400&q=80',
      },
    ],
  },
  {
    id: 'wedding',
    title: 'Lan & Minh Wedding',
    subtitle: 'Ceremony · Reception · Golden hour',
    description:
      'An intimate wedding celebrating Lan and Minh — from morning preparation to reception dances and sunset portraits.',
    date: 'November 2024',
    location: 'Da Lat',
    client: 'Private',
    services: ['Wedding day', 'Couple portraits', 'Album design'],
    slides: [
      {
        id: 'wd-1',
        image:
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'wd-2',
        image:
          'https://images.unsplash.com/photo-1465495976277-31e412f8eb83?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'wd-3',
        image:
          'https://images.unsplash.com/photo-1522673607211-f43e9cfa6da7?auto=format&fit=crop&w=2400&q=80',
      },
    ],
  },
  {
    id: 'corporate',
    title: 'Tech Summit 2025',
    subtitle: 'Keynotes · Networking · Exhibition hall',
    description:
      'Two-day tech conference coverage — keynote speakers, panel discussions, exhibition booths, and networking sessions.',
    date: 'May 2025',
    location: 'Singapore',
    client: 'TechForward Asia',
    services: ['Conference', 'Speaker portraits', 'Sponsor deliverables'],
    slides: [
      {
        id: 'ts-1',
        image:
          'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'ts-2',
        image:
          'https://images.unsplash.com/photo-1560439274552-b7fdfee0ad42?auto=format&fit=crop&w=2400&q=80',
      },
      {
        id: 'ts-3',
        image:
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2400&q=80',
      },
    ],
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
