import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

type Anime = {
  title: string;
  studio: string;
  year: number;
  rating: string;
  genre: string;
  image: string;
};

@Component({
  selector: 'app-animes',
  imports: [NgOptimizedImage],
  templateUrl: './animes.html',
  styleUrl: './animes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Animes {
  protected readonly animes: Anime[] = [
    {
      title: 'Attack on Titan',
      studio: 'MAPPA',
      year: 2013,
      rating: '9.1',
      genre: 'Action · Dark Fantasy',
      image:
        'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Fullmetal Alchemist: Brotherhood',
      studio: 'Bones',
      year: 2009,
      rating: '9.2',
      genre: 'Adventure · Fantasy',
      image:
        'https://images.unsplash.com/photo-1526481280695-3c469c2f88b8?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Demon Slayer',
      studio: 'ufotable',
      year: 2019,
      rating: '8.7',
      genre: 'Action · Supernatural',
      image:
        'https://images.unsplash.com/photo-1521005638249-3b22c439e92f?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Jujutsu Kaisen',
      studio: 'MAPPA',
      year: 2020,
      rating: '8.8',
      genre: 'Action · Supernatural',
      image:
        'https://images.unsplash.com/photo-1522120692336-0a56b6b9f490?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Spy × Family',
      studio: 'WIT Studio · CloverWorks',
      year: 2022,
      rating: '8.6',
      genre: 'Comedy · Slice of Life',
      image:
        'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Chainsaw Man',
      studio: 'MAPPA',
      year: 2022,
      rating: '8.5',
      genre: 'Action · Dark Fantasy',
      image:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'My Hero Academia',
      studio: 'Bones',
      year: 2016,
      rating: '8.3',
      genre: 'Action · Superhero',
      image:
        'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Haikyuu!!',
      studio: 'Production I.G',
      year: 2014,
      rating: '8.8',
      genre: 'Sports · Drama',
      image:
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Mob Psycho 100',
      studio: 'Bones',
      year: 2016,
      rating: '8.8',
      genre: 'Action · Comedy',
      image:
        'https://images.unsplash.com/photo-1504271863819-d0b1ceab0bff?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Made in Abyss',
      studio: 'Kinema Citrus',
      year: 2017,
      rating: '8.6',
      genre: 'Adventure · Dark Fantasy',
      image:
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    },
  ];
}
