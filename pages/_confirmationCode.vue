<template>
  <PageLayout>
    <div class="reservation-page">
      <div v-if="reservation">
        <div class="reservation">
          <h1>Your reservation in {{ reservation.city }}</h1>
          <div class="image">
            <img :src="this.reservation.cityImage" :alt="this.reservation.city"/>
          </div>
          <div class="details">
            <div class="location">
              <h3>Location</h3>
              {{ this.reservation.locationDetail }}
            </div>
            <div class="dates">
              <h3>Dates</h3>
              {{ this.formatDates(this.reservation.checkInDate, this.reservation.checkOutDate) }}
            </div>
            <div class="confirmationCode">
              <h3>Confirmation Code</h3>
              #{{ this.reservation.confirmationCode }}
            </div>
          </div>
        </div>
        <div class="rating">
          <h3>Rate Your Experience!</h3>
          <div></div>
          😢 😔 😐 🙂 😊
        </div>
      </div>
      <div v-if="error"> {{ error }}</div>
    </div>
  </PageLayout>
</template>

<script>

import config from '~/config/config';
import { formatDateRange } from '@/helpers/dates';
import PageLayout from '@/components/PageLayout';

export default {
  name: 'reservationPage',
  components: { PageLayout },
  data() {
    return {
      reservation: null,
      error: null,
    };
  },

  async fetch() {
    let reservationData;
    const { confirmationCode } = this.$route.params;
    try {
      reservationData = await this.$http.$get(`${config.api.host}/reservations/${confirmationCode}`);
      this.reservation = reservationData;
    } catch (e) {
      let error;
      if (e.response && e.response.status === 404) {
        error = `No reservation exists with code ${confirmationCode}`;
      } else {
        error = 'No Internet Connection detected';
      }
      this.error = error;
    }
  },
  fetchOnServer: false,
  methods: {
    formatDates(checkIn, checkOut) {
      const { startDate, endDate, daysBetween } = formatDateRange(checkIn, checkOut);
      return `${startDate} - ${endDate} (${daysBetween} days)`;
    }
  }
};

</script>

<style>
img {
  width: 450px;
}

.image {
  float: left;
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
