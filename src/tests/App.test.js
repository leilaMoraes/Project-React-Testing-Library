import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App', () => {
  it('1 - Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favorite = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('2 - Testa se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });

    userEvent.click(home);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('3 - Teste se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });

    userEvent.click(about);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('4 - Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favorite);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('5 - Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/not-found');
    });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/not-found');
  });
});
