import { useFirstMountState } from '@appello/common';
import { TextInput } from '@appello/mobile-ui';
import React, { memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { makeStyles, theme } from '~/app/uiKit';
import SearchIcon from '~/assets/icons/search.svg';

interface Props {
  style?: ViewProps['style'];
  placeholder: string;
  onChange: (text: string) => void;
}

export const SearchInputComponent: React.FC<Props> = ({ style, placeholder, onChange }) => {
  const styles = useStyles();
  const firstMountState = useFirstMountState();
  const [value, setValue] = useState('');
  const timeoutId = useRef<Nullable<NodeJS.Timeout>>(null);

  useEffect(() => {
    if (!firstMountState) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        onChange(value);
      }, 300);
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [firstMountState, onChange, value]);

  return (
    <View style={style}>
      <TextInput
        Icon={SearchIcon}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray[3]}
        style={styles.textInput}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};

const useStyles = makeStyles(() =>
  StyleSheet.create({
    textInput: {
      borderColor: 'transparent',
    },
  }),
);

export const SearchInput = memo(SearchInputComponent);
