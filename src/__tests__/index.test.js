/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';

// Mock fetcher module

describe('Home Page', () => {
  it('should render the home page correctly', async () => {
    const mockData = {
      accueil: {
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
          { title: 'Liste d\'articles', description: '<p>Description de l\'article</p>' },
        ],
      },
      services: [{ id: 1, title: 'Service 1', url: 'SlugServices' }, { id: 2, title: 'Service 2', url: 'SlugServices' }],
      testimonials: {
        slug: '/temoignages',
        title: 'Témoignages',
        contents: 'Contenu des témoignages',
        paragraphPosts: [{ paragraph: '<p>Paragraphe des témoignages</p>' }],
      },
      reviews: {
        html_attributions: [],
        result: {
          address_components: [
            {
              long_name: '71',
              short_name: '71',
              types: [
                'street_number',
              ],
            },
            {
              long_name: 'Rue Marie Curie',
              short_name: 'Rue Marie Curie',
              types: [
                'route',
              ],
            },
            {
              long_name: 'Garennes-sur-Eure',
              short_name: 'Garennes-sur-Eure',
              types: [
                'locality',
                'political',
              ],
            },
            {
              long_name: 'Eure',
              short_name: 'Eure',
              types: [
                'administrative_area_level_2',
                'political',
              ],
            },
            {
              long_name: 'Normandie',
              short_name: 'Normandie',
              types: [
                'administrative_area_level_1',
                'political',
              ],
            },
            {
              long_name: 'France',
              short_name: 'FR',
              types: [
                'country',
                'political',
              ],
            },
            {
              long_name: '27780',
              short_name: '27780',
              types: [
                'postal_code',
              ],
            },
          ],
          adr_address: '<span class="street-address">71 Rue Marie Curie</span>, <span class="postal-code">27780</span> <span class="locality">Garennes-sur-Eure</span>, <span class="country-name">France</span>',
          business_status: 'OPERATIONAL',
          current_opening_hours: {
            open_now: true,
            periods: [
              {
                close: {
                  date: '2024-09-09',
                  day: 1,
                  time: '1800',
                },
                open: {
                  date: '2024-09-09',
                  day: 1,
                  time: '0900',
                },
              },
              {
                close: {
                  date: '2024-09-10',
                  day: 2,
                  time: '1800',
                },
                open: {
                  date: '2024-09-10',
                  day: 2,
                  time: '0900',
                },
              },
              {
                close: {
                  date: '2024-09-04',
                  day: 3,
                  time: '1800',
                },
                open: {
                  date: '2024-09-04',
                  day: 3,
                  time: '0900',
                },
              },
              {
                close: {
                  date: '2024-09-05',
                  day: 4,
                  time: '1800',
                },
                open: {
                  date: '2024-09-05',
                  day: 4,
                  time: '0900',
                },
              },
              {
                close: {
                  date: '2024-09-06',
                  day: 5,
                  time: '1800',
                },
                open: {
                  date: '2024-09-06',
                  day: 5,
                  time: '0900',
                },
              },
            ],
            weekday_text: [
              'lundi: 09:00 – 18:00',
              'mardi: 09:00 – 18:00',
              'mercredi: 09:00 – 18:00',
              'jeudi: 09:00 – 18:00',
              'vendredi: 09:00 – 18:00',
              'samedi: Fermé',
              'dimanche: Fermé',
            ],
          },
          delivery: false,
          formatted_address: '71 Rue Marie Curie, 27780 Garennes-sur-Eure, France',
          formatted_phone_number: '02 32 26 49 58',
          geometry: {
            location: {
              lat: 48.9142123,
              lng: 1.433727,
            },
            viewport: {
              northeast: {
                lat: 48.91556128029151,
                lng: 1.435075980291502,
              },
              southwest: {
                lat: 48.91286331970851,
                lng: 1.432378019708498,
              },
            },
          },
          icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
          icon_background_color: '#7B9EB0',
          icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
          international_phone_number: '+33 2 32 26 49 58',
          name: 'Une Taupe Chez Vous - Taupier piégeur',
          opening_hours: {
            open_now: true,
            periods: [
              {
                close: {
                  day: 1,
                  time: '1800',
                },
                open: {
                  day: 1,
                  time: '0900',
                },
              },
              {
                close: {
                  day: 2,
                  time: '1800',
                },
                open: {
                  day: 2,
                  time: '0900',
                },
              },
              {
                close: {
                  day: 3,
                  time: '1800',
                },
                open: {
                  day: 3,
                  time: '0900',
                },
              },
              {
                close: {
                  day: 4,
                  time: '1800',
                },
                open: {
                  day: 4,
                  time: '0900',
                },
              },
              {
                close: {
                  day: 5,
                  time: '1800',
                },
                open: {
                  day: 5,
                  time: '0900',
                },
              },
            ],
            weekday_text: [
              'lundi: 09:00 – 18:00',
              'mardi: 09:00 – 18:00',
              'mercredi: 09:00 – 18:00',
              'jeudi: 09:00 – 18:00',
              'vendredi: 09:00 – 18:00',
              'samedi: Fermé',
              'dimanche: Fermé',
            ],
          },
          photos: [
            {
              height: 630,
              html_attributions: [
                '<a href="https://maps.google.com/maps/contrib/105944466376776412532">Une Taupe Chez Vous - Taupier piégeur</a>',
              ],
              photo_reference: 'AXCi2Q5nQUDb06lK0u7eN4hDdEMVJ2Ck3lPveZrHmWaY_oOAsBtlv4L-UGGLb0zXP90me3-jtxu24-VxTUFbFCtDLTCZei4EZUiIWJN0rq5YPa9Lp0ngYxiJQdkeWDLQ7a0lnlZrpqC1jwu5b2UTYyerfFFSAaSFqsdd3T_yVZxDsGbSjjb3',
              width: 630,
            },
            {
              height: 1024,
              html_attributions: [
                '<a href="https://maps.google.com/maps/contrib/105944466376776412532">Une Taupe Chez Vous - Taupier piégeur</a>',
              ],
              photo_reference: 'AXCi2Q5em38H8I5q43nX1vpWXJy1314AmS67j0l3bo6Ke5yJymVvwQ14F55qpZ0BTQnME5kqKPON8kjfF8ihANHPgDCxl6XJdDdWfV8CNRi-U0ha1iG0W_RK7qmjzkGK94k0z06gQum-QLjHV-svUMDjT4U0wecZllXDMaPKkiQvetNPjtMT',
              width: 768,
            },
            {
              height: 956,
              html_attributions: [
                '<a href="https://maps.google.com/maps/contrib/105944466376776412532">Une Taupe Chez Vous - Taupier piégeur</a>',
              ],
              photo_reference: 'AXCi2Q6efh4KkFiLCcEOek3CPnkQ6EcRXkLz-FKaIc7ouqiJNM_a-aqY67PGa1IEdg2JqtbhpjyIpr7sryR9zj6EdR43UkHFaKAcyySjE3F6g4I7OwJjAdZaI8k5iE2WpP4_guBY2Zn7MKembCQaXyqr3P8Cu42PuycihoKudrjXseB_f8A3',
              width: 1280,
            },
            {
              height: 768,
              html_attributions: [
                '<a href="https://maps.google.com/maps/contrib/105944466376776412532">Une Taupe Chez Vous - Taupier piégeur</a>',
              ],
              photo_reference: 'AXCi2Q4GD9h8TJMRGidF2BpZ37R_mRECSY7sXMK1aKd9v7IikUKlOcm-uAcQL49okiKktul5A8TZDjIW66PcY_OAKFYNShrcmMIP5WxRRT2u6RYymKXWrSlF4REdroBEHvjIwEF1nYUGeSo3kSn0WVXXfruRoh7AaxEnbUuY37p38s6m3Jig',
              width: 1024,
            },
            {
              height: 1024,
              html_attributions: [
                '<a href="https://maps.google.com/maps/contrib/105944466376776412532">Une Taupe Chez Vous - Taupier piégeur</a>',
              ],
              photo_reference: 'AXCi2Q74ztoR-RB-p09_n7Yw1uZ_pVoHHg69fnhETDFdl_HGPMJPRGDiv4BbvQpkGUMBcWG_Wdrr7sWTwcL7UpwCJECXORtaNOtOYXGQ-xL-ldQLBpFD2VBh6RMYO1t-cEmRVD_0qUz0u139RJkVnxuoNEYUsfbXtqjSSnRqGLdiBm4YxaBu',
              width: 768,
            },
            {
              height: 768,
              html_attributions: [
                '<a href="https://maps.google.com/maps/contrib/105944466376776412532">Une Taupe Chez Vous - Taupier piégeur</a>',
              ],
              photo_reference: 'AXCi2Q5LtwgmCrJBnPdI7lAarQe8W3n-tCE14XIiwjx0-OsdjHdQdv3zQiP3Dj0vYoLJmv-_T8bTLGpeSJVu4_RrnIa1DdeNl7sCTjZ7aZWScYA9BEiJBdSjo_3O_ULxPIWeULi1hA1A1-c9WjhMyw3CpG7DGljvAAe2G2yptrlVqp04apn2',
              width: 1024,
            },
          ],
          place_id: 'ChIJ9dFzhQCz5kcRRjbu7MbGXhY',
          plus_code: {
            compound_code: 'WC7M+MF Garennes-sur-Eure, France',
            global_code: '8FW3WC7M+MF',
          },
          rating: 5,
          reference: 'ChIJ9dFzhQCz5kcRRjbu7MbGXhY',
          reviews: [
            {
              author_name: 'lau. C',
              author_url: 'https://www.google.com/maps/contrib/105188557586704262972/reviews',
              language: 'fr',
              original_language: 'fr',
              profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjXtzH7pboFjDJjEudZGarve8gHrZuFhK2wMGqsmO3GheLtAnPE=s128-c0x00000000-cc-rp-mo-ba2',
              rating: 5,
              relative_time_description: 'il y a 5 mois',
              text: "Après avoir essayé les repulsif, les anti-taupes sans resulats, j'ai contacté l'entreprise en debut fevrier 2024 qui m'a débarrassé des nuisibles\n\n10/10",
              time: 1710319434,
              translated: false,
            },
            {
              author_name: 'Googgy',
              author_url: 'https://www.google.com/maps/contrib/101144438363285276942/reviews',
              language: 'fr',
              original_language: 'fr',
              profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocJ7zNY4Da0zophDKdApp62wumspRMoWF411YZspe1Zg2KL7HQ=s128-c0x00000000-cc-rp-mo',
              rating: 5,
              relative_time_description: 'il y a 5 ans',
              text: "Excellent taupier. C'est simple, il a littéralement exterminé toutes les colonies sur 5 ha en une saison. Rien à voir par rapport à un autre prestataire que nous avions eu avant lui qui passait à peine 10 minutes sur place à chaque passage, sans résultat au final! De plus il utilise une méthode mécanique (pièges) sans utilisation de produits chimiques. On sent que Monsieur Théneau est passionné par son métier et quand il vient, il travaille bien. Un honnête homme et qui plus est, très sympathique. A recommander sans hésiter.",
              time: 1558020271,
              translated: false,
            },
            {
              author_name: 'Cyril Murat',
              author_url: 'https://www.google.com/maps/contrib/114455799368557072727/reviews',
              language: 'fr',
              original_language: 'fr',
              profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjUe6vXzCYwP0XxL5ozXprPjIS-Fqm2N4lz6Tkan_9mr9bUcIqgA=s128-c0x00000000-cc-rp-mo-ba3',
              rating: 5,
              relative_time_description: 'il y a un an',
              text: 'Quel professionnalisme j ai fait appel à leur service tout était parfait je recommande parfarecommfortement',
              time: 1685188369,
              translated: false,
            },
            {
              author_name: 'Dorian Salcedo',
              author_url: 'https://www.google.com/maps/contrib/112412815975335042292/reviews',
              language: 'fr',
              original_language: 'fr',
              profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocKdQCp3hWqLsiebFvyTb1elN64QkSP6pZn45j5_FSuTM2vWQQ=s128-c0x00000000-cc-rp-mo-ba3',
              rating: 5,
              relative_time_description: 'il y a un an',
              text: 'Appelé pour des problèmes de taupe l’entreprise a été de très bon conseil et m’a aidé à me débarrasser des taupes',
              time: 1680795591,
              translated: false,
            },
            {
              author_name: 'Paul Delaurier',
              author_url: 'https://www.google.com/maps/contrib/114402624495737780661/reviews',
              language: 'fr',
              original_language: 'fr',
              profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocJBljOuKWtRysVuE_rzXOvINpWWmLv1Kxcn8EPGq_BUuQXD_g=s128-c0x00000000-cc-rp-mo-ba4',
              rating: 5,
              relative_time_description: 'il y a un an',
              text: 'Très efficace je les recommande les yeux fermés',
              time: 1686289976,
              translated: false,
            },
          ],
          types: [
            'point_of_interest',
            'establishment',
          ],
          url: 'https://maps.google.com/?cid=1611944274326074950',
          user_ratings_total: 7,
          utc_offset: 120,
          vicinity: '71 Rue Marie Curie, Garennes-sur-Eure',
          website: 'https://unetaupechezvous.fr/',
        },
        status: 'OK',
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
    mockData.services.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    });

    // Vérifiez les articles de la liste
    expect(screen.getByText('Liste d\'articles')).toBeInTheDocument();
    expect(screen.getByText('Description de l\'article')).toBeInTheDocument();
  });
});
