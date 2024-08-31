const { exec } = require('child_process');
require('dotenv').config();
const fetch = require('node-fetch');

async function fetcher(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erreur de requête: ${response.statusText}`);
    }
    return response.json();
}

describe('Vérification de toutes les pages', () => {
    let pagesToCheck = [];
    const errorPageUrl = '/non-existent-page';
    beforeAll(async () => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}posts/all`;
        const data = await fetcher(apiUrl);
        pagesToCheck = data;
    });

    test('Il doit y avoir des pages à tester', () => {
        expect(pagesToCheck.length).toBeGreaterThan(0);
    });

    test('Chaque page doit renvoyer un code 200 via curl', async () => {
        const results = await Promise.all(
            pagesToCheck.map((page) => {
                const fullUrl = `${process.env.NEXT_PUBLIC_URL}${page.url}`;
                return new Promise((resolve) => {
                    exec(`curl -o /dev/null -s -w "%{http_code}" ${fullUrl}`, (error, stdout) => {
                        if (error) {
                            console.error(`Erreur lors de l'appel curl pour la page ${fullUrl}:`, error);
                            resolve({ page, status: 'Erreur' });
                        } else {
                            resolve({ page, status: parseInt(stdout, 10) });
                        }
                    });
                });
            })
        );

        results.forEach(({ page, status }) => {
            expect(status).toBe(200);
            console.error(`Erreur pour la page ${page.title}:`, error);
        });
    });

    test('La page d\'erreur doit renvoyer un code 404', async () => {
        const fullErrorUrl = `${process.env.NEXT_PUBLIC_URL}${errorPageUrl}`;
        const responseCode = await new Promise((resolve) => {
            exec(`curl -o /dev/null -s -w "%{http_code}" ${fullErrorUrl}`, (error, stdout) => {
                if (error) {
                    console.error(`Erreur lors de l'appel curl pour la page ${fullErrorUrl}:`, error);
                    resolve('Erreur');
                } else {
                    resolve(parseInt(stdout, 10));
                }
            });
        });

        expect(responseCode).toBe(404); // Vérifiez que le statut est 404
        console.log(`La page d'erreur a renvoyé le code ${responseCode}`);
    });
});
