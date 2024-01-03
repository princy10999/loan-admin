// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
