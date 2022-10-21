import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente NotFound', () => {
  it('1 - Testa se a página contém um heading h2 com o texto `Page requested not found`', () => {
    renderWithRouter(<NotFound />);

    const titleAbout = screen.getByRole('heading', { level: 2 });

    expect(titleAbout).toHaveTextContent(/page requested not found/i);
  });

  it('2 - Testa se a página contém a imagem:', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByRole('img');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toHaveAttribute('src', url);
  });
});
