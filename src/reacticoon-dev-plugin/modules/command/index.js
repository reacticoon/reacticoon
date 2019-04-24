import { createModule } from 'reacticoon/module';

import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';

const CommandModule = createModule('ReacticoonDev::CommandModule', {
  actions,
  reducer,
  selectors,
});

export default CommandModule;