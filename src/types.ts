export type Message = string[] | string | null | undefined

export type Id = { 
  id: number
}

export type Title = {
  title: string
}

export type Photo = Title & {
  url: string,
  comment?: string
}

export type Album = Title

export type Credentials = {
  email: string,
  password: string
}

export type Register = Credentials & {
  first_name: string,
  last_name: string
}

export type SavedPhoto = Id & Photo

export type SavedAlbum = Id & Album & {
  photos?: SavedPhoto[]
}