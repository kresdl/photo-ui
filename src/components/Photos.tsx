import React from 'react'
import Record from './PhotoRecord'
import { Listeners, SavedPhoto } from '../types'
import List from './List'

type Props = Listeners<SavedPhoto> & {
  items?: SavedPhoto[]
  disabled?: boolean
}

const Photos: React.FC<Props> = ({ children, items, disabled, ...listeners }) =>
  <List items={items} disabled={disabled} select={!!listeners.onSelect}>
    {
      item => <Record {...item} {...listeners} />
    }
  </List>

export default Photos