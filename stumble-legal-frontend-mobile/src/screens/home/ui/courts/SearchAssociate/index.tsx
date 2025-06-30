import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

import { Associate } from '~/app/components/Associate';
import { Loader } from '~/app/components/Loader';
import { Screen } from '~/app/components/Screen';
import { SearchInputComponent } from '~/app/components/SearchInput/SearchInput';
import { CourtsStackScreenProps } from '~/app/navigation/Courts';
import { useGetUsersQuery } from '~/app/services/rtkQuery/user/endpoints';
import { UserProfileModel } from '~/entities/user';

import { useStyles } from './useStyles';

export const SearchAssociateScreen: React.FC<CourtsStackScreenProps<'SearchAssociateScreen'>> = ({
  navigation,
  route: { params },
}) => {
  const styles = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const { data, isLoading } = useGetUsersQuery({ name: searchValue || undefined });

  const handleCourt = (item: UserProfileModel) => {
    params.onSelect(item);
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: UserProfileModel }) => {
    return <Associate {...item} onPress={() => handleCourt(item)} />;
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
          placeholder="Search associates"
          style={styles.searchStyle}
          onChange={setSearchValue}
        />
      }
      secondaryTitle={styles.secondaryTitle}
    >
      <FlatList<UserProfileModel>
        ListEmptyComponent={<View style={styles.empatyStyle}>{isLoading && <Loader />}</View>}
        data={data?.data || []}
        keyExtractor={state => state.uuid}
        renderItem={renderItem}
        style={styles.courtList}
      />
    </Screen>
  );
};
