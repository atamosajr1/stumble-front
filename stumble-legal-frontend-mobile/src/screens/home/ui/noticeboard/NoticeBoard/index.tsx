import { AppText, Button, Popup } from '@appello/mobile-ui';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Job } from '~/app/components/Job';
import { JobBottomSheet } from '~/app/components/JobBottomSheet';
import { Loader } from '~/app/components/Loader';
import { Screen } from '~/app/components/Screen';
import { HomeTabScreenProps } from '~/app/navigation/HomeTab';
import { useGetJobsQuery } from '~/app/services/rtkQuery/jobs/endpoints';
import { Jobs } from '~/app/services/rtkQuery/jobs/types';
import { JobTypes, Status } from '~/app/types/enums';
import { theme } from '~/app/uiKit';
import { ArrowRight, DeleteIcon } from '~/assets/icons';

import { useStyles } from './useStyles';

export const NoticeboardScreen: React.FC<HomeTabScreenProps<'NOTICEBOARD'>> = ({ navigation }) => {
  const styles = useStyles();
  const [selectedRequest, setSelectedRequest] = useState<Nullable<Jobs>>(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const { data, isLoading, refetch } = useGetJobsQuery({
    kind: JobTypes.JOB,
    statuses: Status.PENDING,
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
            Noticeboard
          </AppText>
          <AppText color={theme.colors.global.whiteLight[7]} variant="p3">
            {data?.data.length ? `There are ${data.data.length} new jobs` : 'No new jobs'}
          </AppText>
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
                No jobs available at this moment
              </AppText>
            )}
          </View>
        }
        data={data?.data}
        keyExtractor={state => state.uuid}
        renderItem={renderItem}
        style={styles.flatList}
      />
      <View style={styles.buttonStyle}>
        <Button
          isLoading={isLoading}
          variant="primary"
          onPress={() => navigation.navigate('NoticeboardNavigator', { screen: 'NewJobScreen' })}
        >
          New job
        </Button>
      </View>

      <Popup
        buttons={useMemo(
          () => [
            {
              variant: 'secondary',
              children: 'Delete',
              Icon: () => null,
              iconPosition: 'center-right',
              onPress: () => {},
              labelProps: {
                color: theme.colors.red,
              },
            },
            {
              variant: 'primary',
              children: 'Cancel',
              Icon: () => null,
              iconPosition: 'center-right',
              onPress: () => {
                setIsVisibleModal(false);
              },
            },
          ],
          [],
        )}
        message="Are you sure to delete “Examination” job?"
        opened={isVisibleModal}
        title="Delete This Job?"
        topAccessory={
          <View style={styles.topAccessory}>
            <DeleteIcon color={theme.colors.primary} height={38} width={38} />
          </View>
        }
      />
      {selectedRequest && (
        <JobBottomSheet
          jobData={selectedRequest as Jobs}
          jobType={JobTypes.JOB}
          ref={bottomSheetRef}
        />
      )}
    </Screen>
  );
};
