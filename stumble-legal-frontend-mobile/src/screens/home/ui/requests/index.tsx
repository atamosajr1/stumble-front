import { AppText } from '@appello/mobile-ui';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Job } from '~/app/components/Job';
import { JobBottomSheet } from '~/app/components/JobBottomSheet';
import { Loader } from '~/app/components/Loader';
import { MenuTab } from '~/app/components/MenuTab';
import { Screen } from '~/app/components/Screen';
import { HomeTabScreenProps } from '~/app/navigation/HomeTab';
import { useGetJobsQuery } from '~/app/services/rtkQuery/jobs/endpoints';
import { Jobs } from '~/app/services/rtkQuery/jobs/types';
import { JobTypes, Status } from '~/app/types/enums';
import { theme } from '~/app/uiKit';
import { ArrowRight } from '~/assets/icons';

import { useStyles } from './useStyles';

export const REQUESTS_TABS = ['New', 'In Progress', 'Complete'];

const statusValues = Object.values(Status);

export const RequestsScreen: React.FC<HomeTabScreenProps<'REQUESTS'>> = () => {
  const styles = useStyles();
  const [selectedId, setSelectedId] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState<Nullable<Jobs>>(null);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const { data, isLoading, refetch } = useGetJobsQuery({
    kind: JobTypes.REQUEST,
    statuses: statusValues[selectedId] || undefined,
    latitude: undefined,
    longitude: undefined,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  const renderItem = ({ item }: { item: Jobs }) => {
    return (
      <Job
        onPress={() => {
          bottomSheetRef.current?.expand();
          setSelectedRequest(item);
        }}
        {...item}
        icon={<ArrowRight color={theme.colors.gray[3]} height={16} width={16} />}
      />
    );
  };

  return (
    <Screen
      useTopSafeArea
      childrenContainerStyle={styles.childrenContainerStyle}
      header={
        <View style={styles.header}>
          <AppText color={theme.colors.white} variant="h2">
            Requests
          </AppText>
          {data?.data && data?.data.length > 0 && data?.data[0].status === 'Pending' && (
            <AppText color={theme.colors.global.whiteLight[7]} variant="p3">
              {data?.data.length ? `You have ${data?.data.length} new requests` : `No new requests`}
            </AppText>
          )}

          <View style={styles.tabStyle}>
            {REQUESTS_TABS.map((tab, index) => (
              <MenuTab
                index={index}
                key={index}
                selectedId={selectedId}
                title={tab}
                onPressTab={id => setSelectedId(id)}
              />
            ))}
          </View>
        </View>
      }
    >
      <FlatList
        ListEmptyComponent={
          <View style={styles.noRecords}>
            {isLoading ? (
              <Loader />
            ) : (
              <AppText color={theme.colors.gray[2]} style={styles.textAlign} variant="p3">
                No requests here
              </AppText>
            )}
          </View>
        }
        data={data?.data}
        keyExtractor={state => state.uuid}
        renderItem={renderItem}
      />
      {selectedRequest && (
        <JobBottomSheet
          jobData={selectedRequest as Jobs}
          jobType={JobTypes.REQUEST}
          ref={bottomSheetRef}
        />
      )}
    </Screen>
  );
};
