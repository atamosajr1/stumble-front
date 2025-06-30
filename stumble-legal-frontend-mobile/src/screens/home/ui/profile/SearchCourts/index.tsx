import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

import { Court } from '~/app/components/Court';
import { DropDownField } from '~/app/components/Fields/DropDownField';
import { Loader } from '~/app/components/Loader';
import { Screen } from '~/app/components/Screen';
import { SearchInputComponent } from '~/app/components/SearchInput/SearchInput';
import { SCHEDULE_LEVELS, SCHEDULE_TYPES } from '~/app/constants/data';
import { ProfileStackScreenProps } from '~/app/navigation/Profile';
import { useGetCourtsQuery } from '~/app/services/rtkQuery/courts/endpoints';
import { Courts } from '~/app/services/rtkQuery/courts/types';
import { DropdownIcon } from '~/assets/icons';
import { s } from '~/shared/utils/scaler';

import { useStyles } from './useStyles';

export const SearchCourtsScreen: React.FC<ProfileStackScreenProps<'SearchCourtsScreen'>> = ({
  navigation,
  route: { params },
}) => {
  const styles = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [types, setType] = useState('');
  const [level, setLevel] = useState('');
  const { data, isLoading } = useGetCourtsQuery({
    search: searchValue || undefined,
    levels: level ? [level] : undefined,
    types: types ? [types] : undefined,
  });

  const handleCourt = (item: Courts) => {
    params.onSelect(item);
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: Courts }) => {
    return <Court {...item} onPress={() => handleCourt(item)} />;
  };

  return (
    <Screen
      secondary
      useBottomSafeArea
      useTopSafeArea
      withGoBack
      childrenContainerStyle={styles.childrenContainerStyle}
      header={
        <SearchInputComponent
          placeholder="Search courts"
          style={styles.searchStyle}
          onChange={setSearchValue}
        />
      }
      secondaryTitle={styles.secondaryTitle}
    >
      <View style={styles.typesStyles}>
        <View style={{ width: s(130) }}>
          <DropDownField
            Icon={DropdownIcon}
            items={SCHEDULE_TYPES}
            style={{
              inputIOSContainer: styles.dropDownStyle,
              inputAndroidContainer: styles.dropDownStyle,
            }}
            value={types}
            onValueChange={val => setType(val as string)}
          />
        </View>
        <View style={{ width: s(120) }}>
          <DropDownField
            Icon={DropdownIcon}
            items={SCHEDULE_LEVELS}
            style={{
              inputIOSContainer: styles.dropDownStyle,
              inputAndroidContainer: styles.dropDownStyle,
            }}
            value={level}
            onValueChange={val => setLevel(val as string)}
          />
        </View>
      </View>
      <FlatList<Courts>
        ListEmptyComponent={<View style={styles.empatyStyle}>{isLoading && <Loader />}</View>}
        data={data?.data || []}
        keyExtractor={state => state.uuid}
        renderItem={renderItem}
        style={styles.courtList}
      />
    </Screen>
  );
};
