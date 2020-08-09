<template>
  <PageLayout>
    <div class="reservation-page">
      <div v-if="reservation">
        <div class="reservation">
          <h1>{{ this.content.yourReservation }} {{ reservation.city }}</h1>
          <div class="image">
            <img
                :src="this.reservation.cityImage"
                :alt="this.reservation.city"
                class="city-image"
            />
          </div>
          <div class="details">
            <div class="location">
              <h3>{{ this.content.location }}</h3>
              {{ this.reservation.locationDetail }}
            </div>
            <div class="dates">
              <h3>{{ this.content.dates }}</h3>
              {{ this.formatDates(this.reservation.checkInDate, this.reservation.checkOutDate) }}
            </div>
            <div class="confirmation-code">
              <h3>{{ this.content.confirmationCode }}</h3>
              #{{ this.reservation.confirmationCode }}
            </div>
          </div>
        </div>
        <div class="rating">
          <h3>{{ this.content.rateYourExperience }}</h3>
          <div></div>
          😢 😔 😐 🙂 😊
        </div>
      </div>
      <div v-if="error"> {{ error }}</div>
    </div>
  </PageLayout>
</template>

<script>

import config from '../../config/config';
import { formatDateRange } from '../../helpers/dates';
import PageLayout from '../../components/PageLayout';
import content from './content.json';
import '../../assets/css/base.css';

export default {
  name: 'reservationPage',
  components: { PageLayout },
  data() {
    return {
      reservation: null,
      error: null,
      content,
    };
  },

  async fetch() {
    let reservationData;
    const { confirmationCode } = this.$route.params;
    try {
      reservationData = await this.$http.$get(`${config.api.host}/reservations/${confirmationCode}`);
      this.reservation = reservationData;
    } catch (e) {
      console.log({ e });
      let error;
      if (e.response && e.response.status === 404) {
        error = `${this.content.noConfirmationCodeError} ${confirmationCode}`;
      } else {
        console.log('error');
        error = this.content.noInternetError;
      }
      console.log('this.error = ', error);
      this.error = error;
    }
  },
  fetchOnServer: false,
  methods: {
    formatDates(checkIn, checkOut) {
      const { startDate, endDate, daysBetween } = formatDateRange(checkIn, checkOut);
      return `${startDate} - ${endDate} (${daysBetween} ${this.content.days})`;
    }
  }
};

</script>

<style scoped>

.image {
  float: left;
}
.city-image {
  width: 450px;
}

.rating {
  clear: both;
  border: solid 1px grey;
  max-width: 300px;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .image {
    float: unset;
  }
}
</style>
