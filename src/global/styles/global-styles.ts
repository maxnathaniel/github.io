import { createGlobalStyle } from './base-styles';
import Pulse from '../../../fonts/Pulse.otf';
import Heisman from '../../../fonts/Heisman.ttf';

// we can create a proper style theme for light and dark theme
// we just need to set defaults such as
/**
 * const default = {
 * lightTheme: {
 *  buttons: {
 *  color: '#FFF',
 *  background: '#FFF',
 *  },
 * }
 */
export const GlobalStyle = createGlobalStyle<any>`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    margin: 0;
    color: #FFF;
  }
  @font-face {
    font-family: 'Pulse';
    src: url(${Pulse}) format('otf');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Heisman';
    src: url(${Heisman}) format('ttf');
    font-weight: 700;
    font-style: normal;
  }
  /* Sets the dimensions of the entire scrollbar */
  html::-webkit-scrollbar {
      width: 30px;
      height: 30px;
  }

  /* The grabbable scrollbar button  */
  html::-webkit-scrollbar-thumb {
      background: -webkit-gradient(linear,left top,left bottom,from(#1f4037),to(#99f2c8));
      background: linear-gradient(180deg,#1f4037,#99f2c8);
      border-radius: 30px;
      box-shadow: inset 2px 2px 2px hsla(0,0%,100%,.25), inset -2px -2px 2px rgba(0,0,0,.25);
  }

  /* The vertical scrollbar background */
  html::-webkit-scrollbar-track {
      background: linear-gradient(90deg,#201c29,#201c29 1px,#100e17 0,#100e17);
  }
  body {
    font-family: Pulse, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  body.fontLoaded {
    font-family: Pulse, 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  #app {
    background-color: #282828;
    min-height: 100vh;
    width: 100%;
  }
  h1 {
    font-family: Heisman, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .ui.fluid.input > input {
    height: 40px !important;
    border: 1px solid #005f7b !important;
    padding: 10px !important;
  }
  .ui.fluid.input > input:: placeholder {
    padding: 5px;
  }
  .ui.fluid.input > input {
    border: 3px solid #03DAC5 !important;
  }
  .ui.fluid.input > input::placeholder {
    color: #7d7b7b !important;
  }
`;

export default GlobalStyle;
