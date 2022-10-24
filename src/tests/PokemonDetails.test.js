import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente PokemonDetails', () => {
  it('1 - Testa se as informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    userEvent.click(details);

    expect(details).not.toBeInTheDocument();

    const hDetails = screen.getByRole('heading', { name: /pikachu details/i });
    const hSummary = screen.getByRole('heading', { name: /summary/i });

    expect(hDetails).toBeInTheDocument();
    expect(hSummary).toBeInTheDocument();

    const resume = screen.getByText(/this intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);

    expect(resume).toBeInTheDocument();
  });

  it('2 - Testa se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    userEvent.click(details);

    const h2 = screen.getAllByRole('heading', { level: 2 });

    expect(h2[2]).toHaveTextContent(/game locations of pikachu/i);

    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);

    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();

    const imgSrc = screen.getAllByRole('img');
    const imgAlt = screen.getAllByAltText(/pikachu location/i);

    expect(imgSrc[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgSrc[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgAlt).toHaveLength(2);
  });

  it('3 - Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    userEvent.click(details);

    const check = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });

    expect(check).toBeInTheDocument();

    userEvent.click(check);

    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(starIcon).toBeInTheDocument();

    userEvent.click(check);

    expect(starIcon).not.toBeInTheDocument();
  });
});
