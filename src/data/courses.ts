import { Image as ImageIcon, Video, PenTool } from 'lucide-react';

export const COURSES = [
  {
    id: 'photo-editing',
    titleEn: 'Mastering Photo Editing',
    titleOm: 'Gulaallii Suuraa Ogummaan',
    descriptionEn: 'Learn advanced color grading, retouching, and composition using modern digital tools.',
    descriptionOm: 'Meeshaalee dijitaalaa ammayyaa fayyadamuun halluu sadarkaa olaanaa mijeessuu fi qindeessuu baradhaa.',
    icon: ImageIcon,
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    rating: 4.9,
    students: 1240,
  },
  {
    id: 'graphic-design',
    titleEn: 'Professional Graphic Design',
    titleOm: 'Giraafik Diizaayinii Ogeessaa',
    descriptionEn: 'From core design principles to creating stunning brand identities and UI elements.',
    descriptionOm: 'Qajeeltoowwan diizaayinii bu\'uuraa irraa eegalee mallattoo tuuta cimina qabu fi elementoota UI uumuu.',
    icon: PenTool,
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    rating: 4.8,
    students: 2100,
  },
  {
    id: 'video-editing',
    titleEn: 'Cinematic Video Editing',
    titleOm: 'Gulaallii Viidiyoo Siinimaa',
    descriptionEn: 'Craft compelling narratives through professional cutting, transitions, and audio mixing.',
    descriptionOm: 'Kutaa ogeessaa, ce\'umsaa fi sagalee walmakuudhaan seenaa hawwataa uumuu baradhaa.',
    icon: Video,
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    rating: 5.0,
    students: 890,
  }
];
