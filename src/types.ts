export type Message = string[] | string | null | undefined

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
