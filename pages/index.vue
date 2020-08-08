<template>
  <main>
    <h1>Home page</h1>
    <div class="search">
      <h1>Find Your reservation</h1>
      <h3>You can search by providing the city or the confirmation code of your reservation.</h3>
      <input type="text" v-model="searchTerm"/>
      <div class="search-results" :class="filteredReservations.length ? 'visible' : ''">
        <div
          v-for="reservation in filteredReservations" :key="reservation.confirmationCode"
        >
          <NuxtLink :to="`/${reservation.confirmationCode}`">
            <div>{{ reservation.city }}</div>
            <div>
              {{ formatDates(reservation.checkInDate, reservation.checkOutDate) }},
              <span> #{{ reservation.confirmationCode }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
      <input type="button" @click="handleClickSearch" value="Search"/>
      <div>{{ this.searchMessage }}</div>

    </div>

  </main>
</template>


<script>

import config from '../config/config';
import { formatDateRange } from '@/helpers/dates';

export default {
  name: 'Home',
  mounted() {
    // ensure / is cached even on the first visit
    this.$http.get('/');
  },
  computed: {
    filteredReservations: function() {
      return this.reservations
        .filter((res) => {
          const searchTerm = this.searchTerm.toLowerCase();
          return this.searchTerm &&
            (res.city.toLowerCase().includes(searchTerm) || res.confirmationCode.toLowerCase().includes(searchTerm))
        })
    }
  },
  watch: {
    searchTerm() {
      this.searchMessage = '';
    }
  },
  methods: {
    formatDates(checkIn, checkOut) {
      const { startDate, endDate } = formatDateRange(checkIn, checkOut)
      return `${startDate} - ${endDate}`;
    },
    handleClickSearch() {
      if (this.filteredReservations.length === 1) {
        this.$router.push(`/${this.filteredReservations[0].confirmationCode}`);
      } else {
        this.searchMessage = `${this.filteredReservations.length} results found. Click one to continue.`
      }
    }
  },
  data() {
    return {
      reservations: [],
      searchTerm: '',
      searchMessage: '',
    };
  },
  async asyncData({ $http }) {
    const reservations = await $http.$get(`${config.api.host}/reservations`);
    return { reservations };
  }
};

</script>

<style>
  .search-results.visible {
    border: solid 1px grey;
    max-width: 300px;
  }
</style>
