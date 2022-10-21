import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente About', () => {
  it('1 - Testa se a página contém um heading h2 com o texto `About Pokédex`', () => {
    renderWithRouter(<About />);

    const titleAbout = screen.getByRole('heading', { level: 2 });

    expect(titleAbout).toHaveTextContent(/about pokédex/i);
  });

  it('2 - Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const p1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    const p2 = screen.getByText('One can filter Pokémons by type, and see more details for each one of them');

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('3 - Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toHaveAttribute('src', url);
  });
});
