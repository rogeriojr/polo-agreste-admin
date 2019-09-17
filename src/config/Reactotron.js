import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const tron = Reactotron.configure()
  .use(reactotronRedux())
  .use(sagaPlugin()) // <-- sweet
  .connect(); // let's connect!

console.tron = tron;
console.tron.clear();

export default tron;
