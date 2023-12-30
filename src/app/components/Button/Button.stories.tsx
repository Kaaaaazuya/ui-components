import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

// TODO: 書き換え
const meta: Meta<typeof Button> = {
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Example: Story = {
  args: {
    label: 'example',
    size: 'md',
    color: 'primary',
    type: 'button',
    onClick: () => alert('storybook'),
  },
}
