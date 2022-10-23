import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokedex', () => {
  it('1 - Testa se a página contém um heading h2 com o texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);

    const titleAbout = screen.getByRole('heading', { level: 2 });

    expect(titleAbout).toHaveTextContent(/encountered pokémons/i);
  });

  it('2 - Teste se é exibido o próximo pokémon da lista quando o botão `Próximo pokémon` é clicado', () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByText(pokemons[0].name);

    expect(firstPokemon).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(btn);

    const secondPokemon = screen.getByText(pokemons[1].name);

    expect(secondPokemon).toBeInTheDocument();
  });

  it('3 - Testa se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemon1 = screen.getByText(pokemons[0].name);
    const pokemon2 = screen.queryByText(pokemons[1].name);

    expect(pokemon1).toBeInTheDocument();
    expect(pokemon2).not.toBeInTheDocument();
  });

  it('4 - Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByTestId('pokemon-type-button');
    const btnAll = screen.getByRole('button', { name: /all/i });
    const pokeType = 'pokemon-type';

    expect(btnAll).toBeInTheDocument();
    expect(buttons[0]).toHaveTextContent(/electric/i);
    expect(buttons[1]).toHaveTextContent(/fire/i);
    expect(buttons[2]).toHaveTextContent(/bug/i);
    expect(buttons[3]).toHaveTextContent(/poison/i);
    expect(buttons[4]).toHaveTextContent(/psychic/i);
    expect(buttons[5]).toHaveTextContent(/normal/i);
    expect(buttons[6]).toHaveTextContent(/dragon/i);

    userEvent.click(buttons[0]);
    const pokeElectric = screen.getByTestId(pokeType);
    expect(pokeElectric).toHaveTextContent(/electric/i);

    userEvent.click(buttons[1]);
    const pokeFire = screen.getByTestId(pokeType);
    expect(pokeFire).toHaveTextContent(/fire/i);

    userEvent.click(buttons[2]);
    const pokeBug = screen.getByTestId(pokeType);
    expect(pokeBug).toHaveTextContent(/bug/i);

    userEvent.click(buttons[3]);
    const pokePoison = screen.getByTestId(pokeType);
    expect(pokePoison).toHaveTextContent(/poison/i);

    userEvent.click(buttons[4]);
    const pokePsychic = screen.getByTestId(pokeType);
    expect(pokePsychic).toHaveTextContent(/psychic/i);

    userEvent.click(buttons[5]);
    const pokeNormal = screen.getByTestId(pokeType);
    expect(pokeNormal).toHaveTextContent(/normal/i);

    userEvent.click(buttons[6]);
    const pokeDragon = screen.getByTestId(pokeType);
    expect(pokeDragon).toHaveTextContent(/dragon/i);
  });

  it('5 - Testa se a Pokédex contém um botão para resetar o filtro', () => {
    screen.logTestingPlaygroundURL();
    renderWithRouter(<App />);

    const btn = screen.getAllByRole('button');

    expect(btn[0]).toHaveTextContent(/all/i);
    expect(btn[0]).toBeInTheDocument();

    userEvent.click(btn[0]);
    const poke = screen.getByTestId('pokemon-type');
    expect(poke).toHaveTextContent(/electric/i);
  });
});
