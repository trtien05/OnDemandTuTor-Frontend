import React from 'react'
import { AntdThemeConfig } from './themes/';
import viVN from 'antd/es/locale/vi_VN';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from './themes/globalStyles.ts';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { createStyledBreakpointsTheme } from 'styled-breakpoints';
import { ConfigProvider, App as AppAntd } from 'antd';
// import { Provider } from 'react-redux';
// import { store } from './store';

export const breakpoints = {
  xs: '360px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
} as const;

const theme: DefaultTheme = createStyledBreakpointsTheme({
  breakpoints,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <ConfigProvider locale={viVN} theme={AntdThemeConfig}>
        <AppAntd>
    <App />
        </AppAntd>
        <GlobalStyles />
      </ConfigProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
