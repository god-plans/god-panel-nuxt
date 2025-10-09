import { _mock } from './_mock'

// ----------------------------------------------------------------------

export const _userAbout = {
  id: _mock.id(1),
  role: _mock.role(1),
  email: _mock.email(1),
  country: _mock.countryNames(1),
  school: _mock.companyNames(1),
  company: _mock.companyNames(2),
  totalFollowers: _mock.number.nativeL(1),
  totalFollowing: _mock.number.nativeL(2),
  totalPosts: _mock.number.nativeL(3),
  quote: _mock.sentence(1),
  about: _mock.description(1)
}

export const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  country: _mock.countryNames(index),
  email: _mock.email(index),
  avatarUrl: _mock.image.avatar(index),
  isFollowed: _mock.boolean(index),
  role: _mock.role(index)
}))

export const _userFriends = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  role: _mock.role(index),
  avatarUrl: _mock.image.avatar(index)
}))

export const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  postedAt: _mock.time(index),
  title: _mock.postTitle(index),
  imageUrl: _mock.image.cover(index)
}))

export const _userFeeds = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  author: {
    id: _mock.id(index),
    avatarUrl: _mock.image.avatar(index),
    name: _mock.fullName(index)
  },
  isLiked: _mock.boolean(index),
  createdAt: _mock.time(index),
  media: _mock.image.cover(index),
  message: _mock.sentence(index),
  personLikes: [...Array(36)].map((_, index) => ({
    name: _mock.fullName(index),
    avatarUrl: _mock.image.avatar(index)
  })),
  comments: (index: number) => {
    if (index === 2 || index === 6) {
      return [
        {
          id: _mock.id(7),
          author: {
            id: _mock.id(8),
            avatarUrl: _mock.image.avatar(index + 5),
            name: _mock.fullName(index + 5)
          },
          createdAt: _mock.time(3),
          message: 'Great post!'
        },
        {
          id: _mock.id(9),
          author: {
            id: _mock.id(10),
            avatarUrl: _mock.image.avatar(index + 6),
            name: _mock.fullName(index + 6)
          },
          createdAt: _mock.time(4),
          message: 'Thanks for sharing.'
        }
      ]
    }
    return []
  }
}))

export const _userCards = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  coverUrl: _mock.image.cover(index),
  name: _mock.fullName(index),
  follower: _mock.number.nativeL(index),
  following: _mock.number.nativeL(index + 2),
  totalPost: _mock.number.nativeL(index + 4),
  role: _mock.role(index)
}))

export const _userPayment = [...Array(2)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678'][index],
  cardType: ['mastercard', 'visa'][index],
  primary: index === 1
}))

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  phoneNumber: _mock.phoneNumber(index),
  country: _mock.countryNames(index),
  state: ['California', 'New York', 'Texas', 'Florida'][index],
  city: ['Los Angeles', 'New York', 'Houston', 'Miami'][index],
  streetAddress: _mock.fullAddress(index),
  zipCode: ['90001', '10001', '77001', '33101'][index],
  primary: index === 0
}))

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  invoiceNumber: `INV-${2010 + index}`,
  createdAt: _mock.time(index),
  price: _mock.number.price(index)
}))

export const _userList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  displayName: _mock.fullName(index),
  email: _mock.email(index),
  photoURL: _mock.image.avatar(index),
  phoneNumber: _mock.phoneNumber(index),
  country: _mock.countryNames(index),
  address: '908 Jack Locks',
  state: 'Virginia',
  city: 'Rancho Cordova',
  zipCode: '85807',
  about: _mock.description(index),
  role: _mock.role(index),
  isPublic: _mock.boolean(index)
}))
