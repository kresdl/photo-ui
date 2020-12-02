import { TransitionStatus } from "react-transition-group/Transition"

export type JSend<T> = {
  status: 'error' | 'fail' | 'success'
  message?: string
  data?: T | string | string[]
}

export type Res<T> = Pick<JSend<T>, 'data'> & {
  ok: boolean
}

export type Stylable = {
  className?: string;
};

export type Extend<T extends HTMLElement> = React.HTMLProps<T> & React.HTMLAttributes<T>;

export type Saved = { 
  id: number
}

export type Titled = {
  title: string
}

export type Photo = Titled & {
  url: string,
  comment?: string
}

export type Album = Titled

export type Credentials = {
  email: string,
  password: string
}

export type Register = Credentials & {
  first_name: string,
  last_name: string
}

export type SavedPhoto = Saved & Photo

export type SavedAlbum = Saved & Album & {
  photos: SavedPhoto[]
}

export type TransitionStateful = {
  state: TransitionStatus
}

export type HasClientHeight = {
  clientHeight: number | string
}

export type Assignment = {
  photo: SavedPhoto
  albumId: number
}
