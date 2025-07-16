export interface Name {
  title: string
  first: string
  last: string
}

export interface Location {
  street: {
    number: number
    name: string
  }
  city: string
  state: string
  country: string
  postcode: number | string
  coordinates: {
    latitude: string
    longitude: string
  }
  timezone: {
    offset: string
    description: string
  }
}

export interface Login {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}

export interface User {
  gender: 'male' | 'female'
  name: Name
  location: Location
  email: string
  login: Login
  dob: {
    date: string
    age: number
  }
  registered: {
    date: string
    age: number
  }
  phone: string
  cell: string
  id: {
    name: string
    value: string | null
  }
  picture: Picture
  nat: string
}