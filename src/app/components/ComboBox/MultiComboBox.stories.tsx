import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { MultiCombobox } from './MultiComboBox'

export default {
  title: 'Components/MultiCombobox',
  component: MultiCombobox,
} as Meta<typeof MultiCombobox>

const StoryTemplate: StoryFn<typeof MultiCombobox> = (args) => <MultiCombobox {...args} />

export const Default = StoryTemplate.bind({})
Default.args = {
  allOptions: [
    { id: 'option-1', label: 'Yuki Tanaka' },
    { id: 'option-2', label: 'Haruto Watanabe' },
    { id: 'option-3', label: 'Rin Yamamoto' },
    { id: 'option-4', label: 'Sota Nakamura' },
    { id: 'option-5', label: 'Kaito Kobayashi' },
    { id: 'option-6', label: 'Mei Sato' },
    { id: 'option-7', label: 'Yui Suzuki' },
    { id: 'option-8', label: 'Takumi Takahashi' },
    { id: 'option-9', label: 'Nao Kato' },
    { id: 'option-10', label: 'Aoi Ishikawa' },
    { id: 'option-11', label: 'Kento Yoshida' },
    { id: 'option-12', label: 'Hana Yamada' },
    { id: 'option-13', label: 'Yusei Matsuda' },
    { id: 'option-14', label: 'Natsuki Inoue' },
    { id: 'option-15', label: 'Riku Kimura' },
    { id: 'option-16', label: 'Aki Nakajima' },
    { id: 'option-17', label: 'Mai Hayashi' },
    { id: 'option-18', label: 'Yuta Shimizu' },
    { id: 'option-19', label: 'Airi Saito' },
    { id: 'option-20', label: 'Daiki Matsumoto' },
    { id: 'option-21', label: 'Miku Ito' },
    { id: 'option-22', label: 'Shota Endo' },
    { id: 'option-23', label: 'Nanami Fujita' },
    { id: 'option-24', label: 'Haruki Okada' },
    { id: 'option-25', label: 'Ema Yamaguchi' },
    { id: 'option-26', label: 'Ryusei Morita' },
    { id: 'option-27', label: 'Hikari Takagi' },
    { id: 'option-28', label: 'Yuu Ando' },
    { id: 'option-29', label: 'Kanon Nishimura' },
    { id: 'option-30', label: 'Hiroto Abe' },
  ],
}
