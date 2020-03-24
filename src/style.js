import styled, { injectGlobal } from "styled-components";
import { ContentHorizontalPadding, ContentLength, TopNavBarHeight, DesktopMiniWidth } from "./constvars";

injectGlobal`
	html, body, div, span, applet, object, iframe,
	blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, 
	fieldset, form, label, legend,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
	    box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: 0;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
`;

export const MainContainer = styled.div`
  margin-top:${TopNavBarHeight}px;
  background-color: #F8F8F8;
  padding-top:15px;
`

export const ContentContainer = styled.div`
  @media (min-width: ${DesktopMiniWidth}px){
    margin-left:${ContentHorizontalPadding};
    width:${ContentLength};
  }
`

export const TopNavBarContainer = styled.div`
  position:fixed;
  z-index:200;
  top: 0;
  width:100%;
  background-color: white; 
`

