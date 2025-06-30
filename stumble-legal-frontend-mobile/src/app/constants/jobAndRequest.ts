import { theme } from '../uiKit';

export const REQUEST_BUTTONS = {
  CREATED_BY_OTHER: {
    IN_PROGRESS: [
      {
        variant: 'primary',
        children: 'Complete',
        Icon: () => null,
        iconPosition: 'center-right',
        // onPress: () => {},
        labelProps: {
          color: theme.colors.white,
          weight: 'medium',
        },
        style: {
          backgroundColor: theme.colors.global.greenDark,
          width: '100%',
        },
      },
    ],
    COMPLETE: [
      {
        variant: 'secondary',
        children: 'View invoice',
        Icon: () => null,
        iconPosition: 'center-right',
        onPress: () => {},
        labelProps: {
          weight: 'medium',
        },
        style: {
          width: '100%',
        },
      },
    ],
    PENDING: [
      {
        variant: 'secondary',
        children: 'Decline',
        Icon: () => null,
        iconPosition: 'center-right',
        labelProps: {
          color: theme.colors.red,
          weight: 'medium',
        },
        style: {
          flex: 1,
        },
      },
      {
        variant: 'primary',
        children: 'Accept request',
        Icon: () => null,
        iconPosition: 'center-right',
        labelProps: {
          color: theme.colors.white,
          weight: 'medium',
        },
        style: {
          flex: 1,
        },
      },
    ],
  },
  /// /////
  CREATED_BY_YOU: {
    IN_PROGRESS: [
      // {
      //   variant: 'primary',
      //   children: 'Complete',
      //   Icon: () => null,
      //   iconPosition: 'center-right',
      //   // onPress: () => {},
      //   labelProps: {
      //     color: theme.colors.white,
      //     weight: 'medium',
      //   },
      //   style: {
      //     backgroundColor: theme.colors.global.greenDark,
      //     width: '100%',
      //   },
      // },
    ],
    COMPLETE: [
      {
        variant: 'secondary',
        children: 'View invoice',
        Icon: () => null,
        iconPosition: 'center-right',
        onPress: () => {},
        labelProps: {
          weight: 'medium',
        },
        style: {
          width: '100%',
        },
      },
    ],
    PENDING: [
      {
        variant: 'secondary',
        children: 'CANCEL REQUEST',
        Icon: () => null,
        iconPosition: 'center-right',
        labelProps: {
          color: theme.colors.red,
          weight: 'medium',
        },
        style: {
          flex: 1,
        },
      },
      {
        variant: 'secondary',
        children: 'EDIT',
        Icon: () => null,
        iconPosition: 'center-right',
        labelProps: {
          weight: 'medium',
        },
        style: {
          flex: 1,
        },
      },
    ],
  },
};

export const REQUEST_POPUP = {
  CREATED_BY_OTHER: {
    PENDING: {
      style: [
        {
          variant: 'secondary',
          labelProps: {
            color: theme.colors.red,
            weight: 'medium',
          },
          children: 'Decline',
          Icon: () => null,
          iconPosition: 'center-right',
        },
        {
          variant: 'primary',
          children: 'Cancel',
          Icon: () => null,
          iconPosition: 'center-right',
          labelProps: {
            color: theme.colors.white,
            weight: 'medium',
          },
        },
      ],
      text: {
        mainText: 'Decline This Request',
        description: 'Are you sure to decline “Examination” request?',
      },
    },
    IN_PROGRESS: {
      style: [
        {
          variant: 'primary',
          labelProps: {
            color: theme.colors.white,
            weight: 'medium',
          },
          children: 'Submit',
          Icon: () => null,
          iconPosition: 'center-right',
        },
      ],
      text: {
        mainText: 'Complete',
        description: 'Please let the requestor know the outcomes',
      },
    },
  },
  CREATED_BY_YOU: {
    PENDING: {
      style: [
        {
          variant: 'secondary',
          labelProps: {
            color: theme.colors.red,
            weight: 'medium',
          },
          children: 'Cancel request',
          Icon: () => null,
          iconPosition: 'center-right',
        },
        {
          variant: 'primary',
          children: 'Back',
          Icon: () => null,
          iconPosition: 'center-right',
          labelProps: {
            color: theme.colors.white,
            weight: 'medium',
          },
        },
      ],
      text: {
        mainText: 'Decline This Request',
        description: 'Are you sure to decline “Examination” request?',
      },
    },
  },
};
export const JOB_POPUP = {
  CREATED_BY_OTHER: {
    PENDING: {
      style: [
        {
          variant: 'secondary',
          labelProps: {
            color: theme.colors.red,
            weight: 'medium',
          },
          children: 'Decline',
          Icon: () => null,
          iconPosition: 'center-right',
        },
        {
          variant: 'primary',
          children: 'Cancel',
          Icon: () => null,
          iconPosition: 'center-right',
          labelProps: {
            color: theme.colors.white,
            weight: 'medium',
          },
        },
      ],
      text: {
        mainText: 'Decline This Request',
        description: 'Are you sure to decline “Examination” request?',
      },
    },
    IN_PROGRESS: {
      style: [
        {
          variant: 'primary',
          labelProps: {
            color: theme.colors.white,
            weight: 'medium',
          },
          children: 'Submit',
          Icon: () => null,
          iconPosition: 'center-right',
        },
      ],
      text: {
        mainText: 'Complete',
        description: 'Please let the requestor know the outcomes',
      },
    },
  },
  CREATED_BY_YOU: {
    PENDING: {
      style: [
        {
          variant: 'secondary',
          labelProps: {
            color: theme.colors.red,
            weight: 'medium',
          },
          children: 'Delete',
          Icon: () => null,
          iconPosition: 'center-right',
        },
        {
          variant: 'primary',
          children: 'Cancel',
          Icon: () => null,
          iconPosition: 'center-right',
          labelProps: {
            color: theme.colors.white,
            weight: 'medium',
          },
        },
      ],
      text: {
        mainText: 'Delete This Job?',
        description: 'Are you sure to delete “Examination” job?',
      },
    },
  },
};

export const JOB_BUTTONS = {
  CREATED_BY_OTHER: {
    PENDING: [
      {
        variant: 'primary',
        children: 'Accept job',
        Icon: () => null,
        iconPosition: 'center-right',
        onPress: () => {},
        labelProps: {
          color: theme.colors.white,
          weight: 'medium',
        },
        style: {
          width: '100%',
        },
      },
    ],
  },
  /// /////
  CREATED_BY_YOU: {
    PENDING: [
      {
        variant: 'secondary',
        children: 'Delete',
        Icon: () => null,
        iconPosition: 'center-right',
        style: {
          flex: 1,
        },
        labelProps: {
          color: theme.colors.red,
          weight: 'medium',
        },
      },
      {
        variant: 'secondary',
        children: 'Edit Job',
        Icon: () => null,
        labelProps: {
          color: theme.colors.black[1],
          weight: 'medium',
        },
        style: {
          flex: 1,
        },
        iconPosition: 'center-right',
      },
    ],
  },
};
