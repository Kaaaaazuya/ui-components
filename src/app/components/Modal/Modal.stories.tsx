import { Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Modal } from './Modal'

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    handleClose: { action: 'closed' },
    title: { control: 'text' },
    children: { control: 'text' },
  },
} as Meta<typeof Modal>

export const Default = {
  args: {
    handleClose: action('Modal closed'),
    title: 'Default title',
    children: 'This is the modal content',
  },
}

export const WithCustomTitle = {
  args: {
    ...Default.args,
    title: 'Custom title',
  },
}

export const WithoutTitle = {
  args: {
    ...Default.args,
    title: undefined,
  },
}
