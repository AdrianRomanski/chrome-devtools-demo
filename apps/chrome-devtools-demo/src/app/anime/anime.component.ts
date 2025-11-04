import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Anime {
  id: number;
  name: string;
  description: string;
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
      name: 'Demon Slayer: Kimetsu no Yaiba',
      description: 'A young boy named Tanjiro becomes a demon slayer to save his sister and avenge his family after they are killed by demons.',
    },
    {
      id: 2,
      name: 'Attack on Titan',
      description: 'Humanity fights for survival against giant humanoid Titans that threaten to destroy civilization.',
    },
    {
      id: 3,
      name: 'One Piece',
      description: 'The adventures of Monkey D. Luffy and his pirate crew in search of the legendary treasure known as One Piece.',
    },
    {
      id: 4,
      name: 'My Hero Academia',
      description: 'In a world where most people have superpowers, a boy without powers dreams of becoming a hero.',
    },
    {
      id: 5,
      name: 'Jujutsu Kaisen',
      description: 'A high school student becomes a sorcerer to fight cursed spirits and protect humanity.',
    },
    {
      id: 6,
      name: 'Naruto',
      description: 'A young ninja seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.',
    },
  ];
}

