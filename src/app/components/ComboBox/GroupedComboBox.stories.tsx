import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { GroupedCombobox } from './GroupedComboBox'

export default {
  title: 'GroupedCombobox',
  component: GroupedCombobox,
} as ComponentMeta<typeof GroupedCombobox>

const Template: ComponentStory<typeof GroupedCombobox> = (args) => (
  <GroupedCombobox {...args} />
)

export const Default = Template.bind({})
Default.args = {
  allOptions: [
    { id: '1', label: 'チョコレート', group: '甘いお菓子' },
    { id: '2', label: 'ケーキ', group: '甘いお菓子' },
    { id: '3', label: 'マカロン', group: '甘いお菓子' },
    { id: '4', label: 'クッキー', group: '甘いお菓子' },
    { id: '5', label: 'ドーナツ', group: '甘いお菓子' },
    { id: '6', label: 'キャンディ', group: '甘いお菓子' },
    { id: '7', label: 'アイスクリーム', group: '甘いお菓子' },
    { id: '8', label: 'パイ', group: '甘いお菓子' },
    { id: '9', label: 'おせんべい', group: 'しょっぱいお菓子' },
    { id: '10', label: 'ポテトチップス', group: 'しょっぱいお菓子' },
    { id: '11', label: 'チーズおかき', group: 'しょっぱいお菓子' },
    { id: '12', label: 'スッパムーチョ', group: '' },
  ],
}
