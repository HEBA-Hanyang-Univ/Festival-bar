import { createGlobalStyle } from "styled-components";
import PretendardWoff2 from 'assets/fonts/PretendardVariable.woff2';

export default createGlobalStyle `
  @font-face {
    font-family: "Pretendard Variable";
    src: url(${PretendardWoff2}) format("woff2");
  }
`