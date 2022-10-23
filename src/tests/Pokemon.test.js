import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  it('1 - Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeSrc = screen.getByRole('img');
    const pokeAlt = screen.getByAltText(/pikachu sprite/i);
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pokeName).toHaveTextContent(/pikachu/i);
    expect(pokeType).toHaveTextContent(/electric/i);
    expect(pokeWeight).toHaveTextContent(/average weight: 6.0 kg/i);
    expect(pokeAlt).toBeInTheDocument();
    expect(pokeSrc).toHaveAttribute('src', url);
  });

  it('2 - Testa se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon.', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    expect(details).toHaveAttribute('href', '/pokemons/25');
  });

  it('3 - Testa se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    userEvent.click(details);

    const headings = screen.getAllByRole('heading', { level: 2 });

    expect(headings).toHaveLength(3);
    expect(headings[0]).toHaveTextContent(/pikachu details/i);
    expect(headings[1]).toHaveTextContent(/summary/i);
    expect(headings[2]).toHaveTextContent(/game locations of pikachu/i);
  });

  it('4 - Testa se a URL exibida no navegador muda para `/pokemon/<id>`, onde <id> é o id do pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });

    userEvent.click(details);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/pokemons/25');
  });

  it('5 - Testa se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    userEvent.click(details);

    const check = screen.getByRole('checkbox');

    userEvent.click(check);

    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
