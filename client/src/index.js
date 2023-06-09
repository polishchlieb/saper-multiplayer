import parseJSX from './parseJSX';
import globalData from './store';
import App from './components/App';

const root = document.querySelector('#root');
root.appendChild(<App />);