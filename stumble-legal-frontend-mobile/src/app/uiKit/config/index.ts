import { ComponentsConfig } from '@appello/mobile-ui';

import { AppTextConfig } from './AppTextConfig';
import { ButtonNegativeConfig } from './ButtonNegativeConfig';
import { ButtonPrimaryConfig } from './ButtonPrimaryConfig';
import { ButtonSecondaryConfig } from './ButtonSecondaryConfig';
import { CheckboxConfig } from './CheckboxConfig';
import { TextInputConfig } from './TextInputConfig';

/* Set up config for other UIKit components here if needed */
export const componentsConfig: ComponentsConfig = {
  AppText: AppTextConfig,
  TextInput: TextInputConfig,
  'Button.Primary': ButtonPrimaryConfig,
  'Button.Secondary': ButtonSecondaryConfig,
  'Button.Negative': ButtonNegativeConfig,
  Checkbox: CheckboxConfig,
};
