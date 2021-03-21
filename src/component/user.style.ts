import { css } from 'lit-element';
export const style = css`
  :host {
    font-size: 14px;
    padding: 10px;
    width: 100vw;
  }

  :host > div {
    background: #1abc9c;
    color: rgb(255, 255, 255);
    cursor: pointer;
    display: block;
    margin: 0;
    padding: 10px;
    position: relative;
    top: 0px;
    width: auto;
  }

  @media (min-width: 768px) {
    :host > div {
      display: inline-block;
      margin: 10px 0;
      width: auto;
    }
  }

  :host > div:hover {
    animation: float 2s infinite ease-in-out;
    top: -5px;
    transition: background .5s;
  }

  :host > .selected {
    background: #9ab5b5;
    color: #ffffff;
  }

  :host > .selected:hover {
    background: #9ab5b5;
    color: #ffffff;
  }

  :host > div h4, :host > div p {
    margin: 0;
  }

  small {
    color: #aaaaaa;
    display: block;
  }

  @keyframes float {
    0% { top: -2px; }
    50% { background: #16a085; box-shadow: 0 10px 30px rgba(0, 0, 0, .2); color: white; top: -5px; }
    100% { color: white; top: -2px; }
  }
`;
