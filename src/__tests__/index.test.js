/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';
import fetcher from '../utils/fetcher';

// Mock fetcher module
jest.mock('../utils/fetcher');

describe('Home Page', () => {
    it('should render the home page correctly', async () => {
        const mockData = {
                "accueil": {
                    heading: 'Accueil',
                    metaDescription: 'Description de la page d\'accueil',
                    imgPost: 'http://example.com/image.jpg',
                    imgWidth: '600',
                    imgHeight: '400',
                    srcset: 'http://example.com/image-2x.jpg 2x',
                    altImg: 'Image d\'accueil',
                    title: 'Titre de la page',
                    contents: '<p>Contenu de la page</p>',
                    paragraphPosts: [
                      { subtitle: 'Premier post', paragraph: '<p>Paragraphe du premier post</p>' },
                      { subtitle: 'Deuxième post', paragraph: '<p>Paragraphe du deuxième post</p>' },
                    ],
                    listPosts: [
                      { title: 'Liste d\'articles', description: '<p>Description de l\'article</p>' }
                    ],
                  },
                  services: [{ id: 1, title: 'Service 1', url: 'SlugServices'  }, { id: 2, title: 'Service 2', url: 'SlugServices'  }],
                  testimonials: {
                    slug: '/temoignages',
                    title: 'Témoignages',
                    contents: 'Contenu des témoignages',
                    paragraphPosts: [{ paragraph: '<p>Paragraphe des témoignages</p>' }],
                  },
            };
    render(<Home {...mockData} />);

    // Vérifiez que les éléments principaux sont rendus correctement
    expect(screen.getByText('Titre de la page')).toBeInTheDocument();
    expect(screen.getByAltText('Image d\'accueil')).toHaveAttribute('src', 'http://example.com/image.jpg');

    // Vérifiez le contenu du premier post
    expect(screen.getByText('Premier post')).toBeInTheDocument();
    expect(screen.getByText('Paragraphe du premier post')).toBeInTheDocument();

    // Vérifiez les services
    mockData.services.forEach(service => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    });

    // Vérifiez les témoignages
    expect(screen.getByText('Témoignages de Clients Satisfaits')).toBeInTheDocument();
    expect(screen.getByText('Contenu des témoignages')).toBeInTheDocument();
    expect(screen.getByText('Paragraphe des témoignages')).toBeInTheDocument();

    // Vérifiez les articles de la liste
    expect(screen.getByText('Liste d\'articles')).toBeInTheDocument();
    expect(screen.getByText('Description de l\'article')).toBeInTheDocument();
  });

});
