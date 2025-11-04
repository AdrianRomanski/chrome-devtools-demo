import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Anime {
  id: number;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-anime',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.scss',
})
export class AnimeComponent {
  animes: Anime[] = [
    {
      id: 1,
      title: 'Naruto',
      description: 'The story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'One Piece',
      description: 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger.',
      image: 'https://images.unsplash.com/photo-1544877857-5c1e8f6e1b9f?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'Attack on Titan',
      description: 'Humanity lives inside cities surrounded by enormous walls that protect them from gigantic man-eating humanoids referred to as Titans.',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      title: 'Demon Slayer',
      description: 'A boy becomes a demon slayer after his family is slaughtered and his sister is turned into a demon.',
      image: 'https://images.unsplash.com/photo-1544877857-5c1e8f6e1b9f?w=400&h=300&fit=crop',
    },
    {
      id: 5,
      title: 'My Hero Academia',
      description: 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=300&fit=crop',
    },
    {
      id: 6,
      title: 'Death Note',
      description: 'A high school student discovers a supernatural notebook that allows him to kill anyone by writing the victim\'s name while picturing their face.',
      image: 'https://images.unsplash.com/photo-1544877857-5c1e8f6e1b9f?w=400&h=300&fit=crop',
    },
  ];
}
