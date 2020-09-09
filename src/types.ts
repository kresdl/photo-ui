type Id = { 
  id: number
}

export type Photo = {
  url: string,
  title: string,
  comment?: string
}

export type Album = {
  title: string
}

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