import { AppText, Button, ButtonProps, Popup } from '@appello/mobile-ui';
import { format } from 'date-fns';
import React, { FC, useMemo, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { REQUEST_BUTTONS, REQUEST_POPUP } from '~/app/constants/jobAndRequest';
import { Courts } from '~/app/services/rtkQuery/courts/types';
import { Status } from '~/app/types/enums';
import { theme } from '~/app/uiKit';
import { CloseIcon, DangerIcon } from '~/assets/icons';
import { UserProfileModel } from '~/entities/user';
import { s, sv } from '~/shared/utils/scaler';

import { Avatar } from '../Avatar';
import { useStyles } from './useStyles';

type RequestByOtherProps = {
  type: string;
  isMine: boolean;
  status: string;
  inAppPayment: boolean;
  dttm: string;
  summary: Nullable<string>;
  instructions: Nullable<string>;
  court: Courts;
  fee: number;
  associatedFrom: Nullable<UserProfileModel>;
  timeAgo: string;
  outcome: string;
  onDeclinePress: () => void;
  onAcceptPress: () => void;
  onCompleteRequest: (outcomes: string) => void;
};

export const RequestByOther: FC<RequestByOtherProps> = ({
  type,
  isMine,
  status,
  dttm,
  summary,
  instructions,
  court,
  fee,
  associatedFrom,
  timeAgo,
  outcome,
  inAppPayment,
  onDeclinePress,
  onCompleteRequest,
  onAcceptPress,
}) => {
  const styles = useStyles();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [someOutcome, setSomeOutCome] = useState('');
  const onOpenModal = () => setIsVisibleModal(true);

  const onCloseModal = () => setIsVisibleModal(false);

  const buttonByStatus: ButtonProps[] = useMemo(() => {
    if (status === Status.PENDING) {
      return [
        { ...REQUEST_BUTTONS.CREATED_BY_OTHER.PENDING[0], onPress: onOpenModal },
        { ...REQUEST_BUTTONS.CREATED_BY_OTHER.PENDING[1], onPress: onAcceptPress },
      ];
    }
    if (status === Status.IN_PROGRESS) {
      return [{ ...REQUEST_BUTTONS.CREATED_BY_OTHER.IN_PROGRESS[0], onPress: onOpenModal }];
    }
    if (status === Status.COMPLETED) {
      return REQUEST_BUTTONS.CREATED_BY_OTHER.COMPLETE;
    }
    return REQUEST_BUTTONS.CREATED_BY_OTHER.IN_PROGRESS;
  }, [onAcceptPress, status]);

  const popupBystatus = useMemo(() => {
    if (status === Status.PENDING) {
      return {
        ...REQUEST_POPUP.CREATED_BY_OTHER.PENDING,
        style: [
          {
            ...REQUEST_POPUP.CREATED_BY_OTHER.PENDING.style[0],
            onPress: () => {
              onDeclinePress();
              onCloseModal();
            },
          },
          {
            ...REQUEST_POPUP.CREATED_BY_OTHER.PENDING.style[1],
            onPress: onCloseModal,
          },
        ],
      };
    }
    if (status === Status.IN_PROGRESS) {
      return {
        ...REQUEST_POPUP.CREATED_BY_OTHER.IN_PROGRESS,
        style: [
          {
            ...REQUEST_POPUP.CREATED_BY_OTHER.IN_PROGRESS.style[0],

            onPress: () => {
              onCompleteRequest(someOutcome);
              onCloseModal();
            },
          },
        ],
      };
    }
    return REQUEST_POPUP.CREATED_BY_OTHER.IN_PROGRESS;
  }, [onCompleteRequest, onDeclinePress, someOutcome, status]);

  const statusColor = useMemo(() => {
    if (status === Status.COMPLETED) {
      return theme.colors.global.greenDark;
    }
    if (status === Status.IN_PROGRESS) {
      return theme.colors.global.orange;
    }
    if (status === Status.CANCELLED) {
      return theme.colors.red;
    }

    return theme.colors.brand.accent;
  }, [status]);

  return (
    <View style={styles.container}>
      <AppText color={theme.colors.black[1]} variant="h5">
        {type}
      </AppText>
      <View style={styles.innerStyle}>
        {timeAgo ? (
          <AppText color={theme.colors.gray[2]} variant="p5">
            {timeAgo}
          </AppText>
        ) : null}
        {isMine && timeAgo ? (
          <AppText color={theme.colors.gray[2]} variant="p5">
            {' '}
            •{' '}
          </AppText>
        ) : null}
        {isMine && (
          <AppText color={theme.colors.gray[2]} variant="p5">
            {isMine && `by you`}
          </AppText>
        )}
        {status && (
          <AppText color={theme.colors.gray[2]} variant="p5">
            {' '}
            •{' '}
          </AppText>
        )}
        <AppText color={statusColor} variant="p5">
          {status === Status.PENDING ? 'New' : status}
        </AppText>
      </View>

      <View style={styles.line} />

      <View style={styles.containerInner}>
        <View style={styles.dateCourtStyle}>
          <View style={{ width: s(167) }}>
            <AppText color={theme.colors.gray[1]} variant="p5">
              Date & Time
            </AppText>
            {dttm && (
              <AppText color={theme.colors.black[1]} variant="p4">
                {format(dttm, 'MMM dd, h:mm a')}
              </AppText>
            )}
          </View>
          <View style={{ width: s(167) }}>
            <AppText color={theme.colors.gray[1]} variant="p5">
              Court
            </AppText>
            <AppText color={theme.colors.black[1]} variant="p4">
              {court?.name}
            </AppText>
          </View>
        </View>
        <View style={{ width: s(167), gap: s(2) }}>
          <AppText color={theme.colors.gray[1]} variant="p5">
            Fee
          </AppText>
          <AppText color={theme.colors.black[1]} variant="p4">
            ${fee} {inAppPayment ? '(Online)' : '(Offline)'}
          </AppText>
        </View>
        {summary && (
          <View style={{ gap: s(2) }}>
            <AppText color={theme.colors.gray[1]} variant="p5">
              Summary
            </AppText>
            <AppText color={theme.colors.gray[1]} variant="p4">
              {summary}
            </AppText>
          </View>
        )}

        {instructions && (
          <View style={{ gap: s(2) }}>
            <AppText color={theme.colors.gray[1]} variant="p5">
              Instructions
            </AppText>
            <AppText color={theme.colors.black[1]} variant="p4">
              {instructions}
            </AppText>
          </View>
        )}

        {outcome && (
          <View style={{ gap: s(2) }}>
            <AppText color={theme.colors.gray[1]} variant="p5">
              Outcome
            </AppText>
            <AppText color={theme.colors.black[1]} variant="p4">
              {outcome}
            </AppText>
          </View>
        )}

        {associatedFrom && (
          <View>
            <AppText color={theme.colors.gray[1]} variant="p5">
              Requested by
            </AppText>
            <View style={styles.userDetail}>
              <Avatar
                imageStyle={styles.imageStyle}
                size={42}
                urlKey={associatedFrom.photoKeys[0]}
              />
              <AppText color={theme.colors.brand.accent} variant="p4">
                {associatedFrom?.fullName}
              </AppText>
            </View>
          </View>
        )}

        <View style={styles.buttons}>
          {buttonByStatus.map((button: ButtonProps, index: number) => {
            return (
              <Button
                Icon={button.Icon}
                iconPosition={button.iconPosition}
                key={index}
                labelProps={button.labelProps}
                style={button.style}
                variant={button.variant}
                onPress={button.onPress}
              >
                {button.children}
              </Button>
            );
          })}
        </View>
      </View>
      <Popup
        buttons={
          useMemo(() => popupBystatus?.style, [popupBystatus.style]) as unknown as
            | [ButtonProps]
            | [ButtonProps, ButtonProps]
            | [ButtonProps, ButtonProps, ButtonProps]
            | undefined
        }
        message={status === Status.PENDING ? popupBystatus?.text.description : ''}
        opened={isVisibleModal}
        title={status === Status.PENDING ? popupBystatus?.text.mainText : ''}
        topAccessory={
          status === Status.PENDING ? (
            <View style={styles.topAccessory}>
              <DangerIcon color={theme.colors.primary} height={38} width={38} />
            </View>
          ) : (
            <>
              <Pressable
                hitSlop={15}
                style={styles.closeButton}
                onPress={() => setIsVisibleModal(false)}
              >
                <CloseIcon color={theme.colors.black[1]} />
              </Pressable>

              <View style={styles.popupTextContainer}>
                <AppText color={theme.colors.black[1]} variant="h5">
                  {popupBystatus?.text.mainText}
                </AppText>
                <AppText color={theme.colors.gray[1]} variant="p3">
                  {popupBystatus?.text.description}
                </AppText>
              </View>

              <TextInput
                multiline
                style={{
                  height: sv(200),
                  width: s(305),
                  backgroundColor: theme.colors.gray[7],
                  padding: sv(16),
                }}
                onChangeText={setSomeOutCome}
              />
            </>
          )
        }
      />
    </View>
  );
};
