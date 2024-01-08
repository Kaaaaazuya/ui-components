import type { Meta, StoryFn } from '@storybook/react'
import { Tag } from './Tag'

export default {
  title: 'Tag',
  component: Tag,
} as Meta<typeof Tag>

const StoryTemplate: StoryFn<typeof Tag> = (args) => <Tag {...args} />

export const Default = StoryTemplate.bind({})
Default.args = {
  label: 'Sample Tag',
  onClick: () => alert('onClick'),
}

export const WithDelete = StoryTemplate.bind({})
WithDelete.args = {
  label: 'Sample Tag',
  onDelete: () => alert('onDelete'),
  onClick: () => alert('onClick'),
}
