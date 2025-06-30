import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import {
  useDeleteJobsMutation,
  useUpdateJobStatusMutation,
} from '~/app/services/rtkQuery/jobs/endpoints';
import { Jobs } from '~/app/services/rtkQuery/jobs/types';
import { JobTypes } from '~/app/types/enums';
import { theme } from '~/app/uiKit';
import { CloseIcon } from '~/assets/icons';
import { getTimeAgo } from '~/shared/utils/getTimeAgo';
import { sv } from '~/shared/utils/scaler';

import { JobByOther } from '../JobByOther';
import { JobByYou } from '../JobByYou';
import { RequestByOther } from '../RequestByOther';
import { RequestByYou } from '../RequestByYou';
import { useStyles } from './useStyles';

export interface JobBottomSheetProps {
  jobData: Jobs;
  jobType: JobTypes;
}

export const JobBottomSheet = forwardRef<BottomSheetMethods, JobBottomSheetProps>(
  ({ jobData, jobType }, ref) => {
    const styles = useStyles();
    const {
      dttm,
      court,
      fee,
      type,
      status,
      summary,
      instructions,
      associatedTo,
      associatedFrom,
      isMine,
      uuid,
      inAppPayment,
    } = jobData;

    const [updateJobStatus] = useUpdateJobStatusMutation();
    const [deleteJob] = useDeleteJobsMutation();
    const timeAgo = getTimeAgo(dttm);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          style={StyleSheet.absoluteFill}
        />
      ),
      [],
    );
    //
    const onDeclinePress = useCallback(() => {
      updateJobStatus({ data: { action: 'decline' }, uuid })
        .unwrap()
        .then(() => {
          if (typeof ref !== 'function' && ref?.current) {
            ref.current.close();
          }
        });
    }, [ref, updateJobStatus, uuid]);
    //
    const onCancelPress = useCallback(() => {
      updateJobStatus({ data: { action: 'cancel' }, uuid })
        .unwrap()
        .then(() => {
          if (typeof ref !== 'function' && ref?.current) {
            ref.current.close();
          }
        });
    }, [ref, updateJobStatus, uuid]);

    const onDeletePress = useCallback(() => {
      deleteJob({ uuid })
        .unwrap()
        .then(() => {
          if (typeof ref !== 'function' && ref?.current) {
            ref.current.close();
          }
        });
    }, [deleteJob, ref, uuid]);
    //
    const onAcceptPress = useCallback(() => {
      updateJobStatus({ data: { action: 'accept' }, uuid })
        .unwrap()
        .then(() => {
          if (typeof ref !== 'function' && ref?.current) {
            ref.current.close();
          }
        });
    }, [ref, updateJobStatus, uuid]);
    //
    const onCompleteRequest = useCallback(
      (someOutcome: string) => {
        updateJobStatus({
          data: { action: 'complete', outcomes: someOutcome.length ? someOutcome : null },
          uuid,
        })
          .unwrap()
          .then(() => {
            if (typeof ref !== 'function' && ref?.current) {
              ref.current.close();
            }
          });
      },
      [ref, updateJobStatus, uuid],
    );
    // to finish
    // const onEditPress = useCallback(() => {
    //   if (JobTypes.JOB) {
    //     navigation.navigate('NoticeboardNavigator', {
    //       screen: 'NewJobScreen',
    //       params: {
    //         courtName: court?.name,
    //         courtUuid: court?.uuid,
    //         associateName: associatedTo?.fullName,
    //         associateUuid: associatedTo?.uuid,
    //         dttm,
    //         fee,
    //         type,
    //         summary,
    //         instructions,
    //         inAppPayment,
    //       },
    //     });
    //   } else {
    //     navigation.navigate('CourtsNavigator', {
    //       screen: 'RequestServiceScreen',
    //       params: {
    //         courtName: court?.name,
    //         courtUuid: court?.uuid,
    //         associateName: associatedTo?.fullName,
    //         associateUuid: associatedTo?.uuid,
    //         dttm,
    //         fee,
    //         type,
    //         summary,
    //         instructions,
    //         inAppPayment,
    //       },
    //     });
    //   }
    // }, [
    //   associatedTo?.fullName,
    //   associatedTo?.uuid,
    //   court?.name,
    //   court?.uuid,
    //   dttm,
    //   fee,
    //   inAppPayment,
    //   instructions,
    //   navigation,
    //   summary,
    //   type,
    // ]);

    const requestsInner = useMemo(() => {
      if (jobType === JobTypes.REQUEST) {
        if (isMine) {
          return (
            <RequestByYou
              associatedTo={associatedTo && associatedTo}
              court={court}
              dttm={dttm}
              fee={fee}
              inAppPayment={inAppPayment}
              instructions={instructions}
              isMine={isMine}
              status={status}
              summary={summary}
              timeAgo={timeAgo}
              type={type}
              onCancelPress={onCancelPress}
            />
          );
        }
        return (
          <RequestByOther
            associatedFrom={associatedFrom}
            court={court}
            dttm={dttm}
            fee={fee}
            inAppPayment={inAppPayment}
            instructions={instructions}
            isMine={isMine}
            outcome=""
            status={status}
            summary={summary}
            timeAgo={timeAgo}
            type={type}
            onAcceptPress={onAcceptPress}
            onCompleteRequest={onCompleteRequest}
            onDeclinePress={onDeclinePress}
          />
        );
      }
      if (jobType === JobTypes.JOB) {
        if (isMine) {
          return (
            <JobByYou
              court={court}
              dttm={dttm}
              fee={fee}
              inAppPayment={inAppPayment}
              instructions={instructions}
              isMine={isMine}
              status={status}
              summary={summary}
              timeAgo={timeAgo}
              type={type}
              onDeletePress={onDeletePress}
            />
          );
        }
        return (
          <JobByOther
            associatedTo={null}
            court={court}
            dttm={dttm}
            fee={fee}
            inAppPayment={inAppPayment}
            instructions={instructions}
            isMine={isMine}
            status={status}
            summary={summary}
            timeAgo={timeAgo}
            type={type}
            onAcceptPress={onAcceptPress}
            onCancelPress={onCancelPress}
          />
        );
      }
      return null;
    }, [
      jobType,
      isMine,
      associatedFrom,
      court,
      dttm,
      fee,
      inAppPayment,
      instructions,
      status,
      summary,
      timeAgo,
      type,
      onAcceptPress,
      onCompleteRequest,
      onDeclinePress,
      associatedTo,
      onCancelPress,
      onDeletePress,
    ]);

    return (
      <BottomSheet
        enableDynamicSizing
        backdropComponent={renderBackdrop}
        handleComponent={() => null}
        index={0}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        maxDynamicContentSize={sv(812)}
        ref={ref}
      >
        <BottomSheetScrollView scrollEnabled={false}>
          <Pressable
            hitSlop={15}
            style={styles.closeButton}
            onPress={() => {
              if (typeof ref !== 'function' && ref?.current) {
                ref.current.close();
              }
            }}
          >
            <CloseIcon color={theme.colors.black[1]} />
          </Pressable>
          {requestsInner}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);
