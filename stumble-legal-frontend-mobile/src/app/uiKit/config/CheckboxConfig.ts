import { ComponentsConfig } from '@appello/mobile-ui';

import { makeDefaultProps } from '..';

export const CheckboxConfig: ComponentsConfig['Checkbox'] = {
  defaultProps: makeDefaultProps(theme => ({
    style: {
      backgroundColor: theme.colors.brand.secondary,
    },
  })),
};
