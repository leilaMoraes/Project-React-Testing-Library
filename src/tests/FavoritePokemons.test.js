import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  it('1 - Testa a mensagem exibida na tela caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavorite = screen.getByText(/no favorite pokemon found/i);

    expect(noFavorite).toBeInTheDocument();
  });

  it('2 - Testa se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    userEvent.click(details);

    const check = screen.getByRole('checkbox');

    userEvent.click(check);

    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favorites);

    const img = screen.getByAltText(/pikachu is marked as favorite/i);

    expect(img).toBeInTheDocument();
  });
});
