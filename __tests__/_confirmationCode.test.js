import { mount } from '@vue/test-utils';
import ConfirmationCode from '../pages/_confirmationCode/index.vue';

const getOptions = (data) => ({
  data: function () {
    return data;
  }
});

const testData = {
  reservation: {
    reservation: {
      confirmationCode: 'AAAAAA',
      checkInDate: '2020-01-10',
      checkOutDate: '2020-02-14',
      city: 'San Francisco, CA',
      rating: null,
      cityImage:
        'https://cdn.pixabay.com/photo/2013/11/13/21/14/san-francisco-210230_960_720.jpg',
      locationDetail: 'Kasa Sand Diego at Aperture\nApartment 203'
    },
  },
  error: {
    error: 'No internet connection detected.'
  }
};

describe('ConfirmationCode', () => {
  it('should match snapshot on first render', async () => {
    const wrapper = mount(ConfirmationCode, getOptions(testData.reservation));
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot('first');
  });

  it('should match snapshot on no internet error', async () => {
    const wrapper = mount(ConfirmationCode, getOptions(testData.error));
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot('noInternetError');
  });
});

