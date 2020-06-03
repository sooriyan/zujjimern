import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
    font-variant: small-caps
  }
  nav{
    transition: all 0.25s linear;
  }
  table{
    transition: all 0.25s linear;
  }
  a {
    color: ${({ theme }) => theme.text}!important;
    text-decoration:none
  }
  a:hover{
    color: ${({ theme }) => theme.text};
    text-decoration:none
  }
  .modal-content{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  .paper {
    background-color: ${({ theme }) => theme.paper};
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin: 10px;
  }
  .card{
    background-color: ${({ theme }) => theme.paper};
  }
  .footer_paper{
    background-color: ${({ theme }) => theme.paper};
  }
  `;
