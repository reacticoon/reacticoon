import { createModule } from 'reacticoon/module';

import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';

const CheckupModule = createModule('ReacticoonDev::CheckupModule', {
  actions,
  reducer,
  selectors,
});

export default CheckupModule;