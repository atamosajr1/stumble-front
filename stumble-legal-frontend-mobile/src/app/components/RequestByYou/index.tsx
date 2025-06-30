import { AppText, Button, ButtonProps, Popup } from '@appello/mobile-ui';
import { format } from 'date-fns';
import React, { FC, useMemo, useState } from 'react';
import { View } from 'react-native';

import { REQUEST_BUTTONS, REQUEST_POPUP } from '~/app/constants/jobAndRequest';
import { Courts } from '~/app/services/rtkQuery/courts/types';
import { Status } from '~/app/types/enums';
import { theme } from '~/app/uiKit';
import { DangerIcon } from '~/assets/icons';
import { UserProfileModel } from '~/entities/user';
import { s } from '~/shared/utils/scaler';

import { Avatar } from '../Avatar';
import { useStyles } from './useStyles';

type RequestByYouProps = {
  type: string;
  isMine: boolean;
  inAppPayment: boolean;
  status: string;
  dttm: string;
  summary: Nullable<string>;
  instructions: Nullable<string>;
  court: Courts;
  fee: number;
  associatedTo: Nullable<UserProfileModel>;
  timeAgo: string;
  onCancelPress: () => void;
};

export const RequestByYou: FC<RequestByYouProps> = ({
  type,
  isMine,
  status,
  dttm,
  summary,
  instructions,
  court,
  fee,
  associatedTo,
  timeAgo,
  inAppPayment,
  onCancelPress,
}) => {
  const styles = useStyles();
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const onOpenModal = () => setIsVisibleModal(true);

  const onCloseModal = () => setIsVisibleModal(false);

  const buttonByStatus: ButtonProps[] = useMemo(() => {
    if (status === Status.PENDING) {
      return [{ ...REQUEST_BUTTONS.CREATED_BY_YOU.PENDING[0], onPress: onOpenModal }];
    }
    if (status === Status.IN_PROGRESS) {
      return REQUEST_BUTTONS.CREATED_BY_YOU.IN_PROGRESS;
    }
    if (status === Status.COMPLETED) {
      return REQUEST_BUTTONS.CREATED_BY_YOU.COMPLETE;
    }
    return REQUEST_BUTTONS.CREATED_BY_YOU.IN_PROGRESS;
  }, [status]);

  const popupBystatus = useMemo(() => {
    return {
      ...REQUEST_POPUP.CREATED_BY_YOU.PENDING,
      style: [
        {
          ...REQUEST_POPUP.CREATED_BY_YOU.PENDING.style[0],
          onPress: () => {
            onCancelPress();
            onCloseModal();
          },
        },
        {
          ...REQUEST_POPUP.CREATED_BY_YOU.PENDING.style[1],
          onPress: onCloseModal,
        },
      ],
    };
  }, [onCancelPress]);

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
            <AppText color={theme.colors.black[1]} variant="p4">
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

        {associatedTo && (
          <View style={{ gap: s(2) }}>
            <AppText color={theme.colors.gray[1]} variant="p5">
              Assigned to
            </AppText>
            <View style={styles.userDetail}>
              <Avatar imageStyle={styles.imageStyle} size={42} urlKey={associatedTo.photoKeys[0]} />
              <AppText color={theme.colors.brand.accent} variant="p4">
                {associatedTo?.fullName}
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
          <View style={styles.topAccessory}>
            <DangerIcon color={theme.colors.primary} height={38} width={38} />
          </View>
        }
      />
    </View>
  );
};
