import { ChangeDetectionStrategy, Component } from '@angular/core';

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface TimelineItem {
  year: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly stats: Stat[] = [
    { value: '$12,5M', label: 'Revenue in 2025' },
    { value: '12K+', label: 'Orders every day' },
    { value: '725+', label: 'Stores & offices' },
  ];

  protected readonly features: FeatureCard[] = [
    {
      title: '100% Authentic Products',
      description:
        'Every product on our marketplace is verified for authenticity and sourced from trusted partners.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      title: 'Fast Delivery',
      description:
        'Same-day dispatch and next-day delivery on thousands of items, supported by a global logistics network.',
      icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
    },
    {
      title: 'Affordable Price',
      description:
        'Direct partnerships with manufacturers let us offer fair prices without compromising on quality.',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  protected readonly timelineLeft: TimelineItem[] = [
    {
      year: '1997',
      description: 'Founded as a small retail store in downtown with a single storefront.',
    },
    {
      year: '1998',
      description: 'Expanded product range to include consumer electronics and home appliances.',
    },
    {
      year: '2000',
      description: 'Opened our second store and grew the team to over 30 dedicated employees.',
    },
    {
      year: '2002',
      description: 'Launched our very first e-commerce website serving regional customers.',
    },
    {
      year: '2004',
      description: 'Reached 100,000 customers and partnered with major electronics brands.',
    },
    {
      year: '2005',
      description: 'Opened a flagship store and introduced our loyalty rewards program.',
    },
    {
      year: '2006',
      description: 'Crossed $10M in annual revenue and expanded to three new cities.',
    },
    {
      year: '2010',
      description: 'Rebranded as SWOO TECH MART with a focus on technology and lifestyle.',
    },
    {
      year: '2013',
      description: 'Launched mobile apps for iOS and Android with one-click checkout.',
    },
  ];

  protected readonly timelineRight: TimelineItem[] = [
    {
      year: '2014',
      description: 'Opened our 100th store and entered international markets in three regions.',
    },
    {
      year: '2016',
      description: 'Introduced same-day delivery and built our automated fulfillment network.',
    },
    {
      year: '2020',
      description: 'Scaled operations to support remote work and contactless delivery.',
    },
    {
      year: '2021',
      description: 'Reached 500+ stores worldwide and launched our marketplace platform.',
    },
    {
      year: '2022',
      description: 'Partnered with thousands of independent sellers across the globe.',
    },
    {
      year: '2023',
      description: 'Achieved $1B+ in annual GMV and introduced AI-powered recommendations.',
    },
  ];

  protected readonly team: TeamMember[] = [
    {
      name: 'James Anderson',
      role: 'Chairman',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop',
    },
    {
      name: 'Sophia Williams',
      role: 'Vice President',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop',
    },
    {
      name: 'Michael Chen',
      role: 'CEO',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Strategist Director',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop',
    },
    {
      name: 'David Park',
      role: 'CTO',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop',
    },
  ];
}
