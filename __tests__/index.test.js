import { mount } from '@vue/test-utils'
import Index from '../pages/index.vue'

const options = {
  mocks: {
    $http: { get: () => {}}
  },
  stubs: ['NuxtLink'],
  data: function() {
    return {
      reservations: testData,
    }
  }
}

const testData = [
  {
    confirmationCode: 'AAAAAA',
    checkInDate: '2020-01-10',
    checkOutDate: '2020-02-14',
    city: 'San Francisco, CA',
    rating: null,
    cityImage:
      'https://cdn.pixabay.com/photo/2013/11/13/21/14/san-francisco-210230_960_720.jpg',
    locationDetail: 'Kasa Sand Diego at Aperture\nApartment 203'
  },
  {
    confirmationCode: 'BBBBBB',
    checkInDate: '2020-02-10',
    checkOutDate: '2020-03-14',
    city: 'Los Angeles, CA',
    rating: 3,
    cityImage:
      'https://cdn.pixabay.com/photo/2016/10/25/12/28/los-angeles-1768743_960_720.jpg',
    locationDetail: 'Kasa Sand Diego at Aperture\nApartment 203'
  },
  {
    confirmationCode: 'CCCCCC',
    checkInDate: '2020-04-10',
    checkOutDate: '2020-04-14',
    city: 'New York City, NY',
    rating: 5,
    cityImage:
      'https://cdn.pixabay.com/photo/2016/01/19/18/00/city-1150026_960_720.jpg',
    locationDetail: 'Kasa Sand Diego at Aperture\nApartment 203'
  }
];

describe('Index', () => {
  it('should match snapshot on first render', async () => {
    const wrapper = mount(Index, options)
    expect(wrapper.html()).toMatchSnapshot('first')
  });

  it('should display the reservations that match the search term', async () => {
    const wrapper = mount(Index, options)
    wrapper.find('.search-input').setValue('san')
    await wrapper.vm.$nextTick();

    const reservations = wrapper.findAll('.reservation');
    expect(reservations.length).toBe(1);
    const reservation = reservations.at(0);
    expect(reservation.html()).toMatchSnapshot('San Fran')
  });
})

