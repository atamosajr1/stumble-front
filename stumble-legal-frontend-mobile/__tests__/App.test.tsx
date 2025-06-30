/**
 * @format
 */

import 'react-native';
import * as React from 'react';

// Note: test renderer must be required after react-native.
import { create } from 'react-test-renderer';
import RootApp from '../src';

// Note: import explicitly to use the types shipped with jest.
import { it } from '@jest/globals';

it('renders correctly', () => {
  create(<RootApp />);
});
